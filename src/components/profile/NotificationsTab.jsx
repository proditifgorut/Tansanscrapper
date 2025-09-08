import React, { useState } from 'react';

const NotificationsTab = () => {
  const [notifications, setNotifications] = useState({
    scrapeComplete: true,
    scrapeFailed: true,
    monthlyReport: true,
    promotions: false,
  });

  const handleToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const notificationSettings = [
    { id: 'scrapeComplete', label: 'Scraping Selesai', description: 'Dapatkan notifikasi saat tugas scraping Anda berhasil diselesaikan.' },
    { id: 'scrapeFailed', label: 'Scraping Gagal', description: 'Dapatkan notifikasi jika tugas scraping Anda mengalami kegagalan.' },
    { id: 'monthlyReport', label: 'Laporan Bulanan', description: 'Terima ringkasan aktivitas dan wawasan bulanan.' },
    { id: 'promotions', label: 'Info Promo & Update', description: 'Dapatkan informasi tentang fitur baru dan penawaran spesial.' },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pengaturan Notifikasi Email</h3>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {notificationSettings.map(setting => (
          <div key={setting.id} className="py-4 flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{setting.label}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{setting.description}</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle(setting.id)}
              className={`${
                notifications[setting.id] ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              role="switch"
              aria-checked={notifications[setting.id]}
            >
              <span
                aria-hidden="true"
                className={`${
                  notifications[setting.id] ? 'translate-x-5' : 'translate-x-0'
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsTab;
