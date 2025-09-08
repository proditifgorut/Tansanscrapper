import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { Crown, Zap, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SubscriptionTab = () => {
  const { user } = useAuth();
  const { addNotification } = useNotification();

  // Local state to manage plan changes for a better simulated UX
  const [currentPlanName, setCurrentPlanName] = useState(user.plan);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const quotaPercentage = (user.quotaUsed / user.quotaLimit) * 100;

  const pricingPlans = [
    { name: 'Starter', price: 'Gratis', quota: '100 produk/bulan', priceNum: 0 },
    { name: 'Pro', price: 'Rp 99rb/bulan', quota: '10.000 produk/bulan', isPopular: true, priceNum: 99000 },
    { name: 'Business', price: 'Rp 299rb/bulan', quota: '50.000 produk/bulan', priceNum: 299000 },
  ];

  const billingHistory = [
    { id: 'INV-123', date: '1 Juni 2025', amount: 'Rp 99.000', status: 'Lunas' },
    { id: 'INV-122', date: '1 Mei 2025', amount: 'Rp 99.000', status: 'Lunas' },
    { id: 'INV-121', date: '1 April 2025', amount: 'Rp 99.000', status: 'Lunas' },
  ];

  const handleUpgradeClick = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleConfirmUpgrade = () => {
    if (!selectedPlan) return;
    
    addNotification(`Berhasil upgrade ke paket ${selectedPlan.name}!`, 'success');
    setCurrentPlanName(selectedPlan.name);
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  const currentPlanDetails = pricingPlans.find(p => p.name === currentPlanName);

  return (
    <>
      <div className="space-y-8">
        {/* Current Plan */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Paket Langganan Anda</h3>
          <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Crown className="w-8 h-8" />
                <div>
                  <p className="text-2xl font-bold">{currentPlanName}</p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map(plan => (
              <div key={plan.name} className={`relative p-6 rounded-lg border-2 flex flex-col ${currentPlanName === plan.name ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50' : 'border-gray-200 dark:border-gray-700'}`}>
                {currentPlanName === plan.name && <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"><Check className="w-4 h-4 text-white" /></div>}
                {plan.isPopular && currentPlanName !== plan.name && (
                  <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-white bg-blue-600 shadow">
                      POPULER
                    </span>
                  </div>
                )}
                <div className="flex-grow">
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white">{plan.name}</h4>
                  <p className="text-xl font-semibold my-2 text-gray-800 dark:text-gray-200">{plan.price}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{plan.quota}</p>
                </div>
                {currentPlanName !== plan.name && (
                  <button 
                    onClick={() => handleUpgradeClick(plan)}
                    className={`mt-6 w-full py-2 rounded-md font-semibold text-sm transition-colors ${plan.isPopular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>
                    {currentPlanDetails.priceNum < plan.priceNum ? 'Upgrade' : 'Ubah Paket'}
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

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white">Konfirmasi Perubahan Paket</h3>
                <p className="text-center text-gray-500 dark:text-gray-400 mt-2">Anda akan mengubah paket langganan Anda.</p>
                
                <div className="flex items-center justify-between my-8">
                  <div className="text-center p-4 w-40">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Dari</p>
                    <div className="font-bold text-lg text-gray-800 dark:text-white truncate">{currentPlanDetails.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{currentPlanDetails.price}</div>
                  </div>

                  <ArrowRight className="w-6 h-6 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                  
                  <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800 w-40">
                    <p className="text-sm text-blue-600 dark:text-blue-400">Ke</p>
                    <div className="font-bold text-lg text-blue-800 dark:text-blue-200 truncate">{selectedPlan.name}</div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">{selectedPlan.price}</div>
                  </div>
                </div>

                <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                  <p>Paket baru Anda akan aktif segera setelah konfirmasi. Penagihan berikutnya akan disesuaikan.</p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 flex justify-end space-x-3 rounded-b-2xl">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirmUpgrade}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Konfirmasi & Upgrade
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SubscriptionTab;
