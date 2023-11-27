import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Overview from './pages/Overview.jsx'
import Dashboard from './pages/Dashboard.jsx'
import NewReport from './pages/NewReport.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Profile from './pages/Profile.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Routes>
        <Route element={<App/>}>
          <Route path='/' element={<Home/>} />
          <Route path='/new' element={<NewReport/>} />
          <Route path='/overview' element={<Overview/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
)
