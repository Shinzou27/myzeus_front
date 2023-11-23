import { Container, Row, Col, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
    const nav = useNavigate();
    function handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        api.get(`/users?username=${username}`).then((response) => {
            window.localStorage.setItem('user', JSON.stringify(response.data));
            nav('/');
            window.location.reload();
        }).catch((e) => console.log(e.message));
    }
    return (
        <Form className="mt-5 w-50 m-auto">
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
            <Button onClick={handleLogin} type="submit" variant="success">Entrar</Button>
        </Form>
    );
}

export default Login;