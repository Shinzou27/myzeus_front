import { Modal, Row, Button } from "react-bootstrap";
function PasswordModal({show, handleClose, updatePassword}) {
    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Alterar senha</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <label className='fw-bold'>Senha atual:</label>
                        <input id="currentPassword" type="password"/>
                    </Row>
                    <Row>
                        <label className='fw-bold'>Nova senha:</label>
                        <input id="newPassword" type="password"/>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} variant='danger'>Cancelar</Button>
                    <Button onClick={updatePassword} variant='success'>Alterar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PasswordModal;