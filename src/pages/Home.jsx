import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Invite from "../components/Invite";
import './Home.css'


export default function Home(){
  const [isInvite, setIsInvite] = useState(true);


  useEffect(()=>{
    axios.get("/home").then((res)=>{
      console.log(res.data)
    })
  },[])
  return(
    <Container>
      <Container className="pvptable">
        <ul className="subject">
          <li className="list">
            Name
          </li>
          <li>
            상대 전적
          </li>
          <li>
            
          </li>
        </ul>
      </Container>
      {isInvite ? <Invite/>: ""}
    </Container>
  )
}