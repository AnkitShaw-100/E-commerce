import React from 'react';
import { useAuth } from '../../context/auth';

const UserProfile = () => {
  const [auth] = useAuth();
  const user = auth?.user;
  return (
    <div className="card shadow-sm w-100" style={{ maxWidth: '500px', borderRadius: '16px', background: '#fff' }}>
      <div className="card-body">
        <h2 className="mb-4 text-center fw-bold" style={{ color: '#222' }}>User Profile</h2>
        <div className="mb-3 w-100 d-flex align-items-center justify-content-between" style={{ maxWidth: '350px' }}>
          <span className="fw-semibold">Name:</span>
          <span>{user?.name || '-'}</span>
        </div>
        <div className="mb-3 w-100 d-flex align-items-center justify-content-between" style={{ maxWidth: '350px' }}>
          <span className="fw-semibold">Email:</span>
          <span>{user?.email || '-'}</span>
        </div>
        <div className="mb-3 w-100 d-flex align-items-center justify-content-between" style={{ maxWidth: '350px' }}>
          <span className="fw-semibold">Contact:</span>
          <span>{user?.phone || '-'}</span>
        </div>
        <div className="mb-3 w-100 d-flex align-items-center justify-content-between" style={{ maxWidth: '350px' }}>
          <span className="fw-semibold">Address:</span>
          <span>{user?.address || '-'}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
