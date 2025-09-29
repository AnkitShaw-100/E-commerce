import React, { useState } from 'react'
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiSave, FiX } from 'react-icons/fi'

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Ankit Shaw',
    email: 'ankitshaw@example.com',
    phone: '+91 98765 43210',
    address: 'Kolkata, West Bengal, India',
    bio: 'Welcome to my profile! I love shopping for quality products and discovering new brands.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80'
  })

  const [editForm, setEditForm] = useState(profile)

  const handleEdit = () => {
    setIsEditing(true)
    setEditForm(profile)
  }

  const handleSave = () => {
    setProfile(editForm)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditForm(profile)
    setIsEditing(false)
  }

  const handleChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 sm:pt-20 md:pt-24 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 sm:px-8 py-8 sm:py-12">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <button className="absolute bottom-0 right-0 bg-white text-emerald-600 p-2 rounded-full shadow-lg hover:shadow-xl transition-all">
                  <FiUser size={16} />
                </button>
              </div>

              {/* Basic Info */}
              <div className="text-center sm:text-left text-white">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">{profile.name}</h2>
                <p className="text-emerald-100 mb-1">{profile.email}</p>
                <p className="text-emerald-100">{profile.phone}</p>
              </div>

              {/* Edit Button */}
              <div className="sm:ml-auto">
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="bg-white text-emerald-600 px-4 py-2 rounded-lg font-semibold hover:bg-emerald-50 transition-all flex items-center gap-2"
                  >
                    <FiEdit2 size={16} />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="bg-white text-emerald-600 px-4 py-2 rounded-lg font-semibold hover:bg-emerald-50 transition-all flex items-center gap-2"
                    >
                      <FiSave size={16} />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-800 transition-all flex items-center gap-2"
                    >
                      <FiX size={16} />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Personal Information
                </h3>

                {/* Name Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <FiUser size={16} />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{profile.name}</div>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <FiMail size={16} />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{profile.email}</div>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Contact Information
                </h3>

                {/* Phone Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <FiPhone size={16} />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{profile.phone}</div>
                  )}
                </div>

                {/* Address Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <FiMapPin size={16} />
                    Address
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{profile.address}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="mt-8 space-y-2">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                About Me
              </h3>
              {isEditing ? (
                <textarea
                  value={editForm.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{profile.bio}</div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Actions */}
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
