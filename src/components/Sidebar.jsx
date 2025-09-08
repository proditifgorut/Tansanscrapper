import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Plus, 
  History, 
  User, 
  Zap,
  Target,
  X,
  Megaphone,
  Rocket
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navItems = [
    { path: '/app/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/app/scrape', icon: Plus, label: 'Scrape Baru' },
    { path: '/app/history', icon: History, label: 'Riwayat Scraping' },
    { path: '/app/ads/create', icon: Rocket, label: 'Buat Kampanye' },
    { path: '/app/social-media-ads', icon: Megaphone, label: 'Info Iklan' }, 
    { path: '/app/profile', icon: User, label: 'Profil' },
  ];

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' },
  };

  const renderNavLinks = (isMobile = false) => (
    navItems.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        onClick={isMobile ? () => setIsOpen(false) : undefined}
        className={({ isActive }) =>
          `group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
            isActive
              ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
              : 'text-gray-700 hover:bg-gray-50 hover:text-blue-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-300'
          }`
        }
      >
        <item.icon className="mr-3 w-5 h-5" />
        {item.label}
      </NavLink>
    ))
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <motion.div
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-40 md:hidden"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 pt-5 pb-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">TansanScraper</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 text-gray-500 dark:text-gray-400">
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex-1 px-3 space-y-1">
            {renderNavLinks(true)}
          </nav>
        </div>
      </motion.div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="flex items-center flex-shrink-0 px-6 pb-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">TansanScraper</span>
            </div>
          </div>

          <div className="flex-grow flex flex-col">
            <nav className="flex-1 px-3 space-y-1">
              {renderNavLinks()}
            </nav>

            <div className="px-3 py-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-4 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-5 h-5" />
                  <span className="font-medium">Upgrade ke Premium</span>
                </div>
                <p className="text-sm text-blue-100 mb-3">
                  Dapatkan scraping unlimited dan fitur advanced lainnya.
                </p>
                <Link to="/app/profile?tab=subscription" className="w-full block text-center bg-white text-blue-600 text-sm font-medium py-2 px-3 rounded-md hover:bg-blue-50 transition-colors">
                  Upgrade Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
