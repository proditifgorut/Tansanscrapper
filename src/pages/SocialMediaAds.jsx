import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Disclosure } from '@headlessui/react';
import { Link } from 'react-router-dom';
import {
  Goal, Users, Locate, Cake, PersonStanding, Languages, Heart, ShoppingBag, UserCheck, UserPlus, UserX,
  Image as ImageIcon, Video, SquareStack, Rows, MousePointerClick, Wand2,
  Wallet, Calendar, Hourglass, LayoutGrid, Smartphone, Laptop, BarChart2, LineChart,
  GitCompare, TestTube2, Target, ChevronUp, Rocket, ArrowRight
} from 'lucide-react';

const featureSections = [
  {
    id: 'planning',
    title: 'Perencanaan & Struktur Kampanye',
    icon: Goal,
    features: [
      {
        title: 'Pemilihan Tujuan Kampanye',
        description: 'Pilih tujuan utama untuk memengaruhi cara platform mengoptimalkan iklan Anda.',
        details: [
          {
            category: 'Kesadaran (Awareness)',
            items: [
              { name: 'Jangkauan (Reach)', description: 'Menampilkan iklan kepada jumlah orang maksimum yang unik.' },
              { name: 'Kesadaran Merek (Brand Awareness)', description: 'Menjangkau orang yang kemungkinan besar akan tertarik dengan merek Anda.' }
            ]
          },
          {
            category: 'Pertimbangan (Consideration)',
            items: [
              { name: 'Lalu Lintas (Traffic)', description: 'Mengarahkan orang ke tujuan tertentu (situs web, aplikasi).' },
              { name: 'Interaksi (Engagement)', description: 'Mendorong lebih banyak suka, komentar, dan bagikan.' },
              { name: 'Pemasangan Aplikasi (App Installs)', description: 'Mengarahkan pengguna untuk mengunduh aplikasi Anda.' },
              { name: 'Penayangan Video (Video Views)', description: 'Mendorong orang untuk menonton video Anda.' },
              { name: 'Pembuatan Prospek (Lead Generation)', description: 'Mengumpulkan data prospek langsung di dalam platform.' },
              { name: 'Pesan (Messages)', description: 'Mendorong percakapan melalui Messenger, WhatsApp, atau Instagram Direct.' }
            ]
          },
          {
            category: 'Konversi (Conversion)',
            items: [
              { name: 'Konversi (Conversions)', description: 'Mendorong tindakan berharga di situs web atau aplikasi Anda (pembelian, pendaftaran).' },
              { name: 'Penjualan Katalog (Catalog Sales)', description: 'Menampilkan produk dari katalog Anda secara dinamis.' },
              { name: 'Kunjungan Toko (Store Traffic)', description: 'Mendorong orang untuk mengunjungi lokasi fisik toko Anda.' }
            ]
          }
        ]
      },
      {
        title: 'Struktur Hirarki Kampanye',
        description: 'Organisir iklan dalam struktur logis: Kampanye (tujuan), Set Iklan (audiens & budget), dan Iklan (kreatif).',
      }
    ]
  },
  {
    id: 'targeting',
    title: 'Penargetan Audiens',
    icon: Users,
    features: [
      { title: 'Penargetan Demografis', description: 'Targetkan audiens berdasarkan lokasi, usia, jenis kelamin, dan bahasa.', icon: Locate },
      { title: 'Penargetan Minat & Perilaku', description: 'Jangkau pengguna berdasarkan minat (misal: "pecinta kopi") dan perilaku (misal: "sering bepergian").', icon: Heart },
      { title: 'Audiens Kustom (Custom Audiences)', description: 'Buat audiens dari data Anda sendiri untuk retargeting (daftar email, pengunjung web, pengguna aplikasi).', icon: UserCheck },
      { title: 'Audiens Serupa (Lookalike Audiences)', description: 'Jangkau pengguna baru yang mirip dengan pelanggan terbaik Anda.', icon: UserPlus },
      { title: 'Pengecualian Audiens (Audience Exclusion)', description: 'Kecualikan audiens tertentu (misal: pelanggan yang sudah membeli) agar tidak melihat iklan Anda.', icon: UserX },
    ]
  },
  {
    id: 'creative',
    title: 'Pembuatan & Manajemen Kreatif',
    icon: ImageIcon,
    features: [
      { title: 'Beragam Format Iklan', description: 'Gunakan format gambar, video, carousel, koleksi, slideshow, atau Stories/Reels.', icon: SquareStack },
      { title: 'Elemen Kreatif', description: 'Atur Headline, Teks Utama, Deskripsi, dan tombol Call-to-Action (CTA) seperti "Beli Sekarang".', icon: Rows },
      { title: 'Dynamic Creative', description: 'Unggah beberapa aset (gambar, judul, CTA) dan biarkan platform menemukan kombinasi terbaik secara otomatis.', icon: Wand2 },
    ]
  },
  {
    id: 'budget',
    title: 'Anggaran, Penawaran & Jadwal',
    icon: Wallet,
    features: [
      { title: 'Pengaturan Anggaran', description: 'Kontrol pengeluaran dengan Anggaran Harian atau Anggaran Total (Lifetime).', icon: Wallet },
      { title: 'Strategi Penawaran (Bidding)', description: 'Pilih strategi seperti Biaya Terendah, Batas Biaya, atau optimasi ROAS.', icon: LineChart },
      { title: 'Penjadwalan Iklan (Dayparting)', description: 'Atur agar iklan hanya berjalan pada hari dan jam tertentu untuk efisiensi maksimal.', icon: Hourglass },
    ]
  },
  {
    id: 'placements',
    title: 'Penempatan Iklan',
    icon: LayoutGrid,
    features: [
      { title: 'Penempatan Otomatis', description: 'Biarkan platform secara cerdas menempatkan iklan Anda di semua lokasi untuk hasil terbaik.', icon: Wand2 },
      { title: 'Penempatan Manual', description: 'Pilih sendiri di mana iklan akan muncul: Beranda (Feed), Stories, Reels, In-Stream Video, Hasil Pencarian, dll.', icon: MousePointerClick },
      { title: 'Multi-Platform', description: 'Jangkau audiens di Facebook, Instagram, Messenger, dan Audience Network.', icon: Smartphone },
    ]
  },
  {
    id: 'tracking',
    title: 'Pelacakan & Analitik',
    icon: BarChart2,
    features: [
      { title: 'Pixel Pelacakan & Conversion API', description: 'Lacak tindakan pengunjung di situs web Anda (view, add to cart, purchase) dengan andal.', icon: Target },
      { title: 'Dashboard Pelaporan Real-time', description: 'Pantau metrik kinerja utama seperti Jangkauan, CTR, CPC, CPA, dan ROAS.', icon: BarChart2 },
      { title: 'Laporan Terperinci (Breakdowns)', description: 'Analisis data berdasarkan usia, jenis kelamin, lokasi, penempatan, dan perangkat.', icon: Laptop },
    ]
  },
  {
    id: 'optimization',
    title: 'Optimisasi & Pengujian',
    icon: TestTube2,
    features: [
      { title: 'A/B Testing (Split Testing)', description: 'Uji variabel berbeda (misal: dua gambar atau dua audiens) untuk menemukan mana yang berkinerja lebih baik.', icon: GitCompare },
      { title: 'Optimisasi Anggaran Kampanye (CBO)', description: 'Biarkan platform secara otomatis mendistribusikan anggaran ke set iklan yang paling efektif.', icon: Wand2 },
    ]
  },
];

const SocialMediaAds = () => {
  const [activeSection, setActiveSection] = useState('planning');
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Panduan Lengkap Fitur Iklan
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
          Pelajari setiap alat yang kami sediakan, lalu langsung praktikkan dengan membuat kampanye pertama Anda.
        </p>
        <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
        >
            <Link to="/app/ads/create" className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-transform hover:scale-105 shadow-lg">
                <Rocket className="w-6 h-6 mr-3" />
                Praktikkan Sekarang: Buat Kampanye
            </Link>
        </motion.div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Sticky Nav */}
        <aside className="lg:w-1/4 lg:sticky top-24 self-start">
          <nav>
            <ul className="space-y-2">
              {featureSections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      sectionRefs.current[section.id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                      activeSection === section.id
                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <section.icon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{section.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="lg:w-3/4 space-y-16">
          {featureSections.map((section) => (
            <motion.section
              key={section.id}
              id={section.id}
              ref={(el) => (sectionRefs.current[section.id] = el)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                <section.icon className="w-8 h-8 mr-4 text-blue-600" />
                {section.title}
              </h2>
              <div className="space-y-6">
                {section.features.map((feature, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                    {feature.details ? (
                      <Disclosure as="div">
                        {({ open }) => (
                          <div>
                            <Disclosure.Button className="flex w-full justify-between items-center text-left">
                              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{feature.title}</h3>
                              <ChevronUp className={`w-5 h-5 text-blue-500 transition-transform ${open ? 'rotate-180' : ''}`} />
                            </Disclosure.Button>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">{feature.description}</p>
                            <Disclosure.Panel className="mt-4 space-y-4">
                              {feature.details.map((detail, dIndex) => (
                                <div key={dIndex}>
                                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">{detail.category}</h4>
                                  <ul className="space-y-2 pl-5 list-disc list-inside">
                                    {detail.items.map((item, iIndex) => (
                                       <li key={iIndex} className="text-gray-600 dark:text-gray-400"><span className="font-medium text-gray-800 dark:text-gray-200">{item.name}:</span> {item.description}</li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </Disclosure.Panel>
                          </div>
                        )}
                      </Disclosure>
                    ) : (
                      <div className="flex items-start space-x-4">
                        {feature.icon && <feature.icon className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />}
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{feature.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">{feature.description}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.section>
          ))}
        </main>
      </div>
    </div>
  );
};

export default SocialMediaAds;
