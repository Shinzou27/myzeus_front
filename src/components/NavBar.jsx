import Container from 'react-bootstrap/esm/Container';
import Nav from 'react-bootstrap/Nav';
import logo from '../assets/react.svg'
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image'

function NavBar() {
    return (
        <Navbar fixed='top' bg='dark' expand='lg'>
            <Container>
            <Navbar.Brand href='/'><Image src={logo}></Image></Navbar.Brand>
            <Navbar.Text className='text-light fs-5 fw-bold'>MyZeus</Navbar.Text>
            <Nav className='me-auto fs-5'>
                <Nav.Link href='/' className='text-light'>Início</Nav.Link>
                <Nav.Link href='/overview' className='text-light'>Visão Geral</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    )
}
export default NavBar;