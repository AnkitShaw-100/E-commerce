import React, { useState, useEffect } from 'react'
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiSave, FiX } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import { orderAPI } from '../../services/apiServices'

// small notice
const Notice = ({ type = 'info', children }) => (
  <div
    className={`rounded-md px-4 py-2 text-sm font-medium ${type === 'error' ? 'bg-red-100 text-red-800' : 'bg-emerald-50 text-emerald-800'
      }`}
  >
    {children}
  </div>
)

const MyProfile = () => {
  const { user, login } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  const [profile, setProfile] = useState({
    name: 'Anonymous',
    email: '',
    phone: '',
    address: ''
  })

  const [editForm, setEditForm] = useState(profile)
  const [notice, setNotice] = useState(null)
  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(false)

  useEffect(() => {
    // seeding profile from auth context/localStorage
    if (user) {
      setProfile((p) => ({ ...p, name: user.name || p.name, email: user.email || p.email }))
      setEditForm((f) => ({ ...f, name: user.name || f.name, email: user.email || f.email }))
    }

    // fetch user's orders
    const fetchOrders = async () => {
      if (!user) return
      setOrdersLoading(true)
      try {
        const data = await orderAPI.getUserOrders()
        setOrders(data || [])
      } catch (err) {
        console.error('Failed to fetch orders', err)
      } finally {
        setOrdersLoading(false)
      }
    }

    fetchOrders()
  }, [user])

  const handleEdit = () => {
    setIsEditing(true)
    setEditForm(profile)
  }

  const handleCancel = () => {
    setEditForm(profile)
    setIsEditing(false)
  }

  const handleChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    if (!editForm.name || !editForm.email) {
      setNotice({ type: 'error', text: 'Name and email are required' })
      setTimeout(() => setNotice(null), 3000)
      return
    }

    setProfile(editForm)
    setIsEditing(false)

    // persist locally and update auth context so app reflects new name/email
    const updatedUser = { ...(user || {}), name: editForm.name, email: editForm.email }
    try {
      localStorage.setItem('user', JSON.stringify(updatedUser))
      login(updatedUser, localStorage.getItem('token'))
      setNotice({ type: 'success', text: 'Profile updated' })
    } catch (err) {
      console.error('Failed to persist user', err)
      setNotice({ type: 'error', text: 'Failed to save profile locally' })
    }
    setTimeout(() => setNotice(null), 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 sm:pt-20 md:pt-24 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {notice && (
          <div className="mb-4">
            <Notice type={notice.type}>{notice.text}</Notice>
          </div>
        )}

        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_8px_28px_rgba(16,24,40,0.08)] border border-gray-100 overflow-hidden">
          <div className="relative">
            <div className="absolute -top-3 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-t-xl" />
          </div>
          <div className="px-6 sm:px-8 py-6 sm:py-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{profile.name || user?.name || 'User'}</h2>
                <p className="text-sm text-gray-500">{profile.email || user?.email}</p>
              </div>

              <div>
                {!isEditing ? (
                  <button onClick={handleEdit} className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-4 py-2 rounded-md font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition">
                    <FiEdit2 size={16} /> Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={handleSave} className="inline-flex items-center gap-2 bg-emerald-700 text-white px-4 py-2 rounded-md font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition">
                      <FiSave size={16} /> Save
                    </button>
                    <button onClick={handleCancel} className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-50">
                      <FiX size={16} /> Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">Full Name</h3>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                ) : (
                  <div className="px-4 py-2 bg-gray-50 rounded-md text-gray-900">{profile.name}</div>
                )}
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Email</h3>
                {isEditing ? (
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                ) : (
                  <div className="px-4 py-2 bg-gray-50 rounded-md text-gray-900">{profile.email}</div>
                )}
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Phone</h3>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                ) : (
                  <div className="px-4 py-2 bg-gray-50 rounded-md text-gray-900">{profile.phone || 'Not provided'}</div>
                )}
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Address</h3>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                ) : (
                  <div className="px-4 py-2 bg-gray-50 rounded-md text-gray-900">{profile.address || 'Not provided'}</div>
                )}
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Your Orders</h4>
                {ordersLoading ? (
                  <div className="text-sm text-gray-500">Loading orders...</div>
                ) : orders.length === 0 ? (
                  <div className="text-sm text-gray-500">You have no orders yet.</div>
                ) : (
                  <div className="space-y-3">
                    {orders.map((o) => (
                      <div key={o._id} className="bg-white border border-gray-100 rounded-md p-3 shadow-sm flex items-center justify-between hover:shadow-md transform hover:-translate-y-1 transition">
                        <div className="min-w-0 pr-4">
                          <div className="text-sm font-semibold text-gray-800 truncate">Order <span className="font-mono text-xs text-gray-500">#{String(o._id).slice(0,8)}</span></div>
                          <div className="text-xs text-gray-500">{new Date(o.createdAt).toLocaleString()}</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-gray-700">{o.orderItems?.length || 0} items</div>
                          <div className="text-sm font-semibold text-gray-900">₹{o.totalPrice}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Need help? <a href="/contact" className="text-emerald-600 hover:text-emerald-700 font-medium">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
