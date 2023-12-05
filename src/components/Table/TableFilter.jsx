import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import { useAuth } from '../../context/useAuth';

function TableFilter({ handleClick, handlePet }) {
    const {pets} = useAuth();
    function sendDates() {
        const start = document.getElementById('start').value;
        const end = document.getElementById('end').value;
        handleClick(start, end);
    }
    function sendPets(e, id) {
        const proj10 = 'pet-button proj-10 col selected';
        const proj30 = 'pet-button proj-30 col unselected';
        e.target.className == proj10 ? e.target.className = proj30 : e.target.className = proj10;
        handlePet(id);
    }
    return (
        <Container className='m-auto w-50'>
            <Row>
                <Col>
                    <Row><h6>Início</h6></Row>
                    <Row><input className='border-0 w-75 m-auto' type="date" id="start" /></Row>
                </Col>
                <Col>
                    <Row><h6>Fim</h6></Row>
                    <Row><input className='border-0 w-75 m-auto' type="date" id="end" /></Row>
                </Col>
            </Row>
            <h6 className='my-2'>Filtrar por pet</h6>
            <Row  id='filter-container'>
                {pets.map((pet) => (
                    <Col className='pet-button proj-30 unselected' key={pet.id} onClick={(e) => sendPets(e, pet.id)}>{pet.name}</Col>
                ))}
            </Row>
            <Button onClick={sendDates} className='my-2 proj-30 filter-button'>Filtrar</Button>
        </Container>
    );
}

export default TableFilter;