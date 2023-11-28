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
    return ( 
        <Container className="pt-5">
            <h1>Novo pet</h1>
            <PetForm handler={addNewPet}/>
        </Container>
     );
}

export default NewPet;