import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/esm/Button';
import { api } from '../../services/api';

function ReportModal({ report, show, handleClose, type }) {
    function handleEdit() {
        const newDate = new Date(document.getElementById('newDate').value).toISOString();
        const newCost = document.getElementById('newCost').value;
        api.put(`/reports/${report.id}`, {
            date: newDate,
            cost: newCost
        }).then((response) => {
            console.log(response.data);
            window.location.reload();
        })
    }
    function handleDelete() {
        api.delete(`/reports/${report.id}`).then((response) => {
            console.log(response.data);
            window.location.reload();
        })
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
                <Button onClick={handleClose} variant='error'>Cancelar</Button>
                <Button onClick={handleDelete} variant='success'>Salvar</Button>
            </Modal.Footer>
        </>
        : type == 'edit' ? modal =
        <>
            <Modal.Header closeButton>
                <Modal.Title>Editar relatório</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <label>Data</label>
                    <input type="date" id='newDate' defaultValue={new Date(report.date).toISOString().slice(0, 10)} />
                </Row>
                <Row>
                    <label>Custo</label>
                    <input type="text" id='newCost' defaultValue={report.cost} />
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} variant='error'>Cancelar</Button>
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
                    <label>Data</label>
                    <p>{parseDate(report.date)}</p>
                </Row>
                <Row>
                    <label>Custo</label>
                    <p>{report.cost}</p>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} variant='error'>Fechar</Button>
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