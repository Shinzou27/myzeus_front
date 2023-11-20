import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Overview from './pages/Overview.jsx'
import NewReport from './pages/NewReport.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Routes>
        <Route element={<App/>}>
          <Route path='/' element={<Home/>} />
          <Route path='/new' element={<NewReport/>} />
          <Route path='/overview' element={<Overview/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
)
