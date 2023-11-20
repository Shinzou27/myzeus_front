import Container from "react-bootstrap/esm/Container";
import Button from 'react-bootstrap/Button'
import { api } from "../../services/api";
function ReportForm() {
    function handlePost() {
        const date = new Date(document.getElementById('date').value).toISOString();
        const cost = document.getElementById('cost').value;
        console.log(date, cost);
        api.post('/reports', {
            date: date,
            cost: cost
        }).then((response) => console.log(response));
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
            <Button onClick={handlePost} type="button" variant="success">Enviar</Button>
        </form>
    );
}

export default ReportForm;