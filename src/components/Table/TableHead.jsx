import arrow from '../../assets/caret-down-fill.svg';
import { useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';

function TableHead({ sorter, setSorter, displayOnly }) {
    function sendSort(e, type) {
        if (sorter.includes(`${type}_asc`)) {
            setSorter(`${type}_desc`);
            e.target.className = 'ms-auto table-arrow-desc';
        } else {
            setSorter(`${type}_asc`);
            e.target.className = 'ms-auto table-arrow';
        }
    }
    useEffect(() => {

    }, [sorter]);
    return (
        <>
            {displayOnly ?
                <>
                    <thead>
                        <tr>
                            <th>
                                <Row>
                                    <Col>Dia</Col>
                                </Row>
                            </th>
                            <th >
                                <Row>
                                    <Col>Custo</Col>
                                </Row>
                            </th>
                            <th >
                                <Row>
                                    <Col>Marca</Col>
                                </Row>
                            </th>
                            <th >
                                <Row>
                                    <Col>Quantidade</Col>
                                </Row>
                            </th>
                        </tr>
                    </thead>
                </>
                :
                <>
                    <thead>
                        <tr>
                            <th>
                                <Row>
                                    <Col md={2}></Col>
                                    <Col md={8}>Dia</Col>
                                    <Col md={2}>
                                        <Image onClick={(e) => sendSort(e, 'date')} className='ms-auto table-arrow' width={16} src={arrow} />
                                    </Col>
                                </Row>
                            </th>
                            <th >
                                <Row>
                                    <Col md={3}></Col>
                                    <Col md={6}>Pet</Col>
                                    <Col md={3}>
                                        <Image onClick={(e) => sendSort(e, 'pet')} className='ms-auto table-arrow' width={16} src={arrow} />
                                    </Col>
                                </Row>
                            </th>
                            <th >
                                <Row>
                                    <Col md={3}></Col>
                                    <Col md={6}>Custo</Col>
                                    <Col md={3}>
                                        <Image onClick={(e) => sendSort(e, 'cost')} className='ms-auto table-arrow' width={16} src={arrow} />
                                    </Col>
                                </Row>
                            </th>
                            <th >
                                <Row>
                                    <Col md={3}></Col>
                                    <Col md={6}>Marca</Col>
                                    <Col md={3}>
                                        <Image onClick={(e) => sendSort(e, 'brand')} className='ms-auto table-arrow' width={16} src={arrow} />
                                    </Col>
                                </Row>
                            </th>
                            <th >
                                <Row>

                                    <Col md={9}>Quantidade</Col>
                                    <Col md={3}>
                                        <Image onClick={(e) => sendSort(e, 'amount')} className='ms-auto table-arrow' width={16} src={arrow} />
                                    </Col>
                                </Row>
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                </>
            }
        </>
    );
}

export default TableHead;