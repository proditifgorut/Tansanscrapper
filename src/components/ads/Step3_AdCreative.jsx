import React from 'react';
import { ImageIcon, Video, Copy, Rows, MousePointerClick, UploadCloud } from 'lucide-react';
import AdPreview from './AdPreview';

const ctaOptions = [
  { value: 'LEARN_MORE', label: 'Pelajari Selengkapnya' },
  { value: 'SHOP_NOW', label: 'Beli Sekarang' },
  { value: 'SIGN_UP', label: 'Daftar' },
  { value: 'CONTACT_US', label: 'Hubungi Kami' },
  { value: 'WATCH_MORE', label: 'Tonton Lainnya' },
];

const Step3AdCreative = ({ data, update }) => {
  const handleMediaChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        update('creative', { mediaUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left: Settings */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Buat Iklan Anda</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Rancang tampilan visual dan teks yang akan dilihat audiens.</p>
        </div>

        {/* Format */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4">Format Iklan</h3>
          <div className="flex space-x-4">
            {['image', 'video', 'carousel'].map(format => (
              <button
                key={format}
                onClick={() => update('creative', { format })}
                className={`flex-1 p-4 rounded-lg border-2 flex flex-col items-center justify-center transition-colors ${
                  data.format === format ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50' : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
                }`}
              >
                {format === 'image' && <ImageIcon />}
                {format === 'video' && <Video />}
                {format === 'carousel' && <Copy />}
                <span className="mt-2 text-sm font-medium capitalize">{format}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Media */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4">Media</h3>
          <label htmlFor="media-upload" className="cursor-pointer flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadCloud className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Klik untuk mengunggah</span></p>
              <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, atau MP4</p>
            </div>
            <input id="media-upload" type="file" className="hidden" onChange={handleMediaChange} accept="image/png, image/jpeg, video/mp4" />
          </label>
        </div>

        {/* Text & CTA */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 space-y-4">
          <div>
            <label className="flex items-center text-sm font-medium mb-2"><Rows className="w-4 h-4 mr-2"/>Teks Utama</label>
            <textarea value={data.primaryText} onChange={e => update('creative', { primaryText: e.target.value })} rows="3" className="input-style"></textarea>
          </div>
          <div>
            <label className="flex items-center text-sm font-medium mb-2">Judul</label>
            <input type="text" value={data.headline} onChange={e => update('creative', { headline: e.target.value })} className="input-style" />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium mb-2">Deskripsi</label>
            <input type="text" value={data.description} onChange={e => update('creative', { description: e.target.value })} className="input-style" />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium mb-2"><MousePointerClick className="w-4 h-4 mr-2"/>Tombol Ajakan Bertindak (CTA)</label>
            <select value={data.cta} onChange={e => update('creative', { cta: e.target.value })} className="input-style">
              {ctaOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Right: Preview */}
      <div className="relative">
        <div className="sticky top-24">
          <h3 className="text-lg font-semibold mb-4 text-center">Pratinjau Iklan</h3>
          <AdPreview creative={data} />
        </div>
      </div>
    </div>
  );
};

export default Step3AdCreative;
