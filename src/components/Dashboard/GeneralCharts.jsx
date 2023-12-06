import { Container, Dropdown } from "react-bootstrap";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import { useState } from "react";
import { useAuth } from "../../context/useAuth";

function GeneralCharts() {
    const [chart, setChart] = useState();
    const { pets, reports } = useAuth();
    const colors = ['#8896ff', '#F0E351', '#445396', '#deab02', '#6e85eb', '#ebc75e'];
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
            {reports.length > 0 ?
                <>
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
                </>
                :
                <>
                    <Container className="dashboard-chart-view">
                        <h1 className="fs-5">Você ainda não adicionou nenhuma compra!</h1>
                    </Container>
                </>
            }
        </Container>
    );
}

export default GeneralCharts;