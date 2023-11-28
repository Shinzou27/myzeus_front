import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/esm/Button'
import { Link } from 'react-router-dom'

function Welcome({ user }) {

    return (
        <div className='w-50 welcome-outer-div'>
            <div className='welcome'>
                {user ?
                    <>
                        <h1>Olá, <span id='highlight'>{user.username}</span>!</h1>
                        <p className='my-5'>Comece a gerenciar seus gastos agora!</p>
                        <div>
                            <Row>
                                <Col>
                                    <Button className='proj-30'><Link style={{ textDecoration: 'none' }} className='text-white' to={'/new'}>Adicionar novo relatório</Link></Button>
                                </Col>
                                <Col>
                                    <Button className='proj-30'><Link style={{ textDecoration: 'none' }} className='text-white' to={'/overview'}>Ver lista de relatórios</Link></Button>
                                </Col>
                            </Row>
                        </div>
                    </> :
                    <>
                        <h1>Bem-vindo!</h1>
                        <p>Entre ou crie sua conta agora mesmo!</p>
                        <Container>
                            <Button className='mx-2 welcome-button' href='/login' variant='success'>Entrar</Button>
                            <Button className='mx-2 welcome-button' href='/register' variant='success'>Criar conta</Button>
                        </Container>
                    </>
                }
            </div>
        </div>
    );
}

export default Welcome;