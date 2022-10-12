import { Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import './Login.css'

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

  return(
    <div>
      <Container className="bannername">
        로그인
      </Container>
      <Form className='logintype'>
        <Form.Group className='mb-3' controlId='formBasicId'>
          <Form.Label>아이디</Form.Label>
          <Form.Control required value={m_loginId} onChange={loginId} type="text" placeholder='아이디를 입력하세요' />
          <Form.Text className='name'>{idMessage}</Form.Text>
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