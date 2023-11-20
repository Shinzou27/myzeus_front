import Container from 'react-bootstrap/esm/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useState } from 'react'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <Container>
        <Row>
        <Col>
            Teste
        </Col>
        <Col>
            Teste
        </Col>
        </Row>
    </Container>
  )
}

export default Home