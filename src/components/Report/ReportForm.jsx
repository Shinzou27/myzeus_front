import Container from "react-bootstrap/esm/Container";
import Button from 'react-bootstrap/Button'
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

function ReportForm() {
    const nav = useNavigate()
    const user = JSON.parse(window.localStorage.getItem('user'));
    const pets = JSON.parse(window.localStorage.getItem('pets'));
    function handlePost() {
        const date = new Date(document.getElementById('date').value).toISOString();
        const cost = document.getElementById('cost').value;
        const brand = document.getElementById('brand').value;
        const amount = parseInt(document.getElementById('amount').value);
        const petId = parseInt(document.getElementById('pet').options[document.getElementById('pet').options.selectedIndex].value);
        api.post(`/reports?id=${user.id}`, {
            date: date,
            cost: cost,
            brand: brand,
            amount: amount,
            userId: user.id,
            petId: petId
        }).then(() => nav('/'));
    }
    function submit(e) {
        e.preventDefault();
    }
    return (
        <form onSubmit={submit} method="post">
            <Container className="flex-end">
                <label className="mx-3 form-label">Data da compra: </label>
                <input id="date" defaultValue={new Date().toISOString().slice(0, 10)} className="mx-3 form-input" type="date" />
            </Container>
            <Container className="flex-end">
                <label className="mx-3 form-label">Custo: </label>
                <input id="cost" className="mx-3 form-input" type="text" />
            </Container>
            <Container className="flex-end">
                <label className="mx-3 form-label">Marca: </label>
                <input id="brand" className="mx-3 form-input" type="text" />
            </Container>
            <Container className="flex-end">
                <label className="mx-3 form-label">Quantidade/Peso (g): </label>
                <input id="amount" className="mx-3 form-input" type="number" />
            </Container>
            <Container className="flex-end">
                <label className="mx-3 form-label">Pet: </label>
                <select className="mx-3 form-input" id="pet">
                    {pets.map((pet) => <option key={pet.id} value={pet.id}>{pet.name}</option>)}
                </select>
            </Container>
            <Button onClick={handlePost} type="button" variant="success">Enviar</Button>
        </form>
    );
}

export default ReportForm;