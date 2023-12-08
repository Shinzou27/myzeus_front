import Container from "react-bootstrap/esm/Container";
import Button from 'react-bootstrap/Button'
import '../../styles/ReportForm.css';
import { useAuth } from "../../context/useAuth";
import { Calendar, Coin, Shop, Calculator, LightningFill } from "react-bootstrap-icons";


function ReportForm({ handler }) {
    const { pets } = useAuth();
    function submit(e) {
        e.preventDefault();
    }
    function maskCost(e) {
        let mask = ['R$', ','];
        let input = e.target.value;
        let preComma = input.slice(0, input.length - 2)
        console.log(2 - preComma.length);
        preComma.length < 2 ? preComma = '0'.repeat(2 - preComma.length) + preComma : preComma = preComma;
        let postComma = input.slice(input.length - 2)
        console.log(`${mask[0]} ${preComma}${mask[1]}${postComma}`);
    }
    return (
        <form onSubmit={submit} method="post">
            <Container className="flex-end my-4">
                <label className="mx-3 report-label"><Calendar/> Data da compra:</label>
                <input id="date" defaultValue={new Date().toISOString().slice(0, 10)} className="mx-3 report-input" type="date" />
            </Container>
            <Container className="flex-end my-4">
                <label className="mx-3 report-label"><Coin/> Custo (R$): </label>
                <input id="cost" placeholder="Ex.: 70,00" className="mx-3 report-input" type="number" />
            </Container>
            <Container className="flex-end my-4">
                <label className="mx-3 report-label"><Shop/> Marca: </label>
                <input id="brand" placeholder="Ex.: A, B, C" className="mx-3 report-input" type="text" />
            </Container>
            <Container className="flex-end my-4">
                <label className="mx-3 report-label"><Calculator/> Quantidade/Peso (g): </label>
                <input id="amount" placeholder="Ex.: 100, 200, 1000" className="mx-3 report-input" type="number" />
            </Container>
            <Container className="flex-end my-4">
                <label className="mx-3 report-label"><LightningFill/> Pet: </label>
                <select className="mx-3 report-input report-select" id="pet">
                    {pets.map((pet) => <option key={pet.id} value={pet.id}>{pet.name}</option>)}
                </select>
            </Container>
            <Button onClick={handler} type="button" className="proj-30">Enviar</Button>
        </form>
    );
}

export default ReportForm;