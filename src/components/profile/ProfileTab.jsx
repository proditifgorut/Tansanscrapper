import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { Trash2 } from 'lucide-react';

const ProfileTab = () => {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
    }
  });

  const onSubmit = (data) => {
    console.log('Updating profile:', data);
    addNotification('Profil berhasil diperbarui!', 'success');
  };

  return (
    <div className="space-y-8">
      {/* Profile Information */}
      <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Informasi Profil</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Lengkap</label>
            <input 
              id="name" 
              type="text" 
              {...register('name', { required: 'Nama tidak boleh kosong' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Alamat Email</label>
            <input 
              id="email" 
              type="email" 
              {...register('email', { required: 'Email tidak boleh kosong' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div className="text-right">
            <button 
              type="submit"
              disabled={!isDirty}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">Zona Berbahaya</h3>
        <p className="text-sm text-red-700 dark:text-red-400 mb-4">
          Tindakan ini tidak dapat diurungkan. Mohon pertimbangkan dengan baik sebelum melanjutkan.
        </p>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          <Trash2 className="w-4 h-4 mr-2" />
          Hapus Akun Saya
        </button>
      </div>
    </div>
  );
};

export default ProfileTab;
