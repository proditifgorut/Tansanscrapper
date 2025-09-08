import React, { useState } from 'react';
import { Locate, Cake, PersonStanding, Heart, UserCheck, UserPlus, UserX, X } from 'lucide-react';

const mockCustomAudiences = [
  'Pengunjung Website (30 Hari)',
  'Daftar Pelanggan VIP',
  'Pengguna Aplikasi Aktif',
];

const mockLookalikeAudiences = [
  'Serupa (ID, 1%) - Pengunjung Website',
  'Serupa (ID, 2%) - Pelanggan VIP',
];

const Step2AudienceTargeting = ({ data, update }) => {
  const [interestInput, setInterestInput] = useState('');

  const handleInterestKeyDown = (e) => {
    if (e.key === 'Enter' && interestInput.trim()) {
      e.preventDefault();
      if (!data.interests.includes(interestInput.trim())) {
        update('audience', { interests: [...data.interests, interestInput.trim()] });
      }
      setInterestInput('');
    }
  };

  const removeInterest = (interestToRemove) => {
    update('audience', { interests: data.interests.filter(i => i !== interestToRemove) });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Siapa yang Ingin Anda Jangkau?</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Atur penargetan untuk menampilkan iklan kepada audiens yang tepat.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Demographics */}
        <div className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold border-b pb-3">Demografi</h3>
          <div>
            <label className="flex items-center text-sm font-medium mb-2"><Locate className="w-4 h-4 mr-2"/>Lokasi</label>
            <input type="text" value={data.location} onChange={e => update('audience', { location: e.target.value })} className="w-full input-style" />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium mb-2"><Cake className="w-4 h-4 mr-2"/>Usia: {data.age[0]} - {data.age[1]}</label>
            <input type="range" min="13" max="65" value={data.age[1]} onChange={e => update('audience', { age: [data.age[0], parseInt(e.target.value)] })} className="w-full" />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium mb-2"><PersonStanding className="w-4 h-4 mr-2"/>Jenis Kelamin</label>
            <div className="flex space-x-4">
              <label className="flex items-center"><input type="radio" name="gender" value="all" checked={data.gender === 'all'} onChange={e => update('audience', { gender: e.target.value })} className="mr-2"/>Semua</label>
              <label className="flex items-center"><input type="radio" name="gender" value="male" checked={data.gender === 'male'} onChange={e => update('audience', { gender: e.target.value })} className="mr-2"/>Pria</label>
              <label className="flex items-center"><input type="radio" name="gender" value="female" checked={data.gender === 'female'} onChange={e => update('audience', { gender: e.target.value })} className="mr-2"/>Wanita</label>
            </div>
          </div>
        </div>

        {/* Detailed Targeting */}
        <div className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold border-b pb-3">Penargetan Rinci</h3>
          <div>
            <label className="flex items-center text-sm font-medium mb-2"><Heart className="w-4 h-4 mr-2"/>Minat & Perilaku</label>
            <div className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg flex flex-wrap gap-2">
              {data.interests.map(interest => (
                <span key={interest} className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full flex items-center">
                  {interest}
                  <button onClick={() => removeInterest(interest)} className="ml-1.5"><X className="w-3 h-3"/></button>
                </span>
              ))}
              <input 
                type="text" 
                value={interestInput}
                onChange={e => setInterestInput(e.target.value)}
                onKeyDown={handleInterestKeyDown}
                placeholder="Tambahkan minat..."
                className="flex-grow bg-transparent focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Custom Audiences */}
      <div className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold border-b pb-3">Audiens Khusus</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="flex items-center text-sm font-medium mb-2"><UserCheck className="w-4 h-4 mr-2"/>Audiens Kustom</label>
            <select value={data.custom} onChange={e => update('audience', { custom: e.target.value })} className="w-full input-style">
              <option value="">Pilih audiens kustom...</option>
              {mockCustomAudiences.map(aud => <option key={aud} value={aud}>{aud}</option>)}
            </select>
          </div>
          <div>
            <label className="flex items-center text-sm font-medium mb-2"><UserPlus className="w-4 h-4 mr-2"/>Audiens Serupa (Lookalike)</label>
            <select value={data.lookalike} onChange={e => update('audience', { lookalike: e.target.value })} className="w-full input-style">
              <option value="">Pilih audiens serupa...</option>
              {mockLookalikeAudiences.map(aud => <option key={aud} value={aud}>{aud}</option>)}
            </select>
          </div>
        </div>
        <div>
            <label className="flex items-center text-sm font-medium mb-2"><UserX className="w-4 h-4 mr-2"/>Kecualikan Audiens</label>
            <p className="text-xs text-gray-500 mb-2">Kecualikan orang yang sudah menjadi pelanggan atau audiens tertentu.</p>
            <select className="w-full input-style">
              <option value="">Pilih audiens untuk dikecualikan...</option>
              {mockCustomAudiences.map(aud => <option key={aud} value={aud}>Kecualikan: {aud}</option>)}
            </select>
        </div>
      </div>
    </div>
  );
};

export default Step2AudienceTargeting;
