import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import SockJS from "sockjs-client";
import Invite from "../components/Invite";
import './Home.css'
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { Client } from "@stomp/stompjs";

let client=null;

export default function Home(){
  const [isInvite, setIsInvite] = useState(false);
  const [user,setUser] = useState("")
  const navigate = useNavigate();
  const [matchId, setMatchId] = useState("");
  const [problemId, setProblemId] = useState("");
  const player = sessionStorage.getItem("id");
  const [guest, setGuest] = useState("");

  const connect = () => {
    client = new Client({
      brokerURL: 'ws://58.234.91.119:8080/ws',
      debug: function(str){
        console.log(str)
      },
      reconnectDelay: 1000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect:()=>{
        client.subscribe('/topic/public', (message) => {
          if(message.body === player){
            console.log(message.body)
            setIsInvite(true)
          }
        })
      },
      webSocketFactory:()=>{
        return new SockJS("/stomp")
      },
      onStompError:(frame)=>{
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
      }
    })

    client.activate();
  }

  const getUser = async(e) => {
    axios.get('/home')
    .then((res)=>{
      setUser(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  }


  useEffect(()=>{
    getUser();
    if(sessionStorage.getItem('id')!==null){
      connect();
    }
    console.log(matchId)
  },[])


  const sendMessage = (e) => {
    client.publish({
      destination:'/topic/public',
      body: guest
    })
  }
  const matching = async(e) => {
    await axios({
      method: 'post',
      url: '/match/new',
      data:{
        host: player,
        guest: e.target.innerText
      },
    }).then((res)=>{
      console.log(res.data)
      setGuest(res.data.guestId)
      setMatchId(res.data.matchId)
      setProblemId(res.data.problemId)
      console.log(matchId)
      sendMessage();
      // navigate(`/match/`+res.data.matchId+'/'+res.data.problemId)
    }).catch((error)=>{
      console.log(error)
    })
  }
  return(
    <Container>
      <Container className="pvptable">
        <ul className="stat">
          <li className="ranking">
            랭킹
          </li>
          <li className="name">
            아이디
          </li>
          <li className="winrate">
            승률
          </li>
        </ul>
        { user ? user.map(list=>{
          return(
            <ul key={list.loginId} className="stat">
              <li className="ranking">
              
              </li>
              <li className="name" onClick={matching}>
                {list.loginId}
              </li>
              <li className="winrate">

              </li>
            </ul>
          )
        }):''}
      </Container>
      {isInvite ? <Invite matchId={matchId} problemId={problemId} />: ""}
    </Container>
  )
}