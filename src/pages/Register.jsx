import { Container } from "react-bootstrap";
import UserForm from "../components/User/UserForm";
import { api } from "../services/api";
function Register() {
    document.title = 'Meu Zeus | Criar conta';
    function handleRegister(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        api.post('/users', {
            username: username,
            password: password
        }).then((response) => console.log(response.data)).catch((e) => console.log(e.message));
    }
    return (
        <Container className="mt-5">
            <h1>Criar conta</h1>
            <UserForm handler={handleRegister} btnText={'Registrar'}/>
            <p>Já possui uma conta? <a className="text-decoration-none" href="/login">Entrar</a></p>
        </Container>
    );
}

export default Register;