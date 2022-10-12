import {useState } from "react";
import {Form, Container, Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Signup.css'

export default function Signup(){
  const [m_name, setName] = useState("");
  const [m_password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");


  const navigate = useNavigate();

  // 메시지
  const [nameMessage, setNameMessage] = useState("")
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  // 유효성 검사
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  

/**
 *  회원가입 제출 및 유효성 검사
 */
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios({
      method: "post",
      url: "/member/new",
      data: {
        m_name : m_name,
        m_password: m_password,
        },
      }).then((res)=>{
        if(res.data.response === 'success'){
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


  /**
   *  이름 입력 
   */
  const onChangeName = (e) => {
    const currentName = e.target.value;
    setName(currentName);
    if(m_name.length === 0){
      setNameMessage("이름을 한 글자 이상 적어주세요")
    } else{
      setNameMessage("이름을 적었습니다.")
    }
  }
  console.log(m_name)


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
        <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>이름</Form.Label>
            <Form.Control required value={m_name} onChange={onChangeName} type="text" placeholder="이름을 입력하세요" />
            <Form.Text className='name'>
              {nameMessage}
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