import { Container, Nav, Navbar, NavbarBrand, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './Header.css'
import axios from "axios";

export function LoginHeader(props){
  const logoutHandler = async(e) => {
    await axios({
      method: 'post',
      url: '/logout',
    }).then((res)=>{
      localStorage.clear()
      sessionStorage.clear()
      alert('로그아웃되었습니다.')
      window.location.replace('/')
      console.log(res)
    }).catch((error)=>{
      console.log(error)
    })
  }
  return(
    <Nav>
      <Nav.Link href="/mypage">마이페이지</Nav.Link>
      <Button id='logoutbtn' onClick={logoutHandler}>
        로그아웃
      </Button>
    </Nav>
  )
}

export function LogoutHeader(){
  return(
    <Nav>
      <Nav.Link href="/login">로그인</Nav.Link>
      <Nav.Link href="/signup">
        회원가입
      </Nav.Link>
    </Nav>
  )
}


export default function Header(){
  const params = useParams();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(()=>{
    if(sessionStorage.getItem('id') === null){
      setIsLogin(false);
    }else{
      setIsLogin(true)
    }
  })
  const onClickMatch = (e) => {
    // e.preventDefault();
    // if(sessionStorage.getItem("id") === null){
    //   navigate("/login")
    //   console.log("hi")
    // }
  }


  return(
    <Navbar>
      <Container>
        <Navbar.Brand href="/">Battle Coding</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={onClickMatch} href={'/match/'+params.language}>Match</Nav.Link>
          </Nav>
          {isLogin ? <LoginHeader isLogin={isLogin}/>: <LogoutHeader/>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}