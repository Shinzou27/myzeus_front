import { Modal, Row, Button } from "react-bootstrap";
function PetModal({ pet, show, handleClose, handleRemove }) {
    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{pet.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <label className='fw-bold'>Nome:</label>
                        <p>{pet.name}</p>
                    </Row>
                    <Row>
                        <label className='fw-bold'>Tipo:</label>
                        <p>{pet.type}</p>
                    </Row>
                    <Row>
                        <label className='fw-bold'>Raça:</label>
                        <p>{pet.breed}</p>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} variant='secondary'>Voltar</Button>
                    <Button onClick={handleRemove} variant='danger'>Apagar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PetModal;