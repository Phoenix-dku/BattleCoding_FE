import { Container, Spinner } from "react-bootstrap";
import './Loading.css'
export default function Loading(){
  return(
    <Container id="loader">
      <div id="loadingbox">
        <Spinner animation="border"/>
        <div>Loading...</div>
      </div>
    </Container>
  )
}