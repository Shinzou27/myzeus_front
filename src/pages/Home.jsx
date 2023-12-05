import Container from 'react-bootstrap/esm/Container'
import Welcome from '../components/Home/Welcome'
import Feedback from '../components/Home/Feedback'
import Background from '../components/Fixed/Background'
import '../styles/Home.css'

function Home() {
  document.title = 'Meu Zeus | Início';
  return (
    <Container>
      <Background color={'1'}/>
      <div className='full-screen'>
        <Welcome />
      </div>
      <div className='full-screen'>
        <Feedback />
      </div>
    </Container>
  )
}

export default Home