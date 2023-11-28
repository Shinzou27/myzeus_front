import Container from 'react-bootstrap/esm/Container';
import Nav from 'react-bootstrap/Nav';
import logo from '../../assets/logo.png'
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image'
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const user = JSON.parse(window.localStorage.getItem('user'));
    const nav = useNavigate();
    function pseudoMiddleware(e) {
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('reports');
        window.localStorage.removeItem('pets');
        nav('/');
        window.location.reload();
    }
    return (
        <Navbar fixed='top' bg='dark' expand='lg'>
            <Container>
                <Navbar.Brand href='/'><Image src={logo} height={16}></Image></Navbar.Brand>
                <Nav className='me-auto fs-5'>
                    <Nav.Link href='/' className='text-light nav-text'>Início</Nav.Link>
                    {user && <>
                        <Nav.Link href='/overview' className='text-light nav-text'>Visão Geral</Nav.Link>
                        <Nav.Link href='/dashboard' className='text-light nav-text'>Painel de Controle</Nav.Link>
                    </>
                    }

                </Nav>
                <Nav>
                    {user ?
                        <>
                            <Nav.Link href='/profile' className='text-light nav-text ms-auto fw-bold'>{user.username}</Nav.Link>
                            <Nav.Link onClick={pseudoMiddleware} className='text-light nav-text ms-auto' >Sair</Nav.Link>
                        </> :
                        <>
                            <Nav.Link href='/login' className='text-light nav-text ms-auto' >Entrar</Nav.Link>
                            <Nav.Link href='/register' className='text-light nav-text ms-auto'>Criar Conta</Nav.Link>
                        </>}
                </Nav>
            </Container>
        </Navbar>
    )
}
export default NavBar;