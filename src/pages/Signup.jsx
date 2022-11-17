import {useState } from "react";
import {Form, Container, Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Signup.css'

export default function Signup(){

  const [m_loginId, setLoginId] = useState("");
  const [m_password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");


  const navigate = useNavigate();

  // 메시지
  const [idMessage, setIdMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  // 유효성 검사
  const [isId, setIsId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  

/**
 *  회원가입 제출 및 유효성 검사
 */
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios({
      method: "post",
      url: "/signup",
      data: {
        loginId : m_loginId,
        password: m_password,
        },
      }).then((res)=>{
        console.log(res.status)
        if(res.status === 200){
          alert('회원가입 되었습니다.')
          navigate('/')
        }else{
          alert('빈칸이 있거나 조건을 충족하지 않습니다. 다시 입력해 주십시오.')
        }
      })
      .catch((error)=>{
        console.log(error)
      })
  };

  const onChangeId = (e) => {
    const currentId = e.target.value;
    setLoginId(currentId);
    const idRegExp = /^[a-zA-z0-9]{4,12}$/;

    if (!idRegExp.test(currentId)) {
      setIdMessage("4-12사이 대소문자 또는 숫자만 입력해 주세요!");
      setIsId(false);
    } else {
      setIdMessage("");
    }
  };




  /**
   * 패스워드 유효성 검사 및 입력 
   */
  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호 입니다.");
      setIsPassword(true);
    }
  };

  /**
   * 패스워드 일치 여부
   */
  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);
    if (m_password !== currentPasswordConfirm) {
      setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("일치되었습니다.");
      setIsPasswordConfirm(true);
    }
  };

  return (
    <div>
      <Form className='signtype'onSubmit={handleSubmit}>
        <h2>회원가입</h2><br/>

        <Form.Group className="mb-3" id='id' controlId="formBasicID">
          <Form.Label>아이디</Form.Label>
          <Form.Control required value={m_loginId} onChange={onChangeId} type="text" placeholder="아이디를 입력하세요." />
          <Form.Text className='id'>
            {idMessage}
          </Form.Text>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control required 
            name="password"
            value={m_password}
            onChange={onChangePassword} type="password" placeholder="Password" />
          <Form.Text className='password'>
            {passwordMessage}
          </Form.Text>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicPasswordAgain">
          <Form.Label>비밀번호 재확인</Form.Label>
          <Form.Control 
            required
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={onChangePasswordConfirm}type="password" placeholder="비밀번호 재확인" />
          <Form.Text className='password'>
            {passwordConfirmMessage}
          </Form.Text>
        </Form.Group>
        
        <Button variant="primary" className='signupsubmit' type="submit">
          제출
        </Button>
      </Form>
    </div>
  )
}