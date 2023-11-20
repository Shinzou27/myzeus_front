import Container from 'react-bootstrap/esm/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/esm/Button'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <Container className='my-5 py-5'>
      <Row>
        <Col>
          <Button variant='success'><Link style={{textDecoration: 'none'}} className='text-white' to={'/new'}>Adicionar novo relatório</Link></Button>
        </Col>
        <Col>
          <Button variant='success'><Link style={{textDecoration: 'none'}} className='text-white' to={'/overview'}>Ver lista de relatórios</Link></Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Home