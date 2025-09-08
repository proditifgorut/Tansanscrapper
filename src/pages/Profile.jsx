import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, CreditCard, Bell, Shield, Key } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

import ProfileTab from '../components/profile/ProfileTab';
import SubscriptionTab from '../components/profile/SubscriptionTab';
import NotificationsTab from '../components/profile/NotificationsTab';
import SecurityTab from '../components/profile/SecurityTab';
import ApiKeysTab from '../components/profile/ApiKeysTab';

const Profile = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [location.search]);

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User, component: <ProfileTab /> },
    { id: 'subscription', label: 'Langganan', icon: CreditCard, component: <SubscriptionTab /> },
    { id: 'notifications', label: 'Notifikasi', icon: Bell, component: <NotificationsTab /> },
    { id: 'security', label: 'Keamanan', icon: Shield, component: <SecurityTab /> },
    { id: 'api', label: 'API Keys', icon: Key, component: <ApiKeysTab /> },
  ];

  const renderContent = () => {
    const activeComponent = tabs.find(tab => tab.id === activeTab)?.component;
    return activeComponent || null;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-3xl font-bold">{user.name.charAt(0).toUpperCase()}</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center sm:text-left">{user.name}</h1>
            <p className="text-gray-600 dark:text-gray-400 text-center sm:text-left">{user.email}</p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-1 sm:space-x-4 px-2 sm:px-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`relative flex items-center space-x-2 py-4 px-1 sm:px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${activeTab === tab.id ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white'}`}>
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Profile;
