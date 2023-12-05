import { Container, Row, Col, Button } from "react-bootstrap";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import Message from "../components/Fixed/Message";
import UserForm from "../components/User/UserForm";
import { useState } from "react";
import {useAuth} from "../context/useAuth";

function Login() {
    document.title = 'Meu Zeus | Entrar';
    const nav = useNavigate();
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');
    const {login} = useAuth();
    async function handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const response = await login(username, password);
        if (response.user) {
            nav('/');
        } else {
            setMessage(response.message);
            setType('danger');
            setShow(true);
            setTimeout(() => {
                setShow(false);
            }, 3000);
        }
    }
    return (
        <Container className="mt-5 login">
            <h1>Entrar</h1>
            <Message show={show} txt={message} type={type} />
            <UserForm handler={handleLogin} btnText={'Entrar'} />
            <p>Não possui uma conta? <a className="text-decoration-none" href="/register">Criar</a></p>
        </Container>
    );
}

export default Login;