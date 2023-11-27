import { Container, Row, Col, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/User/UserForm";

function Login() {
    const nav = useNavigate();
    function handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        api.get(`/users?username=${username}&password=${password}`).then((response) => {
            window.localStorage.setItem('user', JSON.stringify(response.data));
            nav('/');
            window.location.reload();
        }).catch((e) => console.log(e.message));
    }
    return (
        <Container className="mt-5">
            <h1>Entrar</h1>
            <UserForm handler={handleLogin} btnText={'Entrar'}/>
            <p>Não possui uma conta? <a className="text-decoration-none" href="/register">Criar</a></p>
        </Container>
    );
}

export default Login;