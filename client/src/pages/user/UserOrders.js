import React from 'react';

const UserOrders = () => {
  return (
    <div className="card shadow-sm w-100" style={{ maxWidth: '700px', borderRadius: '16px', background: '#fff' }}>
      <div className="card-body">
        <h2 className="mb-4 text-center fw-bold" style={{ color: '#222' }}>My Orders</h2>
        <div className="text-center text-muted">No orders found.</div>
      </div>
    </div>
  );
};

export default UserOrders;
