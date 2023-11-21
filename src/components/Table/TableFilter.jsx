import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
function TableFilter({handleClick}) {
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
            <Button onClick={sendDates} className='my-2' variant='success'>Filtrar</Button>
        </Container>
    );
}

export default TableFilter;