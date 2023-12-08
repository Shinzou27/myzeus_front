import Container from 'react-bootstrap/esm/Container'
import Welcome from '../components/Home/Welcome'
import Feedback from '../components/Home/Feedback'
import Background from '../components/Fixed/Background'
import '../styles/Home.css'

function Home() {
  document.title = 'Meu Zeus | Início';
  return (
    <Container>
      <Background type={'1'}/>
      <Container className='full-screen'>
        <Welcome />
      </Container>
      <Container className='full-screen'>
        <Feedback />
      </Container>
    </Container>
  )
}

export default Home