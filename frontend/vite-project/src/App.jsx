import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from "../src/components/Navbar.jsx"
import Home from "../src/components/Home.jsx"
import Login from './components/authPages/Login.jsx'
import SignUp from './components/authPages/Signup.jsx'

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/shop" element={<div>Shop Page Coming Soon</div>} />
          <Route path="/about" element={<div>About Page Coming Soon</div>} />
          <Route path="/contact" element={<div>Contact Page Coming Soon</div>} />
          <Route path="/cart" element={<div>Cart Page Coming Soon</div>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
