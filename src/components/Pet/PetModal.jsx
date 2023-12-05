import { Modal, Row, Button, InputGroup } from "react-bootstrap";
import { useAuth } from "../../context/useAuth";
import { useState } from "react";
import FoodTable from '../Table/FoodTable'
import { api } from "../../services/api";

function PetModal({ show, handleClose }) {
    const { pets, reports, updatePets, updateReports } = useAuth();
    const [pet, setPet] = useState();
    const [contextReports, setContextReports] = useState();
    const [state, setState] = useState(true);
    function handlePetReports(id) {
        setPet(pets.filter((pet) => pet.id == id)[0]);
        setContextReports(reports.filter(report => report.petId === id));
    }
    function exitModal() {
        setPet(null);
        setContextReports(null);
        setState(true);
        handleClose();
        window.reload();
    }
    function removePet() {
        api.delete(`/pets/${pet.id}`).then(() => window.location.reload());
        updatePets();
        updateReports();
        exitModal();
    }
    function toggleButton() {
        setState(!state)
    }
    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            {pet ?
                <>
                    <Modal.Header closeButton>
                        <Modal.Title>Remover pet</Modal.Title>
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
                        <Row>
                            <label className='fw-bold'>Rações compradas:</label>
                            <FoodTable data={contextReports} displayOnly={true} />
                        </Row>
                        <InputGroup className="mt-3 pet-removal-checkbox">
                            <InputGroup.Text className="text-wrap"> <InputGroup.Checkbox className="danger" onClick={toggleButton} />Entendo que ao apagar um pet do meu perfil, todos os relatórios relacionados a ele também serão apagados.</InputGroup.Text>
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={exitModal} variant='secondary'>Voltar</Button>
                        <Button disabled={state} onClick={removePet} variant='danger'>Apagar</Button>
                    </Modal.Footer>
                </>
                :
                <>
                    <Modal.Header closeButton>
                        <Modal.Title>Remover pet</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <label>Escolha um de seus pets para remover</label>
                            <select onChange={(e) => handlePetReports(parseInt(e.target.value))} className="mx-3 report-input report-select" id="pet">
                                <option disabled selected value="0">Selecione um pet...</option>
                                {pets.map((pet) => <option key={pet.id} value={pet.id}>{pet.name}</option>)}
                            </select>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={exitModal} variant='secondary'>Voltar</Button>
                    </Modal.Footer>
                </>}
        </Modal>
    );
}

export default PetModal;