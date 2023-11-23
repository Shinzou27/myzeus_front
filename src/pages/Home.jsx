import Container from 'react-bootstrap/esm/Container'
import Welcome from '../components/Home/Welcome'
import Feedback from '../components/Home/Feedback'
import Background from '../components/Fixed/Background'

function Home() {
  const user = JSON.parse(window.localStorage.getItem('user'));
  return (
    <Container>
      <Container className='full-screen'>
        <Welcome user={user} />
      </Container>
      <Container className='full-screen'>
        <Feedback />
      </Container>
      <Background color={'1'}/>
    </Container>
  )
}

export default Home