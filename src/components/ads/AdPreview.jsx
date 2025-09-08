import React from 'react';
import { Target, MoreHorizontal, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';

const AdPreview = ({ creative }) => {
  const getCtaLabel = (ctaValue) => {
    const ctaOptions = [
      { value: 'LEARN_MORE', label: 'Pelajari Selengkapnya' },
      { value: 'SHOP_NOW', label: 'Beli Sekarang' },
      { value: 'SIGN_UP', label: 'Daftar' },
      { value: 'CONTACT_US', label: 'Hubungi Kami' },
      { value: 'WATCH_MORE', label: 'Tonton Lainnya' },
    ];
    return ctaOptions.find(opt => opt.value === ctaValue)?.label || 'Tombol CTA';
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-sm text-gray-900 dark:text-white">TansanScraper</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Bersponsor</p>
          </div>
        </div>
        <MoreHorizontal className="text-gray-500" />
      </div>

      {/* Primary Text */}
      <div className="px-3 pb-3 text-sm text-gray-800 dark:text-gray-200">
        <p>{creative.primaryText || 'Teks utama iklan Anda akan muncul di sini.'}</p>
      </div>

      {/* Media */}
      <div className="w-full aspect-square bg-gray-200 dark:bg-gray-700">
        {creative.mediaUrl && <img src={creative.mediaUrl} alt="Ad creative" className="w-full h-full object-cover" />}
      </div>

      {/* Headline & CTA */}
      <div className="bg-gray-50 dark:bg-gray-700/50 p-3 flex justify-between items-center">
        <div className="flex-1 pr-2">
          <p className="text-xs uppercase text-gray-500 dark:text-gray-400">tansanscraper.com</p>
          <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">{creative.headline || 'Judul Iklan'}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{creative.description || 'Deskripsi singkat'}</p>
        </div>
        <button className="flex-shrink-0 bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-lg whitespace-nowrap">
          {getCtaLabel(creative.cta)}
        </button>
      </div>

      {/* Actions */}
      <div className="flex justify-around p-2 border-t border-gray-200 dark:border-gray-700">
        <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 text-sm font-medium">
          <ThumbsUp className="w-4 h-4" /><span>Suka</span>
        </button>
        <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 text-sm font-medium">
          <MessageSquare className="w-4 h-4" /><span>Komentar</span>
        </button>
        <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 text-sm font-medium">
          <Share2 className="w-4 h-4" /><span>Bagikan</span>
        </button>
      </div>
    </div>
  );
};

export default AdPreview;
