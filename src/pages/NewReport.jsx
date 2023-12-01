import Container from "react-bootstrap/esm/Container";
import ReportForm from "../components/Report/ReportForm";
import Message from "../components/Fixed/Message";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function NewReport() {
    document.title = 'Meu Zeus | Novo relatório'
    const user = JSON.parse(window.localStorage.getItem('user'));
    const nav = useNavigate();
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');
    function handlePost() {
        const date = new Date(document.getElementById('date').value);
        const cost = document.getElementById('cost').value;
        const brand = document.getElementById('brand').value;
        const amount = parseInt(document.getElementById('amount').value.replace(',', '').replace('.', ''));
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
            }).then((response) => {
                setMessage(response.data.message);
                setType(response.data.type);
                setShow(true);
                if (response.data.type === 'success') {
                    setTimeout(() => {
                        nav('/')
                    }, 3000);
                }
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
        <>
            <Container className="my-5">
                <Container>
                    <h1>Adicionar relatório</h1>
                </Container>
                <Message show={show} txt={message} type={type} />
                <ReportForm handler={handlePost} />
            </Container>
        </>
    );
}

export default NewReport;