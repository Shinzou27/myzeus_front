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
import { UserContextProvider } from './context/UserContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path='/' element={<AuthWrapper><Home /></AuthWrapper>} />
          <Route path='/new' element={<NewReport />} />
          <Route path='/overview' element={<Overview />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/newpet' element={<NewPet />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </UserContextProvider>
)
