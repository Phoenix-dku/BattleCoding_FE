import { Card, Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import './Invite.css'

export default function Invite(){
  const params = useParams();
  const navigate = useNavigate();
  const onClickyes = () =>{
    navigate("/match/"+params);
  }
  return(
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>초대한 사람 이름</Card.Title>
        <Card.Text>
          초대 메세지
        </Card.Text>
        <Button variant="primary">거절</Button>
        <Button onClick={onClickyes} variant="primary">수락</Button>
      </Card.Body>
    </Card>
  )
}