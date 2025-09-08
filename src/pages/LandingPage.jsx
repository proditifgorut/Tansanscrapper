import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Disclosure } from '@headlessui/react';
import { 
  Target, Zap, Clock, Database, BarChart2, Shield, Check, ChevronUp,
  Twitter, Linkedin, Facebook
} from 'lucide-react';

// Components for Landing Page
const LandingHeader = () => (
  <header className="absolute top-0 left-0 right-0 z-10 py-6 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <Link to="/" className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
          <Target className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-gray-900 dark:text-white">TansanScraper</span>
      </Link>
      <div className="hidden md:flex items-center space-x-8">
        <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Fitur</a>
        <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Harga</a>
        <a href="#faq" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">FAQ</a>
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Masuk</Link>
        <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">Daftar Gratis</Link>
      </div>
    </div>
  </header>
);

const LandingFooter = () => (
  <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex justify-center space-x-6 md:order-2">
          <a href="#" className="text-gray-400 hover:text-gray-500"><Twitter /></a>
          <a href="#" className="text-gray-400 hover:text-gray-500"><Linkedin /></a>
          <a href="#" className="text-gray-400 hover:text-gray-500"><Facebook /></a>
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-base text-gray-400">&copy; 2025 TansanScraper. Semua Hak Dilindungi.</p>
        </div>
      </div>
    </div>
  </footer>
);

const PricingCard = ({ plan, isPopular }) => (
  <motion.div 
    whileHover={{ y: -10, scale: 1.02 }}
    className={`relative flex flex-col rounded-2xl border ${isPopular ? 'border-blue-500' : 'border-gray-200 dark:border-gray-700'} p-8 bg-white dark:bg-gray-800 shadow-lg`}
  >
    {isPopular && (
      <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
        <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold tracking-wider text-white bg-blue-500">
          PALING POPULER
        </span>
      </div>
    )}
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{plan.description}</p>
    <div className="mt-4">
      <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{plan.promoPrice}</span>
      <span className="text-base font-medium text-gray-500 dark:text-gray-400">/bulan</span>
    </div>
    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-through">{plan.originalPrice}</p>
    
    <ul role="list" className="mt-8 space-y-4 text-sm leading-6 text-gray-600 dark:text-gray-300 flex-grow">
      {plan.features.map((feature) => (
        <li key={feature} className="flex gap-x-3">
          <Check className="h-6 w-5 flex-none text-blue-500" aria-hidden="true" />
          {feature}
        </li>
      ))}
    </ul>
    
    <Link
      to="/register"
      className={`mt-8 block rounded-lg px-6 py-3 text-center text-sm font-semibold leading-6 ${isPopular ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-500' : 'text-blue-600 ring-1 ring-inset ring-blue-200 hover:ring-blue-300 dark:text-blue-400 dark:ring-blue-700 dark:hover:ring-blue-600'}`}
    >
      {plan.cta}
    </Link>
  </motion.div>
);

const LandingPage = () => {
  const features = [
    { name: 'Scraping Cepat & Akurat', description: 'Ekstrak data produk dari marketplace terkemuka di Indonesia dengan kecepatan tinggi.', icon: Zap },
    { name: 'Tanpa Koding', description: 'Antarmuka yang intuitif memungkinkan siapa saja untuk melakukan scraping, tanpa perlu keahlian teknis.', icon: Target },
    { name: 'Scraping Terjadwal', description: 'Atur scraping untuk berjalan otomatis dan pantau harga pesaing secara berkala.', icon: Clock },
    { name: 'Ekspor Data Fleksibel', description: 'Unduh hasil scraping dalam format CSV, XLSX, atau JSON sesuai kebutuhan Anda.', icon: Database },
    { name: 'Analisis Mendalam', description: 'Dapatkan wawasan pasar yang berharga dari data yang bersih dan terstruktur.', icon: BarChart2 },
    { name: 'Aman & Andal', description: 'Sistem rotasi proxy internal kami memastikan keandalan scraping dan menghindari pemblokiran.', icon: Shield },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      description: 'Untuk coba-coba & proyek kecil.',
      promoPrice: 'Gratis',
      originalPrice: '',
      features: [
        '100 produk / bulan',
        '1 tugas berjalan bersamaan',
        'Dukungan Komunitas',
      ],
      cta: 'Mulai Gratis',
    },
    {
      name: 'Pro',
      description: 'Sempurna untuk dropshipper & UMKM.',
      promoPrice: 'Rp 99.000',
      originalPrice: 'Rp 149.000',
      features: [
        '10.000 produk / bulan',
        '5 tugas berjalan bersamaan',
        'Scraping Terjadwal',
        'Dukungan Email Prioritas',
      ],
      cta: 'Pilih Pro',
    },
    {
      name: 'Business',
      description: 'Solusi lengkap untuk analis & tim.',
      promoPrice: 'Rp 299.000',
      originalPrice: 'Rp 449.000',
      features: [
        '50.000 produk / bulan',
        '20 tugas berjalan bersamaan',
        'Scraping Terjadwal & API Access',
        'Dukungan Dedikasi',
      ],
      cta: 'Pilih Business',
    },
  ];
  
  const faqs = [
    { question: "Marketplace apa saja yang didukung?", answer: "Saat ini kami mendukung Tokopedia, Shopee, Lazada, dan Blibli. Kami terus berupaya untuk menambahkan marketplace lain di masa mendatang." },
    { question: "Apakah data yang saya scrape aman?", answer: "Tentu saja. Semua data yang Anda scrape bersifat pribadi dan hanya dapat diakses oleh Anda. Kami tidak pernah membagikan atau menjual data pengguna." },
    { question: "Bagaimana jika saya melebihi kuota?", answer: "Jika Anda melebihi kuota, proses scraping akan dijeda. Anda dapat meng-upgrade paket Anda kapan saja untuk melanjutkan atau menunggu hingga periode kuota berikutnya dimulai." },
    { question: "Bisakah saya membatalkan langganan kapan saja?", answer: "Ya, Anda dapat membatalkan langganan Anda kapan saja melalui halaman profil. Anda akan tetap memiliki akses ke fitur premium hingga akhir siklus penagihan Anda." },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <LandingHeader />

      <main>
        {/* Hero Section */}
        <div className="relative pt-32 pb-24 sm:pt-48 sm:pb-32">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-48 left-1/2 -ml-96 w-[150rem] h-[150rem] bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900/30 dark:to-indigo-900/40 rounded-full animate-pulse"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              Riset Pasar E-commerce <br /> <span className="text-blue-600">Tanpa Batas, Tanpa Koding.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300"
            >
              TansanScraper adalah solusi andalan Anda untuk memantau harga, menganalisis produk, dan mengumpulkan data dari marketplace terbesar di Indonesia secara otomatis.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex justify-center gap-x-6"
            >
              <Link to="/register" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-transform hover:scale-105">
                Mulai Gratis Sekarang
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="py-24 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Semua yang Anda Butuhkan untuk Dominasi Pasar</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Dari riset produk hingga pemantauan pesaing, kami punya solusinya.</p>
            </div>
            <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, i) => (
                <motion.div 
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-600 dark:text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Harga Promo Spesial Untuk Anda</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Pilih paket yang paling sesuai dengan kebutuhan Anda dan mulai sekarang juga. Penawaran terbatas!</p>
            </div>
            <div className="isolate mx-auto mt-20 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              <PricingCard plan={pricingPlans[0]} />
              <PricingCard plan={pricingPlans[1]} isPopular={true} />
              <PricingCard plan={pricingPlans[2]} />
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-white dark:bg-gray-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Pertanyaan yang Sering Diajukan</h2>
            <div className="mt-12 w-full mx-auto rounded-2xl bg-white dark:bg-gray-800 p-2 space-y-2">
              {faqs.map((faq, i) => (
                <Disclosure as="div" key={i}>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-50 dark:bg-gray-700 px-4 py-4 text-left text-sm font-medium text-blue-900 dark:text-blue-200 hover:bg-blue-100 dark:hover:bg-gray-600 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                        <span>{faq.question}</span>
                        <ChevronUp className={`${open ? 'rotate-180' : ''} h-5 w-5 text-blue-500 transform transition-transform duration-200`} />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-600 dark:text-gray-400">
                        {faq.answer}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
};

export default LandingPage;
