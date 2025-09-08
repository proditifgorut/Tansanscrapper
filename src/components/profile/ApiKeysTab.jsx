import React, { useState } from 'react';
import { useNotification } from '../../contexts/NotificationContext';
import { Copy, Trash2, Plus } from 'lucide-react';

const ApiKeysTab = () => {
  const { addNotification } = useNotification();
  const [apiKey, setApiKey] = useState('ts_live_******************_demo');

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    addNotification('API Key disalin ke clipboard!', 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Kunci API Anda</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Gunakan kunci API ini untuk mengintegrasikan TansanScraper dengan aplikasi Anda. Jaga kerahasiaan kunci ini!</p>
      </div>
      
      <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-between">
        <code className="font-mono text-sm text-gray-700 dark:text-gray-300">{apiKey}</code>
        <button onClick={copyApiKey} className="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <Copy className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <button className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          <Plus className="w-4 h-4 mr-2" />
          Buat Kunci Baru
        </button>
        <button className="inline-flex items-center justify-center px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm font-medium">
          <Trash2 className="w-4 h-4 mr-2" />
          Cabut Kunci Ini
        </button>
      </div>

      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
        <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
          Lihat Dokumentasi API &rarr;
        </a>
      </div>
    </div>
  );
};

export default ApiKeysTab;
