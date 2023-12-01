import { Container } from "react-bootstrap";
import PetForm from "../components/Pet/PetForm";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

function NewPet() {
    const nav = useNavigate();
    function addNewPet(e) {
        const user = JSON.parse(window.localStorage.getItem('user'));
        e.preventDefault();
        const name = document.getElementById('name').value;
        const breed = document.getElementById('breed').value;
        const type = document.getElementById('type').options[document.getElementById('type').options.selectedIndex].value;
        const allowance = handleVerify(name.length < 18, 'Nome longo demais.') &&
            handleVerify(name.replace(' ', '').replace(' ', '').length > 0, 'Nome inválido.') &&
            handleVerify(breed.length < 31, 'Raça longa demais.') &&
            handleVerify(breed.replace(' ', '').replace(' ', '').length > 0, 'Raça inválida.');
        if (allowance) {
            api.post('/pets', {
                name: name,
                breed: breed,
                type: type,
                userId: user.id
            }).then(() => {
                nav('/');
                window.location.reload();
            });
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
            <PetForm handler={addNewPet} />
        </Container>
    );
}

export default NewPet;