import React, { useState } from 'react';
import { Bell, ChevronDown, LogOut, Menu, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Header = ({ onMenuClick, pageTitle }) => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const quotaPercentage = (user.quotaUsed / user.quotaLimit) * 100;

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={onMenuClick} className="md:hidden p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">{pageTitle}</h1>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Quota Display */}
          <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Kuota:</span>
            <div className="flex items-center space-x-1">
              <span className="font-medium text-gray-800 dark:text-gray-200">{user.quotaUsed.toLocaleString()}</span>
              <span>/</span>
              <span>{user.quotaLimit.toLocaleString()}</span>
            </div>
            <div className="w-16 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${
                  quotaPercentage > 80 ? 'bg-red-500' : quotaPercentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(quotaPercentage, 100)}%` }}
              />
            </div>
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{user.plan}</div>
              </div>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showUserMenu && (
              <div 
                onMouseLeave={() => setShowUserMenu(false)}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                <div className="py-1">
                  <Link to="/app/profile" className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <User className="w-4 h-4 mr-2" />
                    Profil
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Keluar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
