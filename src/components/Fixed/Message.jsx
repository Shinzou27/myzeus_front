import { Container } from "react-bootstrap";
import '../../styles/Message.css'

function Message({ show, txt, type }) {
    return show &&
        <Container>
            <div className={`alert alert-${type}`}>{txt}</div>
        </Container>

}

export default Message;