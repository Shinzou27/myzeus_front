import Container from "react-bootstrap/esm/Container";
import { Alert } from "react-bootstrap";
import ReportForm from "../components/Report/ReportForm";
import Message from "../components/Fixed/Message";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/useAuth";
import '../styles/AppForm.css'

function NewReport() {
    document.title = 'Meu Zeus | Novo relatório'
    const {pets, loggedUser, updateReports} = useAuth();
    const nav = useNavigate();
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');
    function handlePost() {
        const date = new Date(document.getElementById('date').value);
        const cost = document.getElementById('cost').value;
        const brand = document.getElementById('brand').value;
        const amount = parseInt(document.getElementById('amount').value.replace(',', '').replace('.', ''));
        const petId = parseInt(document.getElementById('pet').options[document.getElementById('pet').options.selectedIndex]?.value) | '';
        const allowance = handleVerify(!isNaN(date), 'Data inválida.') &&
            handleVerify(!(date.getFullYear() < 2010), 'Data antiga demais.') &&
            handleVerify(!(date.getTime() > new Date(Date('now')).getTime()), 'Datas futuras não podem ser inseridas.') &&
            handleVerify(cost != '', 'Custo inválido.') &&
            handleVerify(parseFloat(cost.replace('.', ',')) > 0, 'Insira um valor de custo positivo.') &&
            handleVerify(!isNaN(parseFloat(cost.replace('.', ','))), 'Formato de custo inválido.') &&
            handleVerify(brand.length < 18, 'Nome de marca longo demais.') &&
            handleVerify(brand.length > 0, 'Nome de marca inválido.') &&
            handleVerify(brand.replace(' ', '').replace(' ', '').length > 0, 'Nome de marca inválido.') &&
            handleVerify(amount > 0, 'Quantidade inválida.') &&
            handleVerify(petId, 'Pet inválido.');

        
        if (allowance) {
            const report = {
                date: date.toISOString(),
                cost: cost,
                brand: brand,
                amount: amount,
                userId: loggedUser.id,
                petId: petId
            }
            updateReports(report, (response) => {
                setMessage(response.data.message);
                setType(response.data.type);
                setShow(true);
                if (response.data.type === 'success') {
                    setTimeout(() => {
                        nav('/')
                        window.location.reload();
                    }, 3000);
                }
            }, 'post')
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
        <>
            <Container className="my-5 new-report">
                <Container>
                    <h1>Adicionar relatório</h1>
                </Container>
                <Message show={show} txt={message} type={type} />
                <ReportForm handler={handlePost} />
                {pets.length == 0 && <Alert className="my-1" variant="primary">Vimos que você não tem nenhum pet adicionado... <span className="c-pointer" onClick={() => {
                    nav('/newpet')
                    window.location.reload();
                    }}>Adicione seus pets</span> para poder criar novos relatórios!</Alert>}
            </Container>
        </>
    );
}

export default NewReport;