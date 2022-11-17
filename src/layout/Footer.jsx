import { Container } from 'react-bootstrap'
import './Footer.css'

export default function Footer(){
  return (
    <footer className='footer'>
      <Container>
        frontend : 이기성 
        <br/>
        backend : 김도현 김지홍 최규현
      </Container>
    </footer>
  )
}