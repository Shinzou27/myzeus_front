import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Overview from './pages/Overview.jsx'
import Dashboard from './pages/Dashboard.jsx'
import NewReport from './pages/NewReport.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Profile from './pages/Profile.jsx'
import NewPet from './pages/NewPet.jsx'
import AuthWrapper from './context/AuthWrapper.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path='/' element={<Home />} />
          <Route path='/new' element={<AuthWrapper><NewReport /></AuthWrapper>} />
          <Route path='/overview' element={<AuthWrapper><Overview /></AuthWrapper>} />
          <Route path='/dashboard' element={<AuthWrapper><Dashboard /></AuthWrapper>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<AuthWrapper><Register /></AuthWrapper>} />
          <Route path='/profile' element={<AuthWrapper><Profile /></AuthWrapper>} />
          <Route path='/newpet' element={<AuthWrapper><NewPet /></AuthWrapper>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthContextProvider>
)
