import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { FaSignOutAlt, FaHome, FaUsers, FaFutbol, FaClipboard } from 'react-icons/fa';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FaFutbol /> Match Lineup Tool
        </h1>

        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 hover:bg-blue-700 px-3 py-2 rounded">
            <FaHome /> Dashboard
          </button>
          <button onClick={() => navigate('/teams')} className="flex items-center gap-2 hover:bg-blue-700 px-3 py-2 rounded">
            <FaUsers /> Teams
          </button>
          <button onClick={() => navigate('/players')} className="flex items-center gap-2 hover:bg-blue-700 px-3 py-2 rounded">
            <FaUsers /> Players
          </button>
          <button onClick={() => navigate('/matches')} className="flex items-center gap-2 hover:bg-blue-700 px-3 py-2 rounded">
            <FaClipboard /> Matches
          </button>

          <div className="border-l border-blue-400 pl-6">
            <div className="text-sm">{user?.name}</div>
            <button onClick={handleLogout} className="flex items-center gap-2 hover:bg-blue-700 px-3 py-2 rounded mt-1">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
