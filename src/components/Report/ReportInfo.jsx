import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/esm/Button';
import { useState } from 'react';

function ReportInfo({data, show, handleClose}) {
    function handleEdit() {
        //TODO
    }
    return ( 
        <>
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Editar item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <label>Data</label>
                    <input type="date" value={data.date} />
                </Row>
                <Row>
                    <label>Custo</label>
                    <input type="text" value={data.cost}/>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} variant='error'>Cancelar</Button>
                <Button onClick={handleEdit} variant='success'>Salvar</Button>
            </Modal.Footer>
        </Modal>
        </>
     );
}

export default ReportInfo;