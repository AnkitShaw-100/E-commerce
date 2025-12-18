import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactTostify.css';


const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            <main style={{ minHeight: '90vh' }}>
                <ToastContainer />
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout
