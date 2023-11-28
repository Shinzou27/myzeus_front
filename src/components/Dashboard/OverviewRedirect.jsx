import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function OverviewRedirect() {
    const nav = useNavigate();
    function handleNavigate() {
        nav('/overview');
    }
    return ( 
        <Container className="dashboard-container dashboard-redirect d-flex">
            <p>Prefere os dados na íntegra?</p>
            <Button className="proj-30" onClick={handleNavigate} >Ver lista de relatórios</Button>
        </Container>
     );
}

export default OverviewRedirect;