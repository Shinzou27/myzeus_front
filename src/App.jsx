import NavBar from './components/Fixed/NavBar'
import Footer from './components/Fixed/Footer'
import { Outlet } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import './styles/Button.css'
import { useState, useEffect } from 'react'

function App() {
  const [extraClass, setExtraClass] = useState(false);
    useEffect(() => {
        if (['/newpet', '/new', '/dashboard', '/profile'].includes(location.pathname)) {
            setExtraClass(true);
        } else {
            setExtraClass(false);
        }
    }, [])
  return (
    <div className='App'>
      <NavBar/>
      <Outlet/>
      <Footer extraClass={extraClass}/>
    </div>
  )
}

export default App
