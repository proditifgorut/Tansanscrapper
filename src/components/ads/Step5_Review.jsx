import React from 'react';
import AdPreview from './AdPreview';
import { Goal, Users, ImageIcon, Wallet, CheckCircle } from 'lucide-react';

const ReviewItem = ({ title, children }) => (
  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</dt>
    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{children}</dd>
  </div>
);

const Step5Review = ({ data }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tinjau Kampanye Anda</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Pastikan semua pengaturan sudah benar sebelum meluncurkan kampanye.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold mb-4">Ringkasan Kampanye</h3>
          <dl className="divide-y divide-gray-200 dark:divide-gray-700">
            <ReviewItem title="Nama Kampanye">{data.name}</ReviewItem>
            <ReviewItem title="Tujuan"><div className="flex items-center"><Goal className="w-4 h-4 mr-2"/> {data.objective}</div></ReviewItem>
            <ReviewItem title="Audiens">
              <ul className="list-disc list-inside space-y-1">
                <li>Lokasi: {data.audience.location}</li>
                <li>Usia: {data.audience.age[0]} - {data.audience.age[1]} tahun</li>
                <li>Minat: {data.audience.interests.join(', ') || 'Tidak ada'}</li>
                {data.audience.custom && <li>Audiens Kustom: {data.audience.custom}</li>}
              </ul>
            </ReviewItem>
            <ReviewItem title="Kreatif"><div className="flex items-center"><ImageIcon className="w-4 h-4 mr-2"/> Format {data.creative.format}</div></ReviewItem>
            <ReviewItem title="Anggaran">
              <div className="flex items-center">
                <Wallet className="w-4 h-4 mr-2"/>
                Rp {data.budget.amount.toLocaleString('id-ID')} / {data.budget.type === 'daily' ? 'hari' : 'total'}
              </div>
            </ReviewItem>
          </dl>
        </div>

        <div className="relative">
          <div className="sticky top-24">
            <h3 className="text-lg font-semibold mb-4 text-center">Pratinjau Akhir</h3>
            <AdPreview creative={data.creative} />
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-blue-50 dark:bg-blue-900/50 border-l-4 border-blue-500 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <CheckCircle className="h-5 w-5 text-blue-500" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Setelah Anda mengklik "Luncurkan Kampanye", iklan Anda akan ditinjau sebelum mulai ditampilkan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step5Review;
