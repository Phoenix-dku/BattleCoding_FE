import { Card, Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import './Invite.css'

export default function Invite(props){
  const params = useParams();
  const navigate = useNavigate();

  console.log(props)

  const onClickyes = () =>{
    navigate("/match/"+params);
  }
  const onClickno = () => {
    
  }
  return(
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>초대한 사람 이름</Card.Title>
        <Card.Text>
          초대 메세지
        </Card.Text>
        <Button onClick={onClickno} variant="primary">거절</Button>
        <Button onClick={onClickyes} variant="primary">수락</Button>
      </Card.Body>
    </Card>
  )
}