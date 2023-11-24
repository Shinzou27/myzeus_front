import { Container, Image } from "react-bootstrap";
import { getSummary } from "./analytics";
import placeholder from '../../assets/placeholder.jpeg'
function UserSummary({user}) {
    const summary = getSummary(JSON.parse(window.localStorage.getItem('reports')));
    return ( 
        <Container className="dashboard-container dashboard-summary">
            <h1 className="fs-5 m-2">Resumo geral de: <span>{user.username}</span></h1>
            <Container>
                <Image width={200} src={placeholder}/>
            </Container>
            <Container>
                <h6>Seu mês de compra favorito de foi {summary[0].label}, com {summary[0].value} itens!</h6>
                <h6>A maior parte das rações que você comprou custam de {summary[1].label}!</h6>
                <h6>Sua marca favorita é a {summary[2].label}!</h6>
                <h6>O preço médio das rações é {summary[3]}!</h6>
                <h6>O melhor custo-benefício veio da marca {summary[4][1]}, com cerca de {summary[4][0]} gramas por centavo!</h6>
            </Container>
        </Container>
     );
}

export default UserSummary;