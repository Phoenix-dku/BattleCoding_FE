import { Container, Dropdown, Row, Col, Tab, TabContainer, Tabs } from "react-bootstrap";
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

export default function Match(){
  const {language}  = useParams();
  const matchlang = ["Python3", "Java", "C++", "Javascript"];
  const [currentLang, setCurrentLang] = useState("Java");
  const [code, setCode] = useState("");

  const onChange = useCallback((value, viewUpdate)=>{
    setCode(value)
    console.log("value:",value);
  },[])
  console.log(code)
  const onClickLanguage = (e) => {
    setCurrentLang(e.target.textContent)
  }

  //파람스 사용해서 리다이렉트로 바꿔야하는듯
  return (
    <Container className="matchcontainer">
      <ul className="matchbar">
        <li className="problem-title">
          문제 이름
        </li>
        <li>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {currentLang}
            </Dropdown.Toggle>
            <DropdownMenu>
              <DropdownItem onClick={onClickLanguage} >{matchlang[0]}</DropdownItem>
              <DropdownItem onClick={onClickLanguage} >{matchlang[1]}</DropdownItem>
              <DropdownItem onClick={onClickLanguage} >{matchlang[2]}</DropdownItem>
              <DropdownItem onClick={onClickLanguage} >{matchlang[3]}</DropdownItem>
            </DropdownMenu>
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
          <Tabs>
            <Tab eventKey="console" title="console">
              hi
              
            </Tab>
          </Tabs>
        </Col>
      </Row>
      
      
    </Container>
  )
}