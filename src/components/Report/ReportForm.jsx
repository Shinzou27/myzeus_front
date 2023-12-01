import Container from "react-bootstrap/esm/Container";
import Button from 'react-bootstrap/Button'
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import '../../styles/ReportForm.css';

function ReportForm() {
    const nav = useNavigate()
    const user = JSON.parse(window.localStorage.getItem('user'));
    const pets = JSON.parse(window.localStorage.getItem('pets'));
    function handlePost() {
        const date = new Date(document.getElementById('date').value);
        const cost = document.getElementById('cost').value.replace(',', '.');
        const brand = document.getElementById('brand').value;
        const amount = parseInt(document.getElementById('amount').value);
        const petId = parseInt(document.getElementById('pet').options[document.getElementById('pet').options.selectedIndex].value);

        const allowance = handleVerify(!isNaN(date), 'Data inválida.') &&
            handleVerify(!(date.getFullYear() < 2010), 'Data antiga demais.') &&
            handleVerify(!(date.getTime() > new Date(Date('now')).getTime()), 'Datas futuras não podem ser inseridas.') &&
            handleVerify(cost != '', 'Custo inválido.') &&
            handleVerify(!isNaN(parseFloat(cost.replace('.', ','))), 'Custo inválido.') &&
            handleVerify(brand.length < 18, 'Nome de marca longo demais.') &&
            handleVerify(brand.length > 0, 'Nome de marca inválido.') &&
            handleVerify(brand.replace(' ', '').replace(' ', '').length > 0, 'Nome de marca inválido.') &&
            handleVerify(amount > 0, 'Quantidade inválida.') &&
            handleVerify(petId, 'Pet inválido.');
        if (allowance) {
            api.post(`/reports?id=${user.id}`, {
                date: date.toISOString(),
                cost: cost,
                brand: brand,
                amount: amount,
                userId: user.id,
                petId: petId
            }).then(() => nav('/'));
        }
    }
    function submit(e) {
        e.preventDefault();
    }
    function handleVerify(statement, message) {
        if (statement) {
            return true;
        }
        alert(message);
        return false;
    }
    return (
        <form onSubmit={submit} method="post">
            <Container className="flex-end my-4">
                <label className="mx-3 report-label">Data da compra: </label>
                <input id="date" defaultValue={new Date().toISOString().slice(0, 10)} className="mx-3 report-input" type="date" />
            </Container>
            <Container className="flex-end my-4">
                <label className="mx-3 report-label">Custo (R$): </label>
                <input id="cost" placeholder="Ex.: 50,00" className="mx-3 report-input" type="text" />
            </Container>
            <Container className="flex-end my-4">
                <label className="mx-3 report-label">Marca: </label>
                <input id="brand" placeholder="Ex.: A, B, C" className="mx-3 report-input" type="text" />
            </Container>
            <Container className="flex-end my-4">
                <label className="mx-3 report-label">Quantidade/Peso (g): </label>
                <input id="amount" placeholder="Ex.: 100, 200, 1000" className="mx-3 report-input" type="number" />
            </Container>
            <Container className="flex-end my-4">
                <label className="mx-3 report-label">Pet: </label>
                <select className="mx-3 report-input report-select" id="pet">
                    {pets.map((pet) => <option key={pet.id} value={pet.id}>{pet.name}</option>)}
                </select>
            </Container>
            <Button onClick={handlePost} type="button" className="proj-30">Enviar</Button>
        </form>
    );
}

export default ReportForm;