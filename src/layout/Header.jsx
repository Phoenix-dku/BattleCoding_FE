import { Container, Navbar, NavbarBrand } from "react-bootstrap";
import './Header.css'

export default function Header(){
  return(
    <Navbar>
      <Container>
        <NavbarBrand href="/">배틀 코딩</NavbarBrand>
      </Container>
    </Navbar>
  )
}