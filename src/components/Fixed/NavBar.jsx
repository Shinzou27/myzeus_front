import Container from 'react-bootstrap/esm/Container';
import Nav from 'react-bootstrap/Nav';
import logo from '../../assets/logo.png'
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image'
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const user = JSON.parse(window.localStorage.getItem('user'));
    function pseudoMiddleware(e) {
        if (e.target.innerText == 'Sair') {
            e.target.href = '/'
            window.localStorage.removeItem('user');
            window.location.reload();
        }
    }
    return (
        <Navbar fixed='top' bg='dark' expand='lg'>
            <Container>
                <Navbar.Brand href='/'><Image src={logo} height={16}></Image></Navbar.Brand>
                <Nav className='me-auto fs-5'>
                    <Nav.Link href='/' className='text-light'>Início</Nav.Link>
                    {user && <>
                        <Nav.Link href='/overview' className='text-light'>Visão Geral</Nav.Link>
                        <Nav.Link href='/dashboard' className='text-light'>Painel de Controle</Nav.Link>
                    </>
                    }

                </Nav>
                <Nav.Link onClick={pseudoMiddleware} href='/login' className='text-light ms-auto' > {!user ? 'Entrar' : 'Sair'}</Nav.Link>
            </Container>
        </Navbar>
    )
}
export default NavBar;