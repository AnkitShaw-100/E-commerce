import React from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';

import { useAuth } from '../../context/auth';
import { Outlet } from 'react-router-dom';


const AdminDashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout title={"Admin Dashboard - Ecommerce App"}>
            <div className="container-fluid py-4 px-2 admin-dashboard-bg" style={{ overflowX: 'hidden', minHeight: '90vh' }}>
                <div className="row g-4" style={{ overflowX: 'hidden' }}>
                    <div className="col-md-3 d-flex flex-column align-items-center pt-3">
                        <h2
                            className="mb-4 text-center fw-bold"
                            style={{ color: '#222', letterSpacing: '1px', fontSize: '2rem', textShadow: '0 2px 8px rgba(34,34,34,0.08)', cursor: 'pointer' }}
                            onClick={() => window.location.href = '/dashboard/admin'}
                        >
                            Admin Dashboard
                        </h2>
                        <div className="w-100 d-flex flex-column align-items-center">
                            <AdminMenu />
                        </div>
                    </div>
                    <div className="col-md-9 d-flex flex-column align-items-stretch justify-content-start pt-3">
                        <div className="flex-grow-1 d-flex flex-column align-items-center w-100 h-100" style={{ minHeight: '80vh', maxWidth: '100%' }}>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
