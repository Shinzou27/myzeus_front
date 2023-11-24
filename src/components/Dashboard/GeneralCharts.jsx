import { Container, Dropdown } from "react-bootstrap";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import { useState } from "react";

function GeneralCharts({ user }) {
    const [chart, setChart] = useState();
    function handleFilter(type) {
        if(type == 'date') {
            setChart(<LineChart title='Compras por mês' color='#aaa0ff'/>)
        } else if (type == 'cost') {
            setChart(<BarChart title='Intervalos de preço' color='#ffdd0a' data={user} />)
        } else {
            setChart(<PieChart title='Preferência de marcas' color='#fab0af' data={user} />)
        }
    }
    return (
        <Container className="dashboard-container dashboard-chart">
            <Container className="d-flex py-1">
                <Dropdown className="ms-auto pt-1">
                    <Dropdown.Toggle variant="success">Filtrar</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleFilter('date')}>Data</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFilter('cost')}>Custo</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFilter('brand')}>Marca</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
            <Container className="dashboard-chart-view">
                {chart ? chart: <p>Escolha um filtro para iniciar!</p>}
            </Container>
        </Container>
    );
}

export default GeneralCharts;