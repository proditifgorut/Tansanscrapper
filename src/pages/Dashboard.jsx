import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Package, 
  ArrowRight,
  Target,
  DollarSign,
  Tag,
  ArrowUpRight,
  ShoppingBag,
  Rocket
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');

  // Mock data
  const dataSets = {
    '7d': [
      { day: 'Sen', scrapes: 45 }, { day: 'Sel', scrapes: 52 }, { day: 'Rab', scrapes: 38 },
      { day: 'Kam', scrapes: 67 }, { day: 'Jum', scrapes: 89 }, { day: 'Sab', scrapes: 76 }, { day: 'Min', scrapes: 34 },
    ],
    '30d': Array.from({ length: 30 }, (_, i) => ({ day: `D-${29 - i}`, scrapes: Math.floor(Math.random() * 100) + 20 })),
  };

  const categoryData = [
    { name: 'Elektronik', scrapes: 400 },
    { name: 'Fashion', scrapes: 300 },
    { name: 'Kecantikan', scrapes: 200 },
    { name: 'Rumah Tangga', scrapes: 278 },
    { name: 'Mainan', scrapes: 189 },
  ];

  const stats = [
    { title: 'Total Produk Di-scrape', value: '12,543', icon: Package, color: 'bg-blue-500' },
    { title: 'Perubahan Harga (7d)', value: '+2.5%', icon: TrendingUp, color: 'bg-green-500' },
    { title: 'Rata-rata Harga', value: 'Rp 145.800', icon: DollarSign, color: 'bg-yellow-500' },
    { title: 'Top Kategori', value: 'Elektronik', icon: Tag, color: 'bg-purple-500' }
  ];

  const trendingProducts = [
    { id: 1, name: 'TWS Gaming Pro X1', price: 'Rp 249.000', trend: '+35%', image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/150x150/3B82F6/FFFFFF?text=TWS', marketplace: 'Tokopedia' },
    { id: 2, name: 'Sneakers Casual Pria', price: 'Rp 320.000', trend: '+28%', image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/150x150/10B981/FFFFFF?text=Sepatu', marketplace: 'Shopee' },
    { id: 3, name: 'Serum Wajah Vitamin C', price: 'Rp 89.000', trend: '+21%', image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/150x150/F97316/FFFFFF?text=Serum', marketplace: 'Lazada' },
    { id: 4, name: 'Smartwatch Generasi 5', price: 'Rp 1.250.000', trend: '+15%', image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/150x150/EF4444/FFFFFF?text=Watch', marketplace: 'Blibli' },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Selamat Datang di TansanScraper!</h1>
            <p className="text-blue-100 mb-4">Pusat intelijen bisnis e-commerce Anda.</p>
            <Link to="/app/scrape" className="inline-flex items-center bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Mulai Scraping Baru <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          <div className="hidden md:block">
            <Target className="w-20 h-20 text-blue-300 opacity-50" />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-blue-500/20 transition-shadow">
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.title}</p>
          </motion.div>
        ))}
      </div>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center"><Rocket className="w-6 h-6 mr-3 text-blue-500" />Ubah Data Menjadi Penjualan</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Gunakan data hasil scrape untuk membuat kampanye iklan yang tertarget.</p>
            </div>
            <Link to="/app/ads/create" className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Buat Kampanye Iklan <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Aktivitas Scraping</h3>
            <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
              {['7d', '30d'].map(range => (
                <button key={range} onClick={() => setTimeRange(range)} className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${timeRange === range ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-300 shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>
                  {range === '7d' ? '7 Hari' : '30 Hari'}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataSets[timeRange]}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(229, 231, 235, 0.5)" vertical={false} />
                <XAxis dataKey="day" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#ffffff' }} />
                <Line type="monotone" dataKey="scrapes" stroke="#3b82f6" strokeWidth={3} dot={{ r: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Volume per Kategori</h3>
          <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(229, 231, 235, 0.2)" />
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} width={80} />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
                <Bar dataKey="scrapes" fill="#3b82f6" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center"><ShoppingBag className="w-5 h-5 mr-3 text-blue-500" />Produk Trending Minggu Ini</h3>
            <Link to="/app/history" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">Lihat Semua</Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px">
          {trendingProducts.map((product, index) => (
            <motion.div 
              key={product.id} 
              className="p-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <div className="flex items-center space-x-4">
                <img src={product.image} alt={product.name} className="w-20 h-20 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{product.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{product.marketplace}</p>
                  <p className="text-md font-semibold text-blue-600 dark:text-blue-400 mt-1">{product.price}</p>
                  <div className="flex items-center text-xs text-green-600 dark:text-green-400 mt-1">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    <span>{product.trend} penjualan</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
