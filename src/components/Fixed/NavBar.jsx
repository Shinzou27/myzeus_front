import Container from 'react-bootstrap/esm/Container';
import Nav from 'react-bootstrap/Nav';
import logo from '../../assets/logo.png'
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image'

function NavBar() {
    return (
        <Navbar fixed='top' bg='dark' expand='lg'>
            <Container>
                <Navbar.Brand href='/'><Image src={logo} height={16}></Image></Navbar.Brand>
                <Nav className='me-auto fs-5'>
                    <Nav.Link href='/' className='text-light'>Início</Nav.Link>
                    <Nav.Link href='/overview' className='text-light'>Visão Geral</Nav.Link>
                </Nav>
                <Nav.Link href='/login' className='text-light ms-auto' > Entrar</Nav.Link>
            </Container>
        </Navbar>
    )
}
export default NavBar;