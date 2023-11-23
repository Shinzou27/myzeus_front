import NavBar from './components/Fixed/NavBar'
import Footer from './components/Fixed/Footer'
import { Outlet } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  return (
    <div className='App'>
      <NavBar/>
      <Outlet/>
      
    </div>
  )
}

export default App
