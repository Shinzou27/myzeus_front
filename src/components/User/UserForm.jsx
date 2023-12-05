import { Form, Row, Col, Button } from "react-bootstrap";
function UserForm({handler, btnText}) {
    return (
        <Form className="mt-5 w-50">
            <Form.Group as={Row}>
                <Form.Label column>Nome de usuário:</Form.Label>
                <Col>
                    <Form.Control required id="username" size="sm" type="text"></Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column>Senha:</Form.Label>
                <Col>
                    <Form.Control required id="password" size="sm" type="password"></Form.Control>
                </Col>
            </Form.Group>
            <Button onClick={handler} type="submit" variant="success">{btnText}</Button>
        </Form>
    );
}

export default UserForm;