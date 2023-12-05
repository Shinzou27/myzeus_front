import { Container } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/esm/Button'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'

function Welcome() {
    const auth = useAuth();
    return (
        <div className='w-50 welcome-outer-div'>
            <div className='welcome'>
                {auth.loggedUser.username ?
                    <>
                        <h1>Olá, <span id='highlight'>{auth.loggedUser.username}</span>!</h1>
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
                            <Button className='proj-30 mx-2'><Link style={{ textDecoration: 'none' }} className='text-white' to={'/login'}>Entrar</Link></Button>
                            <Button className='proj-30 mx-2'><Link style={{ textDecoration: 'none' }} className='text-white' to={'/register'}>Criar conta</Link></Button>
                        </Container>
                    </>
                }
            </div>
        </div>
    );
}

export default Welcome;