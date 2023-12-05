import { Button, Container, Image } from "react-bootstrap";
import placeholder from '../assets/placeholder.jpeg';
import { useNavigate } from "react-router-dom";
import PasswordModal from "../components/User/PasswordModal";
import PetModal from "../components/Pet/PetModal";
import PetCarousel from "../components/Pet/PetCarousel";
import { useState } from "react";
import { api } from "../services/api";
import '../styles/Profile.css'
import { useAuth } from "../context/useAuth";
import Message from '../components/Fixed/Message'

function Profile() {
    const { loggedUser, logout, pets } = useAuth();
    document.title = 'Meu Zeus | Perfil';
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showPetModal, setShowPetModal] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');
    function updatePassword() {
        handleClose();
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        api.put(`/users/${loggedUser.id}`, {
            current: currentPassword,
            new: newPassword
        }).then((response) => {
            setMessage(response.data.message);
            setType(response.data.type);
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        })
    }
    function handleLogout() {
        logout();
    }
    function handleClosePasswordModal() {
        setShowPasswordModal(false)
    }
    function handleShowPasswordModal() {
        setShowPasswordModal(true);
    }
    function handleClosePetModal() {
        setShowPetModal(false)
    }
    function handleShowPetModal() {
        setShowPetModal(true);
    }
    return (
        <Container className="profile">
            <PasswordModal user={loggedUser} show={showPasswordModal} handleClose={handleClosePasswordModal} updatePassword={updatePassword} />
            <PetModal show={showPetModal} handleClose={handleClosePetModal} />
            <h1>Perfil de {loggedUser.username}</h1>
            <hr />
            <Message show={showMessage} txt={message} type={type} />
            <Container className="d-flex justify-content-between">
                <Image className="align-self-center profile-img" src={placeholder} />
                <Container className="profile-info">
                    <Container>
                        <h4 className="fw-bold">Informações pessoais</h4>
                        <h6 className="fw-bold">Usuário: </h6>
                        <p>{loggedUser.username}</p>
                        <h6 className="fw-bold">Senha</h6>
                        <p>••••••••</p>
                    </Container>
                    <Container className="profile-options">
                        <a onClick={handleShowPasswordModal}>Alterar senha</a>
                        <a className="text-danger text-decoration-none" onClick={handleLogout}>Sair</a>
                    </Container>
                </Container>
                <Container className="profile-pet">
                    <h4 className="fw-bold">Seus pets</h4>
                    <PetCarousel pets={pets} />
                    <Button href="/newpet" className=" mt-1 proj-30">Adicionar novo pet</Button>
                    <Button onClick={handleShowPetModal} className=" mt-1 fw-bold" variant="danger">Remover pet</Button>
                </Container>
            </Container>
        </Container>
    );
}

export default Profile;