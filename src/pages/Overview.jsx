import Container from "react-bootstrap/Container"
import TableFilter from "../components/Table/TableFilter"
import FoodTable from "../components/Table/FoodTable"
import ReportModal from "../components/Report/ReportModal"
import Button from "react-bootstrap/esm/Button"
import { api } from "../services/api"

import { useEffect, useState } from "react"
import { useAuth } from "../context/useAuth"

function Overview() {
    const { reports, pets } = useAuth();
    document.title = 'Meu Zeus | Visão Geral';
    const [limits, setLimits] = useState({ start: new Date('2000-01-01'), end: new Date('2099-12-31') });
    const [data, setData] = useState([]);
    const [fixedData, setFixedData] = useState([]);
    const [filteredPets, setFilteredPets] = useState([]);
    const [highlight, setHighlight] = useState();
    const [highlightPet, setHighlightPet] = useState();
    const [modalType, setModalType] = useState('');
    const [show, setShow] = useState(false);
    const [sorter, setSorter] = useState('');
    function handleClose() {
        setShow(false)
    };
    function handleShow() {
        setShow(true)
    };
    function dateInterval(start, end) {
        isNaN(new Date(start).getFullYear()) ? start = limits.start : start = new Date(start);
        isNaN(new Date(end).getFullYear()) ? end = limits.end : end = new Date(end);
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
    function sortPet(a, b) {
        const petA = pets.filter((pet) => pet.id == a.petId)[0].name;
        const petB = pets.filter((pet) => pet.id == b.petId)[0].name;
        return petA.localeCompare(petB);
    }
    function sortBrand(a, b) {
        return a.brand.localeCompare(b.brand);
    }
    function sortAmount(a, b) {
        return a.amount - b.amount;
    }
    useEffect(() => {
        let aux = fixedData.filter((item) => new Date(item.date) <= limits.end);
        aux = aux.filter((item) => new Date(item.date) >= limits.start);
        if (filteredPets.length > 0) (aux = aux.filter((report) => filteredPets.includes(report.petId)));
        if (sorter.includes('cost')) {
            aux.sort(sortCost);
        } else if (sorter.includes('amount')) {
            aux.sort(sortAmount);
        } else if (sorter.includes('brand')) {
            aux.sort(sortBrand);
        } else if (sorter.includes('pet')) {
            aux.sort(sortPet);
        } else {
            aux.sort(sortDate);
        }
        sorter.includes('desc') ? setData(aux.reverse()) : setData(aux);
    }, [limits, filteredPets, sorter]);
    useEffect(() => {
        setFixedData(reports.sort(sortDate));
        setData(reports.sort(sortDate));
    }, []);
    function showModal(report, type) {
        setHighlight(report);
        setHighlightPet(pets.filter((pet) => pet.id === report.petId)[0]);
        setModalType(type);
        handleShow();
    }
    function filterBrand(brand) {
        let aux = data.filter((report) => report.brand == brand);
        setData(aux);
    }
    function filterPet(pet) {
        if (!filteredPets.includes(pet)) {
            let aux = filteredPets;
            aux.push(pet);
            setFilteredPets(aux);
        } else {
            let aux = filteredPets;
            aux.splice(aux.indexOf(pet), 1);
            setFilteredPets(aux);
        }
    }
    function resetFilters() {
        setLimits({ start: new Date('2000-01-01'), end: new Date('2099-12-31') });
        setData(fixedData);
        setFilteredPets([]);
        const petContainer = document.getElementById('filter-container');
        for (let i = 0; i < petContainer.childNodes.length; i++) {
            petContainer.childNodes[i].classList.add('proj-30');
            petContainer.childNodes[i].classList.add('unselected');
            petContainer.childNodes[i].classList.remove('proj-10');
            petContainer.childNodes[i].classList.remove('selected');
        }
    }
    return (
        <Container className="mt-5">
            {highlight && <ReportModal type={modalType} report={highlight} pet={highlightPet} setData={setData} handleClose={handleClose} show={show} />}
            <Container>
                <h1>Visão Geral</h1>
            </Container>
            <Container>
                <TableFilter handleClick={dateInterval} handlePet={filterPet} />
                <Button onClick={resetFilters} variant="danger" className="mb-2 filter-button">Limpar filtros</Button>
                <FoodTable data={data} handleModal={showModal} setModalType={setModalType} sorter={sorter} setSorter={setSorter} />
            </Container>
        </Container>
    )
}

export default Overview