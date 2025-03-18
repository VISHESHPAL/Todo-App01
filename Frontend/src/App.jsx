import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import NotFound from './components/NotFound'
import {Toaster} from 'react-hot-toast'

function App () {
   const token = localStorage.getItem("jwt")
  return (
    <div>
      
      <Routes>
        <Route path='/'element={ token ? <Home/> : <Navigate to={"/login"} />}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App
