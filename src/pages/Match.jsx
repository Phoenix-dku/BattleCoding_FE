import { Container, Dropdown, Row, Col, Tab, Button, Tabs } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import Codemirror from "@uiw/react-codemirror";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { useParams } from "react-router-dom";
import './Match.css'
import axios from "axios";


export default function Match(){
  const {language}  = useParams();
  const matchlang = ["Python3", "Java", "C++", "Javascript"];
  const [currentLang, setCurrentLang] = useState("Java");
  const [code, setCode] = useState("");
  const [testResult, setTestResult] = useState("")
  const [consoleMessage, setConsoleMessage] = useState("")

  const mousedown = (e) => {

  }
  const mousemove = (e) => {

  }

  const mouseup = (e) => {

  }

  const resizeBox = () => {
    console.log(`박스 사이즈 x: ${window.innerWidth}, y: ${window.innerHeight}`)
  }

  useEffect(()=>{
    window.addEventListener('resize', resizeBox)
  })


  const onChange = useCallback((value, viewUpdate)=>{
    setCode(value)
    console.log("value:",value);
  },[])
  console.log(code)

  
  const onClickSubmission = async(e) => {
    e.preventDefault();
    await axios({
      method: 'post',
      url: '/problem/submit',
      headers: { 
        'Content-Type': 'application/json'
      },
      data:{
        problemId: 1,
        code: code
      }
    }).then((res)=>{
      setTestResult(res.data.testResult)
      setConsoleMessage(res.data.body)
    }).catch((error)=>{
      console.log(error)
    })
    
  }

  //파람스 사용해서 리다이렉트로 바꿔야하는듯
  return (
    <Container className="matchcontainer">
      <ul className="matchbar">
        <li className="problem-title">
          문제 이름
        </li>
        <li>
          시간
        </li>
        <li>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {currentLang}
            </Dropdown.Toggle>
            {/* <DropdownMenu>
              <DropdownItem onClick={onClickLanguage} >{matchlang[0]}</DropdownItem>
              <DropdownItem onClick={onClickLanguage} >{matchlang[1]}</DropdownItem>
              <DropdownItem onClick={onClickLanguage} >{matchlang[2]}</DropdownItem>
              <DropdownItem onClick={onClickLanguage} >{matchlang[3]}</DropdownItem>
            </DropdownMenu> */}
          </Dropdown>
        </li>
      </ul>
      <Row>
        <Col className="problem-box">
          <Container className="whoisin">
            <ul className="participant">
              <li>
                홈
              </li>
              <li>
                어웨이
              </li>
            </ul>
          </Container>
          <Container>
            문제박스
          </Container>
        </Col>
        <div id="resizebar-hor" draggable></div>
        <Col className="codebox">
          <div className="filename">
            제출 파일 이름
          </div>
          <Codemirror
            value=""
            height="200px"
            onChange={onChange}
            extensions={java()}
          />
          <div id="resizebar-ver" draggable></div>
          <Tabs className="consolebox">
            <Tab eventKey="console" title="console">
              {testResult}<br/>
              {consoleMessage}
              
            </Tab>
          </Tabs>
          <Button className="runbtn">코드 실행하기</Button>
          <Button className="submitbtn" onClick={onClickSubmission}>제출</Button>
        </Col>
      </Row>
      
      
    </Container>
  )
}