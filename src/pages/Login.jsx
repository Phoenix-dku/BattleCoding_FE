import { Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import './Login.css'
import axios from "axios";

export default function Login(){
  const [m_loginId, setId] = useState("");
  const [m_password,setPassword] = useState("");

  const [idMessage, setIdMessage] = useState("")
  const [passwordMessage, setPasswordMessage] = useState("")

  const loginId = (e) => {
    const currentId = e.target.value;
    setId(currentId);
  }

  const loginPassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios({
      method: "post",
      url: "/login",
      headers:{
        'Content-Type': 'application/json'
      },
      data: {
        loginId : m_loginId,
        password: m_password,
        },
      }).then((res)=>{
        console.log(res)
        if(res.data === "로그인 성공"){
          alert('로그인되었습니다.')
          window.location.replace('/')
          sessionStorage.setItem("id",m_loginId)
          sessionStorage.setItem("login", "true")
          localStorage.setItem("id",m_loginId)
          localStorage.setItem("login","true")
        }else if(res.data ==="로그인 실패"){
          alert(res.data)
        }
        
      })
      .catch((error)=>{
        console.log(error)
      })
  };

  return(
    <div className="logincontainer">
      <Form className='logintype' onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='formBasicId'>
          <Form.Label>아이디</Form.Label>
          <Form.Control required value={m_loginId} onChange={loginId} type="text" placeholder='아이디를 입력하세요' />
          <Form.Text className='idmessage'>{idMessage}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control required 
            name="password"
            value={m_password}
            onChange={loginPassword} type="password" placeholder="Password" />
          <Form.Text className='password'>
            {passwordMessage}
          </Form.Text>
        </Form.Group>
        <Button variant="primary" className='loginpagebtn' type="submit">로그인</Button>
      </Form>
    </div>
  )
}