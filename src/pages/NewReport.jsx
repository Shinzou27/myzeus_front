import Container from "react-bootstrap/esm/Container";
import ReportForm from "../components/Report/ReportForm";


function NewReport() {
    return (
        <>
            <Container className="my-5">
                <Container>
                    <h1>Adicionar relatório</h1>
                </Container>
                <ReportForm/>
            </Container>
        </>
    );
}

export default NewReport;