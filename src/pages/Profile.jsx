import { Button, Container, Image } from "react-bootstrap";
import placeholder from '../assets/placeholder.jpeg';
import { useNavigate } from "react-router-dom";
import PasswordModal from "../components/User/PasswordModal";
import PetCarousel from "../components/Pet/PetCarousel";
import { useState } from "react";
import { api } from "../services/api";
import '../styles/Profile.css'

function Profile() {
    const user = JSON.parse(window.localStorage.getItem('user'));
    const pets = JSON.parse(window.localStorage.getItem('pets'));
    document.title = 'Meu Zeus | Perfil';
    const [show, setShow] = useState(false);
    const nav = useNavigate();
    console.log(user);
    function updatePassword() {
        handleShow();
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        api.put(`/users/${user.id}`, {
            current: currentPassword,
            new: newPassword
        }).then((response) => console.log(response.data))
    }
    function handleLogout() {
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('reports');
        nav('/');
        window.location.reload();
    }
    function handleClose() {
        setShow(false)
    }
    function handleShow() {
        setShow(true);
    }
    return (
        <Container className="profile">
            <PasswordModal user={user} show={show} handleClose={handleClose} updatePassword={updatePassword} />
            <h1>Perfil de {user.username}</h1>
            <hr />
            <Container className="d-flex justify-content-between">
                <Image width={256} height={256} className="align-self-center" src={placeholder} />
                <Container className="profile-info">
                    <Container>
                        <h4>Informações pessoais</h4>
                        <h6>Usuário: </h6>
                        <p>{user.username}</p>
                        <h6>Senha</h6>
                        <p>••••••••</p>
                    </Container>
                    <h6>Usuário: </h6>
                    <p>{user.username}</p>
                    <h6>Senha</h6>
                    <p>••••••••</p>
                    <Container className="profile-options">
                        <a onClick={handleShow}>Alterar senha</a>
                        <a className="text-danger text-decoration-none" onClick={handleLogout}>Sair</a>
                    </Container>
                </Container>
                <Container className="profile-pet">
                    <h4>Seus pets</h4>
                    <PetCarousel pets={pets} />
                    <Button href="/newpet" className="proj-30">Adicionar novo pet</Button>
                </Container>
            </Container>
        </Container>
    );
}

export default Profile;