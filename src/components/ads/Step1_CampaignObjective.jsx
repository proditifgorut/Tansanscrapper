import React from 'react';
import { motion } from 'framer-motion';
import { Goal, Users, Handshake, CheckCircle } from 'lucide-react';

const objectives = [
  {
    category: 'Kesadaran',
    icon: Goal,
    color: 'text-sky-500',
    options: [
      { id: 'REACH', name: 'Jangkauan', description: 'Jangkau orang sebanyak mungkin.' },
      { id: 'BRAND_AWARENESS', name: 'Kesadaran Merek', description: 'Tingkatkan kesadaran akan merek Anda.' },
    ],
  },
  {
    category: 'Pertimbangan',
    icon: Users,
    color: 'text-amber-500',
    options: [
      { id: 'TRAFFIC', name: 'Lalu Lintas', description: 'Arahkan traffic ke situs web atau aplikasi.' },
      { id: 'ENGAGEMENT', name: 'Interaksi', description: 'Dapatkan lebih banyak interaksi postingan.' },
      { id: 'LEAD_GENERATION', name: 'Pembuatan Prospek', description: 'Kumpulkan prospek untuk bisnis Anda.' },
    ],
  },
  {
    category: 'Konversi',
    icon: Handshake,
    color: 'text-emerald-500',
    options: [
      { id: 'CONVERSIONS', name: 'Konversi', description: 'Dorong tindakan berharga di situs Anda.' },
      { id: 'CATALOG_SALES', name: 'Penjualan Katalog', description: 'Tampilkan item dari katalog produk.' },
    ],
  },
];

const Step1CampaignObjective = ({ data, update }) => {
  const handleSelectObjective = (objectiveId) => {
    update(prev => ({ ...prev, objective: objectiveId }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Apa Tujuan Kampanye Anda?</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Pilihan Anda akan membantu kami mengoptimalkan iklan untuk hasil terbaik.</p>
      </div>

      <div className="space-y-4">
        <label htmlFor="campaignName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Kampanye</label>
        <input
          type="text"
          id="campaignName"
          value={data.name}
          onChange={(e) => update(prev => ({...prev, name: e.target.value}))}
          className="w-full max-w-lg px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
          placeholder="Contoh: Promo Akhir Tahun"
        />
      </div>

      <div className="space-y-10">
        {objectives.map((objCategory, index) => (
          <motion.div 
            key={objCategory.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <h3 className={`text-xl font-semibold flex items-center mb-4 ${objCategory.color}`}>
              <objCategory.icon className="w-6 h-6 mr-3" />
              {objCategory.category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {objCategory.options.map((option) => (
                <motion.div
                  key={option.id}
                  whileHover={{ y: -5 }}
                  onClick={() => handleSelectObjective(option.id)}
                  className={`relative cursor-pointer p-6 rounded-xl border-2 transition-all duration-200 ${
                    data.objective === option.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50 shadow-lg'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-400 dark:hover:border-blue-600'
                  }`}
                >
                  {data.objective === option.id && (
                    <div className="absolute top-3 right-3">
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                    </div>
                  )}
                  <h4 className="font-bold text-gray-900 dark:text-white">{option.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{option.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Step1CampaignObjective;
