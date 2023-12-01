import { Form, Row, Col, Button } from "react-bootstrap";

function PetForm({handler}) {
    return ( 
        <Form className="mt-5 w-50 m-auto">
            <Form.Group as={Row}>
                <Form.Label column>Nome:</Form.Label>
                <Col>
                    <Form.Control required id="name" size="sm" type="text"/>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column>Tipo:</Form.Label>
                <Col>
                    <Form.Select required id="type" size="sm" type="password">
                        <option value="dog">Cachorro</option>
                        <option value="cat">Gato</option>
                        <option value="bird">Pássaro</option>
                        <option value="fish">Peixe</option>
                        <option value="others">Outros</option>
                    </Form.Select>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column>Raça:</Form.Label>
                <Col>
                    <Form.Control required id="breed" size="sm" type="text"/>
                </Col>
            </Form.Group>
            <Button onClick={handler} type="submit" variant="success">Adicionar</Button>
        </Form>
     );
}

export default PetForm;