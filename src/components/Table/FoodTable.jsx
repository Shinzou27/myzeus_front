import { v4 as uuidv4 } from 'uuid'
import Table from 'react-bootstrap/esm/Table';
import TableHead from './TableHead';
import TableRow from './TableRow';
import Container from 'react-bootstrap/esm/Container';

function FoodTable({data}) {
    return (
        <Container>
            <Table bordered striped hover className='m-auto w-75'>
                <TableHead />
                <tbody>
                    {data.map((item) => 
                        (<TableRow key={uuidv4()} date={item.date} cost={item.cost} />)
                    )}
                </tbody>
            </Table>
        </Container>
    );
}

export default FoodTable;