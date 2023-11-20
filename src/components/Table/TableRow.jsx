import {PencilSquare} from 'react-bootstrap-icons'
import {Trash} from 'react-bootstrap-icons'

function TableRow({report, handleModal, setModalType}) {
    function parseDate(date) {
        const toFormat = new Date(date);
        let day;
        let month;
        toFormat.getUTCDate() < 10 ? day = "0" + toFormat.getUTCDate() : day = toFormat.getUTCDate();
        (toFormat.getUTCMonth() + 1) < 10 ? month = "0" + (toFormat.getUTCMonth() + 1) : month = (toFormat.getUTCMonth() + 1);
        return day + "/" + month + "/" + toFormat.getFullYear();
    }

    function showModal(e) {
        setModalType(e.target.id);
        setTimeout(() => {
            handleModal(report, e.target.id);
        }, 100)
    }
    return ( 
        <>
        <tr>
            <td id='date-column' className='col-6'onClick={showModal}>{parseDate(report.date)}</td>
            <td id='cost-column' className='col-5'onClick={showModal}>{`R$${report.cost}`}</td>
            <td className='col-1'><PencilSquare id='edit' onClick={showModal} className='mx-1 c-pointer'/><Trash id='delete' onClick={showModal} className='mx-1 c-pointer'/></td>
        </tr>
        </>
     );
}

export default TableRow;