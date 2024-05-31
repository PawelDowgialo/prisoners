import { useState } from 'react'
import './App.css'
import AddUserForm from './components/AddUserForm'
import UserList from './components/UserList'
import {Routes, Route, Link, useNavigate} from 'react-router-dom'

function App() {
    const navigate = useNavigate()

  

  return (
    <>
    <h3>M E R N - menadżer więzienia</h3>
    <nav>
      <ul>
        <li>
          <Link to="/users"> Show Users List </Link>
        </li>
        <li>
          <button onClick={()=>navigate("/add-user")}> You can add a new user </button>
        </li>
      </ul>
    </nav>
     
     <Routes>
      <Route path="/users" element={<UserList />} />
      <Route path="/add-user" element={<AddUserForm    />} />
      <Route path="/" element={<div><h1> Welcome to Prison Manager </h1></div>} />
     </Routes>
     
     
    </>
  )
}

export default App
