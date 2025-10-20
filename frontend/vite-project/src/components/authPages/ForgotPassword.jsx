import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../../services/apiServices';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1=request,2=verify,3=reset
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const requestOtp = async () => {
    if (!email) return setMsg({ type: 'error', text: 'Please enter your email' });
    setLoading(true);
    setMsg(null);
    try {
      await userAPI.requestOtp(email);
      setMsg({ type: 'success', text: 'OTP sent to your email' });
      setStep(2);
    } catch (err) {
      setMsg({ type: 'error', text: err?.message || 'Failed to send OTP' });
    } finally {
      setLoading(false);
    }
  };

  const verify = async () => {
    if (!email || !otp) return setMsg({ type: 'error', text: 'Provide email and OTP' });
    setLoading(true);
    setMsg(null);
    try {
      const res = await userAPI.verifyOtp(email, otp);
      setToken(res.token);
      setMsg({ type: 'success', text: 'OTP verified — you can reset your password now' });
      setStep(3);
    } catch (err) {
      setMsg({ type: 'error', text: err?.message || 'OTP verification failed' });
    } finally {
      setLoading(false);
    }
  };

  const reset = async () => {
    if (!token || !newPassword) return setMsg({ type: 'error', text: 'Enter a new password' });
    setLoading(true);
    setMsg(null);
    try {
      await userAPI.resetPassword(token, newPassword);
      setMsg({ type: 'success', text: 'Password reset successfully. Redirecting to login...' });
      // short delay to show success then redirect
      setTimeout(() => {
        navigate('/login');
      }, 1200);
    } catch (err) {
      setMsg({ type: 'error', text: err?.message || 'Reset failed' });
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
        {msg && (
          <div className={`mb-3 p-3 rounded ${msg.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'}`}>
            {msg.text}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-3">
            <label className="block text-sm font-medium">Enter your account email</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"><FaEnvelope /></span>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@domain.com" className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-100 border border-slate-300 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 hover:bg-slate-50" />
            </div>
            <button onClick={requestOtp} disabled={loading} className={`w-full py-4 px-6 ${loading ? 'disabled:from-slate-400 disabled:to-slate-500 bg-gradient-to-r from-emerald-400 to-emerald-500 cursor-not-allowed' : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800'} text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:transform-none disabled:hover:shadow-lg`}>{loading ? 'Sending...' : 'Send OTP'}</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <label className="block text-sm font-medium">Enter the OTP sent to your email</label>
            <input value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full pl-4 pr-4 py-3 rounded-xl bg-slate-100 border border-slate-300 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all duration-300" placeholder="123456" />
            <div className="flex gap-2">
              <button onClick={verify} disabled={loading} className={`flex-1 py-4 px-6 ${loading ? 'disabled:from-slate-400 disabled:to-slate-500 bg-gradient-to-r from-emerald-400 to-emerald-500 cursor-not-allowed' : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800'} text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:transform-none disabled:hover:shadow-lg`}>{loading ? 'Verifying...' : 'Verify OTP'}</button>
              <button onClick={() => setStep(1)} className="py-2 px-4 bg-gray-100 rounded-xl">Back</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <label className="block text-sm font-medium">New password</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"><FaLock /></span>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-100 border border-slate-300 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 hover:bg-slate-50" />
            </div>
            <div className="flex gap-2">
              <button onClick={reset} disabled={loading} className={`flex-1 py-4 px-6 ${loading ? 'disabled:from-slate-400 disabled:to-slate-500 bg-gradient-to-r from-emerald-400 to-emerald-500 cursor-not-allowed' : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800'} text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:transform-none disabled:hover:shadow-lg`}>{loading ? 'Resetting...' : 'Reset Password'}</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ForgotPassword;
