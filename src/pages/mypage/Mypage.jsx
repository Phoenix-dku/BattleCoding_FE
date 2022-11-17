import { Container, Row, Col } from "react-bootstrap";
import { Link, Route, Routes } from "react-router-dom";
import './Mypage.css'
import UserInfo from "./UserInfo";

export default function Mypage(){
  return(
    <section>

      <Container className="mypage_body">
      <Row>
        <Col xs={3} md={3} lg={3}>
          <aside className="column sidebar_left">
            <Container className="menu_container">
              <p className="mypage-logo">마이페이지</p>
              <p className="menu-label">회원관리</p>
              <ul className="menu-list">
                <li>
                  <Link to='/mypage'>회원 정보</Link>
                </li>
              </ul>

              <p className="menu-label">문제 관리</p>
              <ul className="menu-list">
                <li>
                  <Link to='/mypage/problem'>내가 만든 문제</Link>
                </li>
                <li>
                  <Link to='/mypage/battle/participation'>참가한 대전</Link>
                </li>
                <li>
                  <Link to='/mypage/battle/win'>이긴 문제</Link>
                </li>
                <li>
                  <Link to='/mypage/battle/lose'>진 문제</Link>
                </li>
              </ul>

              <p className="menu-label">내가 단 댓글</p>
              <ul className="menu-list">
                <li>
                  <Link to='/mypage/challenges/reply'>댓글</Link>
                </li>
              </ul>

            </Container>
          </aside>
        </Col>
        <Col xs={9} md={9} lg={9}>
          <Routes>
            <Route path="/*" element={<UserInfo/>}/>
          </Routes>
        </Col>
      </Row>
      </Container>
    </section>
  )
}