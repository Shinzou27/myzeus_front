import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/esm/Button'
import { Link } from 'react-router-dom'

function Welcome({ user }) {

    return (
        <Container className='w-50'>
            <Container className='mb-3 mt-5 pt-5'>
                {user ? <>
                    <h1>Olá, <span id='highlight'>{user.username}</span>!</h1>
                    <p className='my-5'>Comece a gerenciar seus gastos agora!</p>
                </> : <>
                    <h1>Bem-vindo!</h1>
                    <p>Entre ou crie sua conta agora mesmo!</p>
                </>}
            </Container>
            {user && <Container>
                <Row>
                    <Col>
                        <Button variant='success'><Link style={{ textDecoration: 'none' }} className='text-white' to={'/new'}>Adicionar novo relatório</Link></Button>
                    </Col>
                    <Col>
                        <Button variant='success'><Link style={{ textDecoration: 'none' }} className='text-white' to={'/overview'}>Ver lista de relatórios</Link></Button>
                    </Col>
                </Row>
            </Container>}
        </Container>
    );
}

export default Welcome;