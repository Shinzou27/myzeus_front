import Container from "react-bootstrap/Container"
import TableFilter from "../components/TableFilter"
import FoodTable from "../components/Table/FoodTable"
import ReportInfo from "../components/Report/ReportInfo"
import Button from "react-bootstrap/esm/Button"

import { useEffect, useState } from "react"

function Overview() {
    const [limits, setLimits] = useState({start: new Date('2000-01-01'), end: new Date('2099-12-31')});
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);

    let mock = [
        { date: '2023-11-10', cost: 'R$1,00' },
        { date: '2023-11-11', cost: 'R$2,00' },
        { date: '2023-11-12', cost: 'R$3,00' },
        { date: '2023-12-10', cost: 'R$1,00' },
        { date: '2023-12-11', cost: 'R$2,00' },
        { date: '2023-12-12', cost: 'R$3,00' },
    ];
    function handleClose() {
        setShow(false)
    };
    function handleShow() {
        setShow(true)
    };
    function dateInterval(start, end) {
        isNaN(new Date(start).getFullYear()) ? start = limits.start :  start =  new Date(start);
        isNaN(new Date(end).getFullYear())  ? end = limits.end : end =  new Date(end);
        console.log(start, end);
        setLimits({start: start, end: end});
    }
    useEffect(() => {
        let aux = mock.filter((item) => new Date(item.date) <= limits.end);
        aux = aux.filter((item) => new Date(item.date) >= limits.start);
        setData(aux);
    }, [limits]);
    console.log(data);
    return (
        <Container className="mt-4">
            <ReportInfo data={mock[0]} handleClose={handleClose} show={show}/>
            <Container>
                <h1>Visão Geral</h1>
                <Button onClick={handleShow}>Teste modal</Button>
            </Container>
            <Container>
                <TableFilter handleClick={dateInterval}/>
                <FoodTable data={data}/>
            </Container>
        </Container>
    )
}

export default Overview