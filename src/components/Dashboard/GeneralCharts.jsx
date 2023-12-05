import { Container, Dropdown } from "react-bootstrap";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import { useState } from "react";
import { useAuth } from "../../context/useAuth";

function GeneralCharts() {
    const [chart, setChart] = useState();
    const { pets, reports } = useAuth();
    const colors = ['#19ff79', '#fcd303', '#10a166', '#deab02', '#00f391', '#ebb915'];
    function handleFilter(type) {
        if (type == 'date') {
            setChart(<LineChart title='Compras por mês' color={colors} pets={pets} reports={reports} />)
        } else if (type == 'cost') {
            setChart(<BarChart title='Intervalos de preço' color={colors} pets={pets} reports={reports} />)
        } else {
            setChart(<PieChart title='Preferência de marcas' color={colors} pets={pets} reports={reports} />)
        }
    }
    return (
        <Container className="dashboard-container dashboard-chart">
            <Container className="d-flex py-1 dashboard-filter">
                <Dropdown className="ms-auto pt-1">
                    <Dropdown.Toggle className="proj-30">Filtrar</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleFilter('date')}>Data</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFilter('cost')}>Custo</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFilter('brand')}>Marca</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
            <Container className="dashboard-chart-view">
                {chart ? chart : <p>Escolha um filtro para iniciar!</p>}
            </Container>
        </Container>
    );
}

export default GeneralCharts;