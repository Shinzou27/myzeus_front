import { Container, Image } from "react-bootstrap";
import { getSummary } from "./analytics";
import placeholder from '../../assets/placeholder.jpeg'
import { useAuth } from "../../context/useAuth";
function UserSummary({user}) {
    const {reports} = useAuth();
    const summary = getSummary(reports);
    return ( 
        <Container className="dashboard-container dashboard-summary">
            <h1 className="fs-5 m-2">Resumo geral de: <span>{user.username}</span></h1>
            <Container>
                <Image width={200} src={placeholder}/>
            </Container>
            <Container>
                <h6>Seu mês de compra mais movimentado de foi <span>{summary[0].label}</span>, com {summary[0].value} itens!</h6>
                <h6>A maior parte das rações que você comprou custam de <span>{summary[1].label}</span>!</h6>
                <h6>Sua marca favorita é a <span>{summary[2].label}</span>!</h6>
                <h6>O preço médio das rações é <span>{summary[3]}</span>!</h6>
                <h6>O melhor custo-benefício veio da marca <span>{summary[4][1]}</span>, com cerca de {summary[4][0]} gramas por centavo!</h6>
            </Container>
        </Container>
     );
}

export default UserSummary;