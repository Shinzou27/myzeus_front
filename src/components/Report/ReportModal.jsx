import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/esm/Button';
import { api } from '../../services/api';
import { useAuth } from '../../context/useAuth';
import { useNavigate } from 'react-router-dom';

function ReportModal({ report, pet, show, handleClose, type }) {
    const {pets, updateReports} = useAuth();
    const nav = useNavigate();
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
    async function handleEdit() {
        const newDate = new Date(document.getElementById('newDate').value);
        const newCost = document.getElementById('newCost').value;
        const newBrand = document.getElementById('newBrand').value;
        const newAmount = parseInt(document.getElementById('newAmount').value);
        const newPetId = parseInt(document.getElementById('newPet').options[document.getElementById('newPet').options.selectedIndex].value);
        const allowance = handleVerify(!isNaN(newDate), 'Data inválida.') &&
            handleVerify(!(newDate.getFullYear() < 2010), 'Data antiga demais.') &&
            handleVerify(!(newDate.getTime() > new Date(Date('now')).getTime()), 'Datas futuras não podem ser inseridas.') &&
            handleVerify(newCost != '', 'Custo inválido.') &&
            handleVerify(parseFloat(newCost.replace('.', ',')) > 0, 'Insira um valor de custo positivo.') &&
            handleVerify(parseFloat(newCost.replace('.', ',')) < 100000, 'Insira um valor de custo menor.') &&
            handleVerify(!isNaN(parseFloat(newCost.replace('.', ','))), 'Formato de custo inválido.') &&
            handleVerify(newBrand.length < 18, 'Nome de marca longo demais.') &&
            handleVerify(newBrand.length > 0, 'Nome de marca inválido.') &&
            handleVerify(newBrand == removeSpecialChar(newBrand), 'O nome da marca contém caracteres inválidos.') &&
            handleVerify(newBrand.replace(' ', '').replace(' ', '').length > 0, 'Nome de marca inválido.') &&
            handleVerify(newAmount > 0, 'Quantidade inválida.') &&
            handleVerify(newAmount < 100000, 'Quantidade grande demais.') &&
            handleVerify(newPetId, 'Pet inválido.');
        if(allowance) {
            const newReport = {
                id: report.id,
                date: newDate.toISOString(),
                cost: newCost,
                brand: newBrand,
                amount: newAmount,
                petId: newPetId
            }
            await updateReports(newReport, () => {
                nav('/')
                window.location.reload();
            }, 'put')
        }
    }
    async function handleDelete() {
        await updateReports(report, () => {
            nav('/')
            window.location.reload();
        }, 'delete');
    }
    function parseDate(date) {
        const toFormat = new Date(date);
        let day;
        let month;
        toFormat.getUTCDate() < 10 ? day = "0" + toFormat.getUTCDate() : day = toFormat.getUTCDate();
        (toFormat.getUTCMonth() + 1) < 10 ? month = "0" + (toFormat.getUTCMonth() + 1) : month = (toFormat.getUTCMonth() + 1);
        return day + "/" + month + "/" + toFormat.getFullYear();
    }
    let modal;
    type == 'delete' ? modal =
        <>
            <Modal.Header closeButton>
                <Modal.Title>Apagar relatório</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Tem certeza que deseja apagar este relatório?
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} variant='secondary'>Cancelar</Button>
                <Button onClick={handleDelete} variant='danger'>Apagar</Button>
            </Modal.Footer>
        </>
        : type == 'edit' ? modal =
            <>
                <Modal.Header closeButton>
                    <Modal.Title>Editar relatório</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <label className='fw-bold'>Data</label>
                        <input type="date" id='newDate' defaultValue={new Date(report.date).toISOString().slice(0, 10)} />
                    </Row>
                    <Row>
                        <label className='fw-bold'>Pet</label>
                        <select id='newPet' defaultValue={pet.name}>
                            {pets.map((pet) => <option key={pet.id} value={pet.id}>{pet.name}</option>)}
                        </select>
                    </Row>
                    <Row>
                        <label className='fw-bold'>Custo</label>
                        <input type="number" id='newCost' defaultValue={report.cost} />
                    </Row>
                    <Row>
                        <label className='fw-bold'>Marca</label>
                        <input type="text" id='newBrand' defaultValue={report.brand} />
                    </Row>
                    <Row>
                        <label className='fw-bold'>Quantidade</label>
                        <input type="number" id='newAmount' defaultValue={report.amount} />
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} variant='danger'>Cancelar</Button>
                    <Button onClick={handleEdit} variant='success'>Salvar</Button>
                </Modal.Footer>
            </>
            : modal =
            <>
                <Modal.Header closeButton>
                    <Modal.Title>Detalhes do relatório</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <label className='fw-bold'>Pet</label>
                        <p>{pets.filter((pet) => pet.id == report.petId)[0].name}</p>
                    </Row>
                    <Row>
                        <label className='fw-bold'>Data</label>
                        <p>{parseDate(report.date)}</p>
                    </Row>
                    <Row>
                        <label className='fw-bold'>Custo</label>
                        <p>{report.cost}</p>
                    </Row>
                    <Row>
                        <label className='fw-bold'>Marca</label>
                        <p>{report.brand}</p>
                    </Row>
                    <Row>
                        <label className='fw-bold'>Quantidade (g)</label>
                        <p>{report.amount}</p>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} variant='danger'>Fechar</Button>
                </Modal.Footer>
            </>

    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                {modal}
            </Modal>
        </>
    );
}

export default ReportModal;