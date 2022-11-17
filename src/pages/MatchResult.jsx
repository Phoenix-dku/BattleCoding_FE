import { Container } from "react-bootstrap";
import './MatchResult.css'

export default function MatchResult(){
  return (
    <Container>
      <div id="whowin">승리 or 패배</div>
      <Container id="player">
        <div>
          Host
          <div>
            host name
            <div>
              전적
            </div>
          </div>
        </div>
        <div>
          Guest
          <div>
            guest name
            <div>
              전적
            </div>
          </div>
        </div>
      </Container>
    </Container>
  )
}