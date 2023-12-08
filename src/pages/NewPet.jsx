import { Container } from "react-bootstrap";
import PetForm from "../components/Pet/PetForm";
import Message from "../components/Fixed/Message";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useState } from "react";
import Background from "../components/Fixed/Background";

function NewPet() {
    const nav = useNavigate();
    const { loggedUser, updatePets } = useAuth();
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');
    function handleVerify(statement, message) {
        if (statement) {
            return true;
        }
        alert(message);
        return false;
    }
    function removeSpecialChar(input) {
        const regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
        return input.replace(regex, '').replace(/[^a-zA-Z0-9 ]/g, "");
    }
    function addNewPet() {
        const name = document.getElementById('name').value;
        const breed = document.getElementById('breed').value;
        const type = document.getElementById('type').options[document.getElementById('type').options.selectedIndex].value;
        const allowance = handleVerify(name.length < 18, 'Nome longo demais.') &&
            handleVerify(name.replace(' ', '').replace(' ', '').length > 0, 'Nome inválido.') &&
            handleVerify(name == removeSpecialChar(name), 'O nome do pet contém caracteres inválidos.') &&
            handleVerify(breed.length < 31, 'Nome de raça longo demais.') &&
            handleVerify(breed == removeSpecialChar(breed), 'O nome da raça contém caracteres inválidos.') &&
            handleVerify(breed.replace(' ', '').replace(' ', '').length > 0, 'Nome de raça inválido.');
        if (allowance) {
            const pet = {
                name: name,
                breed: breed,
                type: type,
                userId: loggedUser.id
            }
            updatePets(pet, (response) => {
                setMessage(response.data.message);
                setType(response.data.type);
                setShow(true);
                if (response.data.type === 'success') {
                    setTimeout(() => {
                        nav('/')
                    }, 3000);
                }
            }, 'post');
        }
    }
    return (
        <Container className="my-5 new-pet-form">
            <Background type={'2'}/>
            <Container>
                <h1>Novo pet</h1>
            </Container>
            <Message show={show} txt={message} type={type} />
            <PetForm handler={addNewPet} />
        </Container>
    );
}

export default NewPet;