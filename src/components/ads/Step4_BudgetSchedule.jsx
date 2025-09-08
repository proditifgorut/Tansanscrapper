import React from 'react';
import { Wallet, Calendar, LineChart } from 'lucide-react';

const Step4BudgetSchedule = ({ data, update }) => {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Atur Anggaran & Jadwal</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Kontrol pengeluaran dan kapan iklan Anda akan ditampilkan.</p>
      </div>

      {/* Budget */}
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 space-y-4">
        <h3 className="text-lg font-semibold flex items-center mb-4"><Wallet className="w-5 h-5 mr-2"/>Anggaran</h3>
        <div className="flex space-x-4">
          <button
            onClick={() => update('budget', { type: 'daily' })}
            className={`flex-1 p-4 rounded-lg border-2 flex flex-col items-center justify-center transition-colors ${
              data.type === 'daily' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50' : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
            }`}
          >
            <span className="font-medium">Anggaran Harian</span>
            <span className="text-xs text-gray-500">Batas pengeluaran per hari</span>
          </button>
          <button
            onClick={() => update('budget', { type: 'lifetime' })}
            className={`flex-1 p-4 rounded-lg border-2 flex flex-col items-center justify-center transition-colors ${
              data.type === 'lifetime' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50' : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
            }`}
          >
            <span className="font-medium">Anggaran Total</span>
            <span className="text-xs text-gray-500">Batas total selama kampanye</span>
          </button>
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Jumlah (Rp)</label>
          <input 
            type="number" 
            value={data.amount}
            onChange={e => update('budget', { amount: parseInt(e.target.value) || 0 })}
            className="input-style" 
            placeholder="50000"
          />
        </div>
      </div>

      {/* Bidding */}
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 space-y-4">
        <h3 className="text-lg font-semibold flex items-center mb-4"><LineChart className="w-5 h-5 mr-2"/>Strategi Penawaran</h3>
         <select value={data.strategy} onChange={e => update('budget', { strategy: e.target.value })} className="input-style">
            <option value="lowest_cost">Biaya Terendah</option>
            <option value="cost_cap">Batas Biaya</option>
            <option value="bid_cap">Batas Tawaran</option>
            <option value="roas">Target ROAS</option>
         </select>
         <p className="text-xs text-gray-500">Strategi Biaya Terendah akan mencoba mendapatkan hasil sebanyak mungkin dengan anggaran Anda.</p>
      </div>

      {/* Schedule */}
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 space-y-4">
        <h3 className="text-lg font-semibold flex items-center mb-4"><Calendar className="w-5 h-5 mr-2"/>Jadwal</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Tanggal Mulai</label>
            <input 
              type="date" 
              value={data.startDate}
              onChange={e => update('budget', { startDate: e.target.value })}
              className="input-style" 
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Tanggal Selesai (Opsional)</label>
            <input 
              type="date" 
              value={data.endDate}
              onChange={e => update('budget', { endDate: e.target.value })}
              className="input-style" 
            />
          </div>
        </div>
        <label className="flex items-center space-x-2">
            <input type="checkbox" className="h-4 w-4 rounded"/>
            <span className="text-sm">Jalankan iklan hanya pada jam tertentu (Dayparting)</span>
        </label>
      </div>
    </div>
  );
};

export default Step4BudgetSchedule;
