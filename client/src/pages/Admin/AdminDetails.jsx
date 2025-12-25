import React from 'react';
import { useAuth } from '../../context/auth';

const AdminDetails = () => {
    const [auth] = useAuth();
    return (
        <div className="card shadow-sm w-100" style={{ maxWidth: '500px', borderRadius: '16px', background: '#fff' }}>
            <div className="card-body">
                <h2 className="mb-4 text-center fw-bold" style={{ color: '#222' }}>Admin Details</h2>
                <div className="mb-3 w-100 d-flex align-items-center justify-content-between" style={{ maxWidth: '350px' }}>
                    <span className="fw-semibold">Name:</span>
                    <span>{auth?.user?.name}</span>
                </div>
                <div className="mb-3 w-100 d-flex align-items-center justify-content-between" style={{ maxWidth: '350px' }}>
                    <span className="fw-semibold">Email:</span>
                    <span>{auth?.user?.email}</span>
                </div>
                <div className="mb-3 w-100 d-flex align-items-center justify-content-between" style={{ maxWidth: '350px' }}>
                    <span className="fw-semibold">Contact:</span>
                    <span>{auth?.user?.phone}</span>
                </div>
            </div>
        </div>
    );
};

export default AdminDetails;
