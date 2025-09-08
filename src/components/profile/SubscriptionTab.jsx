import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Crown, Zap, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const SubscriptionTab = () => {
  const { user } = useAuth();
  const quotaPercentage = (user.quotaUsed / user.quotaLimit) * 100;

  const pricingPlans = [
    { name: 'Starter', price: 'Gratis', quota: '100 produk/bulan' },
    { name: 'Pro', price: 'Rp 99rb/bulan', quota: '10.000 produk/bulan', isPopular: true },
    { name: 'Business', price: 'Rp 299rb/bulan', quota: '50.000 produk/bulan' },
  ];

  const billingHistory = [
    { id: 'INV-123', date: '1 Juni 2025', amount: 'Rp 99.000', status: 'Lunas' },
    { id: 'INV-122', date: '1 Mei 2025', amount: 'Rp 99.000', status: 'Lunas' },
    { id: 'INV-121', date: '1 April 2025', amount: 'Rp 99.000', status: 'Lunas' },
  ];

  return (
    <div className="space-y-8">
      {/* Current Plan */}
      <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Paket Langganan Anda</h3>
        <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Crown className="w-8 h-8" />
              <div>
                <p className="text-2xl font-bold">{user.plan}</p>
                <p className="text-sm text-blue-100">Langganan Anda aktif.</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-white/20 rounded-md text-sm font-medium hover:bg-white/30">
              Kelola Langganan
            </button>
          </div>
        </div>
      </div>

      {/* Quota Usage */}
      <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Penggunaan Kuota</h3>
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600 dark:text-gray-400">Digunakan</span>
          <span className="font-medium text-gray-800 dark:text-gray-200">{user.quotaUsed.toLocaleString()} / {user.quotaLimit.toLocaleString()}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${quotaPercentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-2">Kuota Anda akan di-reset pada 1 Juli 2025.</p>
      </div>

      {/* Upgrade Plan */}
      <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Ubah Paket</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pricingPlans.map(plan => (
            <div key={plan.name} className={`relative p-6 rounded-lg border-2 ${user.plan === plan.name ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50' : 'border-gray-200 dark:border-gray-700'}`}>
              {user.plan === plan.name && <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"><Check className="w-4 h-4 text-white" /></div>}
              <h4 className="font-bold text-lg text-gray-900 dark:text-white">{plan.name}</h4>
              <p className="text-xl font-semibold my-2 text-gray-800 dark:text-gray-200">{plan.price}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{plan.quota}</p>
              {user.plan !== plan.name && (
                <button className={`mt-4 w-full py-2 rounded-md font-semibold text-sm ${plan.isPopular ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>
                  {user.plan === 'Starter' ? 'Upgrade' : 'Ubah Paket'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Riwayat Tagihan</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID Faktur</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Jumlah</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {billingHistory.map(item => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionTab;
