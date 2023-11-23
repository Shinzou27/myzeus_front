import { Container } from "react-bootstrap";

function UserSummary({user}) {
    return ( 
        <Container className="dashboard-container dashboard-summary">
            <h1 className="fs-5 m-2">Resumo geral de: <span>{user.username}</span></h1>
        </Container>
     );
}

export default UserSummary;