import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Download, Eye, Calendar, FileText, MoreVertical, CheckCircle, Clock, AlertCircle, Trash2, RefreshCcw
} from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useNotification } from '../contexts/NotificationContext';

// Mock Data
const allScrapingJobs = Array.from({ length: 28 }, (_, i) => {
    const statusOptions = ['completed', 'running', 'failed'];
    const marketplaceOptions = ['Tokopedia', 'Shopee', 'Lazada', 'Blibli'];
    const status = statusOptions[i % 3];
    return {
      id: i + 1,
      marketplace: marketplaceOptions[i % 4],
      query: `Riset produk #${i + 1}`,
      status: status,
      products: status === 'failed' ? 0 : Math.floor(Math.random() * 500) + 50,
      createdAt: new Date(Date.now() - i * 1000 * 60 * 60 * 24),
      completedAt: status !== 'running' ? new Date(Date.now() - (i - 0.1) * 1000 * 60 * 60 * 24) : null,
      fileSize: status === 'completed' ? `${(Math.random() * 5 + 1).toFixed(1)} MB` : null,
      exportFormats: status === 'completed' ? ['CSV', 'XLSX', 'JSON'] : []
    }
});

const ITEMS_PER_PAGE = 10;

const ScrapingHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(null);
  const { addNotification } = useNotification();

  const filteredJobs = useMemo(() => allScrapingJobs.filter(job => {
    const matchesSearch = job.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.marketplace.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  }), [searchTerm, statusFilter]);

  const paginatedJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredJobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredJobs, currentPage]);

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);

  const handleAction = (action, job) => {
    setActiveDropdown(null);
    switch(action) {
      case 'preview':
        setShowPreviewModal(job);
        addNotification(`Membuka pratinjau untuk tugas #${job.id}`);
        break;
      case 'rerun':
        addNotification(`Menjalankan ulang tugas #${job.id}`, 'info');
        break;
      case 'delete':
        setShowDeleteModal(job);
        break;
      default:
        if (action.startsWith('download-')) {
          const format = action.split('-')[1];
          addNotification(`Mengunduh ${format} untuk tugas #${job.id}`, 'success');
        }
    }
  };

  const confirmDelete = () => {
    addNotification(`Tugas #${showDeleteModal.id} telah dihapus`, 'success');
    setShowDeleteModal(null);
    // Here you would filter out the deleted job from your state
  };
  
  // ... (rest of the component logic)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Riwayat Scraping</h1>
      {/* ... Filters and Table ... */}
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Halaman {currentPage} dari {totalPages}
          </span>
          <div className="flex items-center space-x-2">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 border rounded-lg disabled:opacity-50">Sebelumnya</button>
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 border rounded-lg disabled:opacity-50">Berikutnya</button>
          </div>
        </div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full">
              <h3 className="text-lg font-bold">Hapus Tugas?</h3>
              <p className="text-sm text-gray-600 mt-2">Anda yakin ingin menghapus tugas "{showDeleteModal.query}"? Aksi ini tidak dapat dibatalkan.</p>
              <div className="flex justify-end space-x-3 mt-6">
                <button onClick={() => setShowDeleteModal(null)} className="px-4 py-2 rounded-lg border">Batal</button>
                <button onClick={confirmDelete} className="px-4 py-2 rounded-lg bg-red-600 text-white">Hapus</button>
              </div>
            </div>
          </motion.div>
        )}
        {showPreviewModal && (
           <motion.div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPreviewModal(null)}>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full" onClick={e => e.stopPropagation()}>
              <h3 className="text-lg font-bold">Pratinjau Data - {showPreviewModal.query}</h3>
              <div className="overflow-auto max-h-[60vh] mt-4 border rounded-lg">
                {/* Mock data table */}
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 sticky top-0"><tr><th className="p-2">Nama Produk</th><th className="p-2">Harga</th><th className="p-2">Terjual</th></tr></thead>
                  <tbody>
                    {Array.from({length: 10}).map((_, i) => (
                      <tr key={i} className="border-t">
                        <td className="p-2">Mock Produk {i+1}</td>
                        <td className="p-2">Rp {(Math.random() * 1000000).toFixed(0)}</td>
                        <td className="p-2">{(Math.random() * 1000).toFixed(0)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end mt-6">
                <button onClick={() => setShowPreviewModal(null)} className="px-4 py-2 rounded-lg bg-blue-600 text-white">Tutup</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScrapingHistory;
