import { useState } from 'react'
import './App.css'
import AddUserForm from './components/AddUserForm'
import UserList from './components/UserList'
import {Routes, Route, Link, useNavigate} from 'react-router-dom'
import Login from './components/Login'

function App() {
    const navigate = useNavigate()

  

  return (
    <>
     <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/users" element={<UserList />} />
      <Route path="/add-user" element={<AddUserForm    />} />
      <Route path="/" element={<div className='title'><h1> Witamy w programie zarządzającym więźniami </h1>
      <button onClick={()=>{navigate("users")}} type="submit">Login</button>
      </div>} />
     </Routes>
     
     
    </>
  )
}

export default App
