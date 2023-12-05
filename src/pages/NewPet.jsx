import { Container } from "react-bootstrap";
import PetForm from "../components/Pet/PetForm";
import Message from "../components/Fixed/Message";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useState } from "react";

function NewPet() {
    const nav = useNavigate();
    const {loggedUser, updatePets} = useAuth();
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');
    function addNewPet() {
        const name = document.getElementById('name').value;
        const breed = document.getElementById('breed').value;
        const type = document.getElementById('type').options[document.getElementById('type').options.selectedIndex].value;
        const allowance = handleVerify(name.length < 18, 'Nome longo demais.') &&
        handleVerify(name.replace(' ', '').replace(' ', '').length > 0, 'Nome inválido.') &&
        handleVerify(breed.length < 31, 'Raça longa demais.') &&
        handleVerify(breed.replace(' ', '').replace(' ', '').length > 0, 'Raça inválida.');
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
            });
            /*
            updateReports(report, (response) => {
                setMessage(response.data.message);
                setType(response.data.type);
                setShow(true);
                if (response.data.type === 'success') {
                    setTimeout(() => {
                        nav('/')
                    }, 3000);
                }
            })
            */
        }
    }
    function handleVerify(statement, message) {
        if (statement) {
            return true;
        }
        alert(message);
        return false;
    }
    return (
        <Container className="pt-5">
            <h1>Novo pet</h1>
            <Message show={show} txt={message} type={type} />
            <PetForm handler={addNewPet} />
        </Container>
    );
}

export default NewPet;