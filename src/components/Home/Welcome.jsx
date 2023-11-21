import { Container } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/esm/Button'
import { Link } from 'react-router-dom'

function Welcome() {
    return (
        <Container className='w-50'>
            <Container className='mb-3 mt-5 pt-5'>
                <h1>Lorem ipsum <span id='highlight'>dolor</span> sit</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, totam.</p>
            </Container>
            <Container>
                <Row>
                    <Col>
                        <Button variant='success'><Link style={{ textDecoration: 'none' }} className='text-white' to={'/new'}>Adicionar novo relatório</Link></Button>
                    </Col>
                    <Col>
                        <Button variant='success'><Link style={{ textDecoration: 'none' }} className='text-white' to={'/overview'}>Ver lista de relatórios</Link></Button>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Welcome;