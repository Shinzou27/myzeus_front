import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";
import {Image} from "react-bootstrap";
import placeholder from '../../assets/placeholder.jpeg'

function Feedback() {
    return (
        <>
        <Container className="d-flex my-5 py-5">
            <Container className="d-flex">
                <Card className="mx-2 ">
                    <Card.Title>Teste</Card.Title>
                    <Card.Body>Texto de teste</Card.Body>
                    <Card.Footer>Fim do teste</Card.Footer>
                </Card>
                <Card className="mx-2">
                    <Card.Title>Teste</Card.Title>
                    <Card.Body>Texto de teste</Card.Body>
                    <Card.Footer>Fim do teste</Card.Footer>
                </Card>
                <Card className="mx-2">
                    <Card.Title>Teste</Card.Title>
                    <Card.Body>Texto de teste</Card.Body>
                    <Card.Footer>Fim do teste</Card.Footer>
                </Card>
            </Container>
            <Container className="align-self-center">
                <h3>Texto lateral</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
            </Container>
        </Container>
        <Container>
            <h2>Texto 2</h2>
            <Container className="d-flex w-75 justify-content-between">
            <Image src={placeholder} width={192} />
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda impedit, fugiat similique commodi vel consequuntur eius dolor, iste obcaecati quae molestiae? Maiores odit itaque dolores eveniet voluptate corporis blanditiis error.</p>
            </Container>
        </Container>
        </>
    );
}

export default Feedback;