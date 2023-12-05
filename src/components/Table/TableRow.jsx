import { PencilSquare } from 'react-bootstrap-icons'
import { Trash } from 'react-bootstrap-icons'
import { useAuth } from '../../context/useAuth';

function TableRow({ report, handleModal, displayOnly }) {
    const {pets} = useAuth();
    function parseDate(date) {
        const toFormat = new Date(date);
        let day;
        let month;
        toFormat.getUTCDate() < 10 ? day = "0" + toFormat.getUTCDate() : day = toFormat.getUTCDate();
        (toFormat.getUTCMonth() + 1) < 10 ? month = "0" + (toFormat.getUTCMonth() + 1) : month = (toFormat.getUTCMonth() + 1);
        return day + "/" + month + "/" + toFormat.getFullYear();
    }

    function showModal(type) {
        if(displayOnly) {
            return;
        }
        handleModal(report, type);
    }
    return (
        <>
            <tr>
                <td id='date-column' className='col-3' onClick={() => showModal('date')}>{parseDate(report.date)}</td>
                {!displayOnly && <td id='pet-column' className='col-2' onClick={() => showModal('pet')}>{pets.filter((pet) => pet.id == report.petId)[0].name}</td>}
                <td id='cost-column' className='col-2' onClick={() => showModal('cost')}>{`R$${report.cost}`}</td>
                <td id='brand-column' className='col-2' onClick={() => showModal('brand')}>{report.brand}</td>
                <td id='amount-column' className='col-2' onClick={() => showModal('amount')}>{report.amount}</td>
                {!displayOnly && <td className='col-1'><PencilSquare id='edit' onClick={() => showModal('edit')} className='mx-1 c-pointer' /><Trash id='delete' onClick={() => showModal('delete')} className='mx-1 c-pointer' /></td>}
            </tr>
        </>
    );
}

export default TableRow;