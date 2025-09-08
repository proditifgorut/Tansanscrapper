import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification } from '../contexts/NotificationContext';
import { CheckCircle, Rocket } from 'lucide-react';

import Stepper from '../components/ads/Stepper';
import Step1CampaignObjective from '../components/ads/Step1_CampaignObjective';
import Step2AudienceTargeting from '../components/ads/Step2_AudienceTargeting';
import Step3AdCreative from '../components/ads/Step3_AdCreative';
import Step4BudgetSchedule from '../components/ads/Step4_BudgetSchedule';
import Step5Review from '../components/ads/Step5_Review';

const steps = [
  { id: 1, name: 'Tujuan' },
  { id: 2, name: 'Audiens' },
  { id: 3, name: 'Kreatif' },
  { id: 4, name: 'Anggaran' },
  { id: 5, name: 'Tinjauan' },
];

const AdsCreator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    name: 'Promo Sepatu Lari - Q3 2025',
    objective: 'CONVERSIONS',
    audience: {
      location: 'Indonesia',
      age: [22, 38],
      gender: 'all',
      interests: ['Lari', 'Sepatu Olahraga', 'Marathon'],
      custom: 'Pengunjung Website (30 Hari)',
      lookalike: 'Serupa (ID, 1%) - Pelanggan VIP',
      exclusions: ['Pelanggan yang sudah membeli (90 hari)'],
    },
    creative: {
      format: 'image',
      mediaUrl: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/1080x1080/10B981/FFFFFF?text=AeroStride+Shoes',
      primaryText: "Tingkatkan performa larimu! 🏃‍♂️ Sepatu Lari 'AeroStride' kini hadir dengan teknologi bantalan terbaru. Ringan, responsif, dan siap membawamu lebih jauh. Dapatkan diskon 30% + gratis ongkir khusus minggu ini!",
      headline: 'Diskon 30% Sepatu Lari AeroStride',
      description: 'Stok terbatas. Beli sekarang!',
      cta: 'SHOP_NOW',
    },
    budget: {
      type: 'daily',
      amount: 150000,
      strategy: 'lowest_cost',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
    },
  });
  const [isFinished, setIsFinished] = useState(false);
  const { addNotification } = useNotification();

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step (Launch)
      addNotification('Kampanye berhasil diluncurkan! (Simulasi)', 'success');
      setIsFinished(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateCampaignData = (section, data) => {
    setCampaignData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
  };
  
  const resetWizard = () => {
    setIsFinished(false);
    setCurrentStep(1);
     // Keep some defaults
    setCampaignData(prev => ({
        ...prev,
        objective: 'CONVERSIONS',
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1CampaignObjective data={campaignData} update={setCampaignData} />;
      case 2:
        return <Step2AudienceTargeting data={campaignData.audience} update={updateCampaignData} />;
      case 3:
        return <Step3AdCreative data={campaignData.creative} update={updateCampaignData} />;
      case 4:
        return <Step4BudgetSchedule data={campaignData.budget} update={updateCampaignData} />;
      case 5:
        return <Step5Review data={campaignData} />;
      default:
        return null;
    }
  };

  if (isFinished) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="text-center bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto"
      >
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Kampanye Diluncurkan!</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
            Kampanye "{campaignData.name}" Anda telah berhasil disimulasikan dan akan mulai berjalan.
        </p>
        <button 
            onClick={resetWizard}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
            <Rocket className="w-5 h-5 mr-2" />
            Buat Kampanye Lain
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <Stepper steps={steps} currentStep={currentStep} />
      
      <div className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 pt-5 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Kembali
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {currentStep === steps.length ? 'Luncurkan Kampanye' : 'Lanjutkan'}
        </button>
      </div>
    </div>
  );
};

export default AdsCreator;
