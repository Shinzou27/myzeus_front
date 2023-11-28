import Container from "react-bootstrap/Container"
import TableFilter from "../components/Table/TableFilter"
import FoodTable from "../components/Table/FoodTable"
import ReportModal from "../components/Report/ReportModal"
import Button from "react-bootstrap/esm/Button"
import { api } from "../services/api"

import { useEffect, useState } from "react"

function Overview() {
    const user = JSON.parse(window.localStorage.getItem('user'));
    const pets = JSON.parse(window.localStorage.getItem('pets'));
    document.title = 'Meu Zeus | Visão Geral';
    const [limits, setLimits] = useState({ start: new Date('2000-01-01'), end: new Date('2099-12-31') });
    const [data, setData] = useState([]);
    const [fixedData, setFixedData] = useState([]);
    const [highlight, setHighlight] = useState();
    const [highlightPet, setHighlightPet] = useState();
    const [modalType, setModalType] = useState('');
    const [show, setShow] = useState(false);
    const [sorter, setSorter] = useState('date');
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
    function sortBrand(a, b) {
        return a.brand.charCodeAt(0) - b.brand.charCodeAt(0);
    }
    
    function sortAmount(a, b) {
        return a.amount - b.amount;
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
            window.localStorage.setItem('reports', JSON.stringify(response.data))
        });
    }, []);
    function showModal(report, type) {
        setHighlight(report);
        setHighlightPet(pets.filter((pet) => pet.id === report.petId)[0]);
        setModalType(type);
        handleShow();
    }
    function filterBrand(brand) {
        let aux = fixedData.filter((report) => report.brand == brand);
        setData(aux);
    }
    function filterPet(pet) {
        let aux = fixedData.filter((report) => report.petId == pet);
        setData(aux);
    }
    return (
        <Container className="mt-5">
            {highlight && <ReportModal type={modalType} report={highlight} pet={highlightPet} setData={setData} handleClose={handleClose} show={show} />}
            <Container>
                <h1>Visão Geral</h1>
            </Container>
            <Container>
                <TableFilter handleClick={dateInterval} handlePet={filterPet}/>
                <Button className="proj-10 mb-2">Exportar para PDF</Button>
                <FoodTable data={data} handleModal={showModal} setModalType={setModalType} />
            </Container>
        </Container>
    )
}

export default Overview