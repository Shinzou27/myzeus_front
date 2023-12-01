import Container from "react-bootstrap/esm/Container";
import Button from 'react-bootstrap/Button'
import '../../styles/ReportForm.css';

function ReportForm({handler}) {
    const pets = JSON.parse(window.localStorage.getItem('pets'));
    function submit(e) {
        e.preventDefault();
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
            <Button onClick={handler} type="button" className="proj-30">Enviar</Button>
        </form>
    );
}

export default ReportForm;