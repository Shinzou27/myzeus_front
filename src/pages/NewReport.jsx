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
        function handleVerify(statement, message) {
            if (statement) {
                return true;
            }
            alert(message);
            return false;
        }
        function removeSpecialChar(input) {
            const regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
            return input.replace(regex, '').replace(/[^a-zA-Z0-9 ]/g, "");
        }
        const allowance = handleVerify(!isNaN(date), 'Data inválida.') &&
            handleVerify(!(date.getFullYear() < 2010), 'Data antiga demais.') &&
            handleVerify(!(date.getTime() > new Date(Date('now')).getTime()), 'Datas futuras não podem ser inseridas.') &&
            handleVerify(cost != '', 'Custo inválido.') &&
            handleVerify(parseFloat(cost.replace('.', ',')) > 0, 'Insira um valor de custo positivo.') &&
            handleVerify(parseFloat(cost.replace('.', ',')) < 100000, 'Insira um valor de custo menor.') &&
            handleVerify(!isNaN(parseFloat(cost.replace('.', ','))), 'Formato de custo inválido.') &&
            handleVerify(brand.length < 18, 'Nome de marca longo demais.') &&
            handleVerify(brand.length > 0, 'Nome de marca inválido.') &&
            handleVerify(brand == removeSpecialChar(brand), 'O nome da marca contém caracteres inválidos.') &&
            handleVerify(brand.replace(' ', '').replace(' ', '').length > 0, 'Nome de marca inválido.') &&
            handleVerify(amount > 0, 'Quantidade inválida.') &&
            handleVerify(amount < 100000, 'Quantidade grande demais.') &&
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