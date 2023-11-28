import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Image } from "react-bootstrap";
import app_icon from '../../assets/app_icon.png'

function Feedback() {
    return (
        <>
            <Container className="d-flex my-5 py-5">
                <Container className="align-self-center feedback-left">
                    <h3>Conheça alguns de nossos clientes!</h3>
                    <hr />
                    <p>Veja o que outras pessoas acham do Meu Zeus.</p>
                </Container>
                <Container className="d-flex">
                    <Card className="mx-2 pet-card">
                        <Card.Title className="pet-name">Zeus (Bulldog)</Card.Title>
                        <Card.Body className="feedback-desc">A plataforma é definitivamente uma das plataformas existentes. Depois de usá-la para gerenciar as rações que comprava, continuei sendo o mesmo!</Card.Body>
                        <Card.Footer className="pet-owner">Fulano I, São Paulo - SP</Card.Footer>
                    </Card>
                    <Card className="mx-2 pet-card">
                        <Card.Title className="pet-name">Zeus (Gato)</Card.Title>
                        <Card.Body className="feedback-desc">O Meu Zeus me ajudou muito! Agora, continuo comprando as mesmas rações, porém sei quanto sai do meu bolso todo mês.</Card.Body>
                        <Card.Footer className="pet-owner">Fulano II, Niterói - RJ</Card.Footer>
                    </Card>
                    <Card className="mx-2 pet-card">
                        <Card.Title className="pet-name">Zeus (Pastor Alemão)</Card.Title>
                        <Card.Body className="feedback-desc">Acabou a criatividade. Não tenho mais o que escrever. Só tô aqui porque preciso ser um placeholder um pouco maior!</Card.Body>
                        <Card.Footer className="pet-owner">Fulano III, Caucaia - CE</Card.Footer>
                    </Card>
                </Container>
            </Container>
            <Container className="app-container w-75">
                <h2>Baixe também nosso <span>app</span>!</h2>
                <Container className="d-flex w-75">
                    <Image className="app-img" src={app_icon} width={144} />
                    <p className="align-self-center">Atualize seu registro de compras sem precisar de computador! É rápido, fácil e feito pensando em você! Baixe o "Meu Zeus!" na App Store ou Play Store!</p>
                </Container>
            </Container>
        </>
    );
}

export default Feedback;