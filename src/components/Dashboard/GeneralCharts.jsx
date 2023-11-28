import { Container, Dropdown } from "react-bootstrap";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import { useState } from "react";

function GeneralCharts({ user }) {
    const [chart, setChart] = useState();
    const colors = ['#19ff79', '#fcd303', '#10a166', '#deab02', '#00f391', '#ebb915'];
    function handleFilter(type) {
        if(type == 'date') {
            setChart(<LineChart title='Compras por mês' color={colors[0]}/>)
        } else if (type == 'cost') {
            setChart(<BarChart title='Intervalos de preço' color='#ebb915' data={user} />)
        } else {
            setChart(<PieChart title='Preferência de marcas' colors={colors} data={user} />)
        }
    }
    return (
        <Container className="dashboard-container dashboard-chart">
            <Container className="d-flex py-1">
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
                {chart ? chart: <p>Escolha um filtro para iniciar!</p>}
            </Container>
        </Container>
    );
}

export default GeneralCharts;