function TableHead({sorter, setSorter}) {
    function sendSort(type) {
        if (sorter.includes('_asc')) {
            setSorter(`${type}_desc`);
        } else {
            setSorter(`${type}_asc`);
        }
    }
    return ( 
        <>
        <thead>
            <tr>
                <th onClick={() => sendSort('date')}>Dia</th>
                <th onClick={() => sendSort('pet')}>Pet</th>
                <th onClick={() => sendSort('cost')}>Custo</th>
                <th onClick={() => sendSort('brand')}>Marca</th>
                <th onClick={() => sendSort('amount')}>Quantidade</th>
                <th></th>
            </tr>
        </thead>
        </>
     );
}

export default TableHead;