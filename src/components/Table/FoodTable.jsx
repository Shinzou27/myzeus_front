import { v4 as uuidv4 } from 'uuid'
import Table from 'react-bootstrap/esm/Table';
import TableHead from './TableHead';
import TableRow from './TableRow';
import Container from 'react-bootstrap/esm/Container';
import '../../styles/Table.css';

function FoodTable({ data, handleModal, sorter, setSorter, displayOnly }) {
    return (
        <Container>
            <Table bordered striped hover className='m-auto w-75'>
                <TableHead sorter={sorter} setSorter={setSorter} displayOnly={displayOnly} />
                <tbody>
                    {data.map((item) =>
                    (<TableRow key={uuidv4()}
                        report={item}
                        handleModal={handleModal} displayOnly={displayOnly} />)
                    )}
                </tbody>
            </Table>
        </Container>
    );
}

export default FoodTable;