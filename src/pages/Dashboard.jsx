import { Container, Row, Col } from "react-bootstrap";
import UserSummary from "../components/Dashboard/UserSummary";
import OverviewRedirect from "../components/Dashboard/OverviewRedirect";
import GeneralCharts from "../components/Dashboard/GeneralCharts";
import { useEffect, useState } from "react";
import {api} from '../services/api'
function Dashboard() {
    const user = JSON.parse(window.localStorage.getItem('user'));
    useEffect(() => {
        api.get(`/reports?id=${user.id}`).then((response) => {
            window.localStorage.setItem('reports', JSON.stringify(response.data))
        });
    })
    return (
        <Container className="pt-5">
            <h1>Painel de Controle</h1>
            <Row>
                <Col md={4}>
                    <UserSummary user={user}/>
                </Col>
                <Col md={8}>
                    <Row>
                        <GeneralCharts user={user}/>
                    </Row>
                    <Row>
                        <OverviewRedirect/>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;