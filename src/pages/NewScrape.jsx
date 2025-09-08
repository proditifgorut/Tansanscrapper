import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { 
  Target, Globe, Settings, Play, Info, AlertCircle, CheckCircle, Clock, ChevronDown
} from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';
import { Link } from 'react-router-dom';

const schema = yup.object().shape({
  jobName: yup.string().required('Nama tugas wajib diisi'),
  marketplace: yup.string().required('Pilih marketplace'),
  urls: yup.string().required('URL wajib diisi').matches(/^https?:\/\/.+/, 'Format URL tidak valid'),
  startPage: yup.number().min(1).default(1),
  endPage: yup.number().min(yup.ref('startPage') || 1).default(5),
  schedule: yup.string(),
});

const NewScrape = () => {
  const [selectedMarketplace, setSelectedMarketplace] = useState('');
  const [scrapeMode, setScrapeMode] = useState('single');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { addNotification } = useNotification();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const marketplaces = [
    { id: 'tokopedia', name: 'Tokopedia', logo: 'T', color: 'bg-green-500', url: 'tokopedia.com' },
    { id: 'shopee', name: 'Shopee', logo: 'S', color: 'bg-orange-500', url: 'shopee.co.id' },
    { id: 'lazada', name: 'Lazada', logo: 'L', color: 'bg-blue-500', url: 'lazada.co.id' },
    { id: 'blibli', name: 'Blibli', logo: 'B', color: 'bg-red-500', url: 'blibli.com' }
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    addNotification('Memulai tugas scraping...', 'info');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Scraping data:", data);
    setSubmitSuccess(true);
    setIsSubmitting(false);
    addNotification('Tugas scraping berhasil dibuat!', 'success');
    
    setTimeout(() => {
      setSubmitSuccess(false);
      reset();
      setSelectedMarketplace('');
      setScrapeMode('single');
    }, 5000);
  };

  if (submitSuccess) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Scraping Dimulai!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Tugas scraping Anda telah berhasil dibuat dan sedang diproses. Anda akan menerima notifikasi email ketika scraping selesai.
          </p>
          <div className="flex space-x-4 justify-center">
            <button onClick={() => setSubmitSuccess(false)} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Scrape Lagi
            </button>
            <Link to="/app/history" className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Lihat Progress
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Scrape Produk Baru</h1>
        <p className="text-gray-600 dark:text-gray-400">Mulai scraping produk dari marketplace favorit Anda untuk riset pasar yang mendalam</p>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Job Name */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Nama Tugas</h3>
          <input {...register('jobName')} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white" placeholder="Contoh: Riset Smartphone Januari" />
          {errors.jobName && <p className="mt-1 text-red-600 text-sm">{errors.jobName.message}</p>}
        </motion.div>

        {/* Marketplace Selection */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-4"><Globe className="w-5 h-5 text-blue-600" /><h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pilih Marketplace</h3></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketplaces.map((marketplace) => (
              <label key={marketplace.id} className={`relative cursor-pointer rounded-lg border-2 p-4 hover:border-blue-400 transition-colors ${selectedMarketplace === marketplace.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50' : 'border-gray-200 dark:border-gray-700'}`}>
                <input type="radio" value={marketplace.id} {...register('marketplace')} onChange={(e) => setSelectedMarketplace(e.target.value)} className="sr-only" />
                <div className="flex flex-col items-center text-center">
                  <div className={`w-12 h-12 ${marketplace.color} rounded-lg flex items-center justify-center mb-3`}><span className="text-white font-bold text-lg">{marketplace.logo}</span></div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{marketplace.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{marketplace.url}</p>
                </div>
                {selectedMarketplace === marketplace.id && <div className="absolute top-2 right-2"><CheckCircle className="w-5 h-5 text-blue-600" /></div>}
              </label>
            ))}
          </div>
          {errors.marketplace && <p className="mt-2 text-red-600 text-sm">{errors.marketplace.message}</p>}
        </motion.div>

        {/* URL Input */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">URL Target</h3>
          <textarea {...register('urls')} rows={4} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white" placeholder="Masukkan satu URL per baris..."></textarea>
          {errors.urls && <p className="mt-1 text-red-600 text-sm">{errors.urls.message}</p>}
        </motion.div>

        {/* Scraping Options */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-4"><Settings className="w-5 h-5 text-blue-600" /><h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pengaturan Scraping</h3></div>
          {/* ... (rest of the component) */}
        </motion.div>
        
        {/* Submit Button */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex justify-center">
          <button type="submit" disabled={isSubmitting} className={`inline-flex items-center px-8 py-3 text-white font-medium rounded-lg transition-all ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:scale-105'}`}>
            {isSubmitting ? (<><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>Memproses...</>) : (<><Play className="w-5 h-5 mr-2" />Mulai Scraping</>)}
          </button>
        </motion.div>
      </form>
    </div>
  );
};

export default NewScrape;
