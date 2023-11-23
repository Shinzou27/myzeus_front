import Container from "react-bootstrap/Container"
import TableFilter from "../components/Table/TableFilter"
import FoodTable from "../components/Table/FoodTable"
import ReportModal from "../components/Report/ReportModal"
import Button from "react-bootstrap/esm/Button"
import { api } from "../services/api"

import { useEffect, useState } from "react"

function Overview() {
    const user = JSON.parse(window.localStorage.getItem('user'));
    const [limits, setLimits] = useState({ start: new Date('2000-01-01'), end: new Date('2099-12-31') });
    const [data, setData] = useState([]);
    const [fixedData, setFixedData] = useState([]);
    const [highlight, setHighlight] = useState();
    const [modalType, setModalType] = useState('');
    const [show, setShow] = useState(false);
    function handleClose() {
        setShow(false)
    };
    function handleShow() {
        setShow(true)
    };
    function dateInterval(start, end) {
        isNaN(new Date(start).getFullYear()) ? start = limits.start : start = new Date(start);
        isNaN(new Date(end).getFullYear()) ? end = limits.end : end = new Date(end);
        console.log(start, end);
        setLimits({ start: start, end: end });
    }
    function sortDate(a, b) {
        a = new Date(a.date);
        b = new Date(b.date);
        return (a - b);
    }
    function sortCost(a, b) {
        return parseFloat(a.cost.replace(',', '.')) - parseFloat(b.cost.replace(',', '.'));
    }
    useEffect(() => {
        console.log(fixedData);
        let aux = fixedData.filter((item) => new Date(item.date) <= limits.end);
        aux = aux.filter((item) => new Date(item.date) >= limits.start);
        setData(aux.sort(sortDate));
    }, [limits]);
    useEffect(() => {
        api.get(`/reports?id=${user.id}`).then((response) => {
            setFixedData(response.data.sort(sortDate));
            setData(response.data.sort(sortDate));
            console.log(fixedData);
        });
    }, []);
    function showModal(report, type) {
        setHighlight(report);
        setModalType(type);
        handleShow();
    }
    return (
        <Container className="mt-5">
            {highlight && <ReportModal type={modalType} report={highlight} setData={setData} handleClose={handleClose} show={show} />}
            <Container>
                <h1>Visão Geral</h1>
            </Container>
            <Container>
                <TableFilter handleClick={dateInterval} />
                <FoodTable data={data} handleModal={showModal} setModalType={setModalType} />
            </Container>
        </Container>
    )
}

export default Overview