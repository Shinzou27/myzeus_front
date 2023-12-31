import { Container } from "react-bootstrap";
import UserForm from "../components/User/UserForm";
import Message from "../components/Fixed/Message";
import { api } from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
function Register() {
    document.title = 'Meu Zeus | Criar conta';
    const [show, setShow] = useState(false);
    const {login} = useAuth();
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');
    const nav = useNavigate();
    async function handleRegister(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const response = await login(username, password, true);
        if (response.user) {
            nav('/')
        } else {
            setMessage(response.message);
            setType('danger');
            setShow(true);
            setTimeout(() => {
                setShow(false);
            }, 3000);
        }
        /*
        api.post('/users', {
            username: username,
            password: password
        }).then((response) => {
            setMessage(response.data.message);
            setShow(true);
            setType(response.data.type);
            if (response.data.type == 'success') {
                setTimeout(async () => {
                    await login(username, password)
                }, 3000);
            }
        }).catch((e) => {
            console.log(e.message);
        });
        */
    }
    return (
        <Container className="mt-5 register">
            <h1>Criar conta</h1>
            <Message show={show} txt={message} type={type} />
            <UserForm handler={handleRegister} btnText={'Registrar'} />
            <p>Já possui uma conta? <a className="text-decoration-none" href="/login">Entrar</a></p>
        </Container>
    );
}

export default Register;