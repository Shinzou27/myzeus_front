import { Container, Row, Col } from "react-bootstrap";
import UserSummary from "../components/Dashboard/UserSummary";
import OverviewRedirect from "../components/Dashboard/OverviewRedirect";
import GeneralCharts from "../components/Dashboard/GeneralCharts";
import '../styles/Dashboard.css';

function Dashboard() {
    document.title = 'Meu Zeus | Painel de Controle'
    return (
        <Container className="pt-5 w-100">
            <h1>Painel de Controle</h1>
            <Row>
                <Col md={4}>
                    <UserSummary />
                </Col>
                <Col md={8}>
                    <Row>
                        <GeneralCharts />
                    </Row>
                    <Row>
                        <OverviewRedirect />
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;