import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from "../src/components/Navbar.jsx"
import Home from "../src/components/Home.jsx"
import Login from './components/authPages/Login.jsx'
import SignUp from './components/authPages/Signup.jsx'
import AboutUs from './components/AboutUs.jsx'
import ContactUs from './components/ContactUs.jsx'
import UserCart from './components/userCart.jsx'
import ShopPage from './components/ShopPage.jsx'

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/cart" element={<UserCart />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
