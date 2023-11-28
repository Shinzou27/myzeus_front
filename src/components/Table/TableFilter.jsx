import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
function TableFilter({handleClick, handleBrand}) {
    function sendDates() {
        const start = document.getElementById('start').value;
        const end = document.getElementById('end').value;
        handleClick(start, end);
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
            <Row className='my-2'>
                <h6>Filtrar por marca</h6>
                <Col onClick={() => handleBrand('A')}>A</Col>
                <Col onClick={() => handleBrand('B')}>B</Col>
                <Col onClick={() => handleBrand('C')}>C</Col>
                <Col onClick={() => handleBrand('D')}>D</Col>
            </Row>
            <Button onClick={sendDates} className='my-2 proj-30'>Filtrar</Button>
        </Container>
    );
}

export default TableFilter;