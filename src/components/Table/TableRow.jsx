function TableRow({date, cost}) {
    function parseDate(date) {
        const toFormat = new Date(date);
        let day;
        let month;
        toFormat.getUTCDate() < 10 ? day = "0" + toFormat.getUTCDate() : day = toFormat.getUTCDate();
        toFormat.getMonth() + 1 < 10 ? month = "0" + toFormat.getMonth() + 1 : month = toFormat.getMonth() + 1;
        return day + "/" + month + "/" + toFormat.getFullYear();
    }
    return ( 
        <>
        <tr>
            <td>{parseDate(date)}</td>
            <td>{cost}</td>
        </tr>
        </>
     );
}

export default TableRow;