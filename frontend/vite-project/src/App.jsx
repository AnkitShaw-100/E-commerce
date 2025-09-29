import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from "../src/components/Navbar.jsx"
import Footer from "../src/components/Footer.jsx"
import Home from "./components/Pages/Home.jsx"
import Login from './components/authPages/Login.jsx'
import SignUp from './components/authPages/Signup.jsx'
import AboutUs from './components/Pages/AboutUs.jsx'
import ContactUs from './components/Pages/ContactUs.jsx'
import UserCart from './components/Pages/userCart.jsx'
import ShopPage from './components/Pages/ShopPage.jsx'
import MyProfile from './components/Pages/MyProfile.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

const AppContent = () => {
  const location = useLocation();
  const hideNavbarAndFooter = location.pathname === '/signup';

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbarAndFooter && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/cart" element={<UserCart />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<MyProfile />} />
        </Routes>
      </main>
      {!hideNavbarAndFooter && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  )
}

export default App
