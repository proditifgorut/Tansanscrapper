import React from 'react';
import { useForm } from 'react-hook-form';
import { Laptop, Smartphone, ShieldCheck } from 'lucide-react';

const SecurityTab = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const password = watch('newPassword');

  const onSubmitPassword = (data) => {
    console.log('Changing password:', data);
  };

  const activeSessions = [
    { device: 'Chrome di Windows', ip: '103.22.11.5', time: 'Aktif sekarang', icon: Laptop, isCurrent: true },
    { device: 'Aplikasi Android', ip: '182.1.23.45', time: '2 jam yang lalu', icon: Smartphone, isCurrent: false },
  ];

  return (
    <div className="space-y-8">
      {/* Change Password */}
      <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Ubah Password</h3>
        <form onSubmit={handleSubmit(onSubmitPassword)} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium">Password Saat Ini</label>
            <input type="password" {...register('currentPassword', { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-medium">Password Baru</label>
            <input type="password" {...register('newPassword', { required: true, minLength: 8 })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600" />
            {errors.newPassword && <p className="text-sm text-red-500 mt-1">Password baru minimal 8 karakter.</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Konfirmasi Password Baru</label>
            <input type="password" {...register('confirmPassword', { required: true, validate: value => value === password })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600" />
            {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">Password tidak cocok.</p>}
          </div>
          <div className="text-right">
            <button type="submit" className="py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700">Ubah Password</button>
          </div>
        </form>
      </div>

      {/* 2FA */}
      <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Autentikasi Dua Faktor (2FA)</h3>
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="font-medium text-green-800 dark:text-green-300">2FA Aktif</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Anda telah mengaktifkan autentikasi dua faktor untuk mengamankan akun Anda.</p>
            <button className="mt-2 text-sm font-medium text-red-600 hover:text-red-800">Nonaktifkan</button>
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sesi Aktif</h3>
        <ul className="space-y-4">
          {activeSessions.map((session, index) => (
            <li key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <session.icon className="w-6 h-6 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{session.device}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {session.ip} - <span className={session.isCurrent ? 'text-green-600 font-semibold' : ''}>{session.time}</span>
                  </p>
                </div>
              </div>
              {!session.isCurrent && <button className="text-sm text-blue-600 hover:underline">Keluar</button>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SecurityTab;
