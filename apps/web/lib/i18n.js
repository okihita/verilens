'use client';

import { useState, useEffect } from 'react';

export const TRANSLATIONS = {
  en: {
    // Navigation
    brand_sub: 'UNESCO MIL 2026',
    nav_games: 'Training Games',
    nav_codex: 'Codex',
    nav_sandbox: 'Sandbox',
    nav_classroom: 'Classroom',
    nav_extension: 'Browser Extension',
    nav_trophy: 'Trophy Room',
    nav_skills: 'Skill Tree',
    nav_league: 'Global League',
    nav_daily_gauntlet: 'Daily Gauntlet',
    nav_spotter_arena: 'Spotter Arena',
    nav_feed_sim: 'Feed Simulator',
    nav_fallacy_forge: 'The Fallacy Forge',
    nav_duel: 'Cognitive Duel',
    xp_label: 'XP',
    level_prefix: 'Lv.',

    // Home Page Hero
    hackathon_badge: 'UNESCO Global MIL Youth Hackathon 2026',
    hero_title: 'The AI-Powered Cognitive Shield for the Next Generation',
    hero_desc: 'Master the 12 rhetorical fallacies and cognitive biases weaponized by modern outrage algorithms. Train in the Dojo, conquer the Gauntlet, and protect your live browsing with Browser Armor.',
    hero_cta_arena: 'Play Spotter Arena',
    hero_cta_gauntlet: '60s Daily Gauntlet',
    hero_cta_skills: 'Skill Tree',
    hero_cta_extension: 'Get Chrome Extension',
    metrics_archetypes: 'Illustrated Archetypes',
    metrics_framework: 'UNESCO Framework',
    metrics_latency: 'Gemini Flash-Lite',

    // Codex Section
    codex_badge: 'Interactive Learning Dojo',
    codex_title: 'The Illustrated Fallacy & Bias Codex',
    codex_desc: 'Inspired by yourlogicalfallacyis.com. Tap any card to flip it and reveal the psychological anatomy.',
    search_placeholder: 'Search fallacies...',
    cat_all: 'All',
    cat_logic: 'Logic',
    cat_emotional: 'Emotional',
    cat_attribution: 'Attribution',
    cat_cognitive: 'Cognitive',
    cat_scam: 'Scam',
    card_tap_front: 'Tap to flip anatomy',
    card_tap_back: 'Tap to flip back',
    card_viral_scenario: 'Viral Scenario:',
    card_reflection: 'Metacognition Prompt:',
    card_sandbox_btn: 'Sandbox',

    // Gauntlet
    gauntlet_badge: '60-Second Timed Survival Mode',
    gauntlet_title: 'The Daily Bias Gauntlet',
    gauntlet_desc: 'Test your cognitive reflexes. You have 60 seconds to triage breaking headlines into Fallacy, Factual, or Scam. Build combos for massive XP.',
    gauntlet_rules_title: 'Gauntlet Rules:',
    gauntlet_rule_1: '60s Speed Run: Sort claims before time runs out.',
    gauntlet_rule_2: 'Combos: 2x, 3x, and 4x multiplier on consecutive streaks.',
    gauntlet_rule_3: 'Certification: High scores unlock your UNESCO Certificate.',
    gauntlet_start_btn: 'Start 60s Challenge',
    gauntlet_time_up: 'Gauntlet Time Up',
    gauntlet_perf_sub: '60-Second Cognitive Reflex Performance',
    gauntlet_accuracy: 'Accuracy',
    gauntlet_sorted: 'Claims Sorted',
    gauntlet_claim_cert: 'Claim Certificate',
    gauntlet_replay: 'Replay Gauntlet',
    btn_fallacy: 'FALLACY / BIAS',
    btn_factual: 'FACTUAL REPORT',
    btn_scam: 'SCAM / LURE',

    // Footer
    footer_desc: 'An open-access media & information literacy ecosystem combining gamified cognitive conditioning with real-time browser protection. Built for the UNESCO Global MIL Youth Hackathon 2026.',
    footer_train_title: 'Training Games',
    footer_prog_title: 'Progression & Ranks',
    footer_eco_title: 'Ecosystem',
    footer_copy: '2026 VeriLens Project • Developed for UNESCO Global MIL Youth Hackathon',
    footer_privacy_note: 'Open Source • Privacy-First Local Processing'
  },
  id: {
    // Navigation
    brand_sub: 'UNESCO MIL 2026',
    nav_games: 'Permainan Latihan',
    nav_codex: 'Kodeks Falasi',
    nav_sandbox: 'Kotak Pasir AI',
    nav_classroom: 'Ruang Kelas',
    nav_extension: 'Ekstensi Browser',
    nav_trophy: 'Ruang Trofi',
    nav_skills: 'Pohon Keterampilan',
    nav_league: 'Liga Global',
    nav_daily_gauntlet: 'Tantangan Harian',
    nav_spotter_arena: 'Arena Deteksi',
    nav_feed_sim: 'Simulasi Beranda',
    nav_fallacy_forge: 'Laboratorium Falasi',
    nav_duel: 'Duel Kognitif 1v1',
    xp_label: 'XP',
    level_prefix: 'Tkt.',

    // Home Page Hero
    hackathon_badge: 'UNESCO Global MIL Youth Hackathon 2026',
    hero_title: 'Perisai Kognitif Berbasis AI untuk Generasi Penerus',
    hero_desc: 'Kuasai 12 sesat pikir retorika dan bias kognitif yang dimanfaatkan oleh algoritma pembuat kemarahan digital. Berlatihlah di Dojo, taklukkan Tantangan 60 Detik, dan lindungi penjelajahan web Anda dengan Perisai Browser.',
    hero_cta_arena: 'Mainkan Arena Deteksi',
    hero_cta_gauntlet: 'Tantangan 60 Detik',
    hero_cta_skills: 'Pohon Keterampilan',
    hero_cta_extension: 'Pasang Ekstensi Chrome',
    metrics_archetypes: 'Arketipe Bergambar',
    metrics_framework: 'Kerangka Kerja UNESCO',
    metrics_latency: 'Latensi Gemini Flash',

    // Codex Section
    codex_badge: 'Dojo Pembelajaran Interaktif',
    codex_title: 'Kodeks Bergambar: Sesat Pikir & Bias Kognitif',
    codex_desc: 'Terinspirasi oleh yourlogicalfallacyis.com. Ketuk kartu untuk membalik dan mempelajari anatomi psikologisnya.',
    search_placeholder: 'Cari sesat pikir (contoh: takut, scam, halo)...',
    cat_all: 'Semua',
    cat_logic: 'Logika',
    cat_emotional: 'Emosional',
    cat_attribution: 'Atribusi',
    cat_cognitive: 'Kognitif',
    cat_scam: 'Penipuan',
    card_tap_front: 'Ketuk untuk membalik anatomi',
    card_tap_back: 'Ketuk untuk kembali',
    card_viral_scenario: 'Contoh Skenario Viral:',
    card_reflection: 'Pertanyaan Refleksi Metakognitif:',
    card_sandbox_btn: 'Uji di Sandbox',

    // Gauntlet
    gauntlet_badge: 'Mode Bertahan Cepat 60 Detik',
    gauntlet_title: 'Tantangan Bias Harian',
    gauntlet_desc: 'Uji refleks kognitif Anda. Anda memiliki 60 detik untuk menyortir judul berita menjadi Sesat Pikir, Berita Faktual, atau Penipuan. Kumpulkan kombo untuk poin maksimal.',
    gauntlet_rules_title: 'Aturan Permainan:',
    gauntlet_rule_1: 'Kecepatan 60 Detik: Sortir klaim sebelum waktu habis.',
    gauntlet_rule_2: 'Poin Kombo: Pengali 2x, 3x, dan 4x untuk jawaban benar beruntun.',
    gauntlet_rule_3: 'Sertifikat Resmi: Skor tinggi membuka Sertifikat UNESCO Anda.',
    gauntlet_start_btn: 'Mulai Tantangan 60 Detik',
    gauntlet_time_up: 'Waktu Tantangan Habis',
    gauntlet_perf_sub: 'Hasil Refleks Kognitif 60 Detik',
    gauntlet_accuracy: 'Akurasi',
    gauntlet_sorted: 'Klaim Tersortir',
    gauntlet_claim_cert: 'Klaim Sertifikat',
    gauntlet_replay: 'Mainkan Lagi',
    btn_fallacy: 'SESAT PIKIR / BIAS',
    btn_factual: 'LAPORAN FAKTUAL',
    btn_scam: 'PENIPUAN / JEBAKAN',

    // Footer
    footer_desc: 'Ekosistem literasi media dan informasi akses terbuka yang memadukan pengondisian kognitif berbasis permainan dengan perlindungan peramban web langsung. Dibuat untuk UNESCO Global MIL Youth Hackathon 2026.',
    footer_train_title: 'Permainan Latihan',
    footer_prog_title: 'Perkembangan & Peringkat',
    footer_eco_title: 'Ekosistem',
    footer_copy: '2026 Proyek VeriLens • Dikembangkan untuk UNESCO Global MIL Youth Hackathon',
    footer_privacy_note: 'Sumber Terbuka • Pemrosesan Lokal Ramah Privasi'
  }
};

export const INDONESIAN_FALLACIES = {
  ad_hominem: {
    name: 'Serangan Pribadi (Ad Hominem)',
    subtitle: 'Menyerang karakter pribadi daripada substansi argumen',
    description: 'Alih-alih menanggapi data atau argumen rasional lawan, pelaku menyerang karakter moral, penampilan, atau motif pribadi lawan untuk mendiskreditkannya di mata publik.',
    viral_example: '"Jangan percaya laporan inflasi ekonom itu—dia mengendarai mobil mewah dan jelas antek korporat!"',
    reflection_prompt: 'Apakah karakter atau motif pribadi pembicara membatalkan kebenaran data empiris yang disajikannya?'
  },
  false_dilemma: {
    name: 'Dilema Palsu (Dikotomi Semu)',
    subtitle: 'Menyederhanakan masalah kompleks menjadi dua pilihan ekstrem',
    description: 'Menghadirkan situasi seolah-olah hanya ada dua alternatif yang saling bertentangan, padahal sebenarnya terdapat berbagai kompromi dan jalan tengah bernuansa.',
    viral_example: '"Pilihannya hanya dua: dukung undang-undang pengawasan siber ini, atau Anda mendukung teroris!"',
    reflection_prompt: 'Opsi ketiga atau kompromi apa yang sengaja disembunyikan oleh penyusun narasi ini?'
  },
  ad_metum: {
    name: 'Eksploitasi Rasa Takut (Appeal to Fear)',
    subtitle: 'Memanfaatkan kepanikan akut untuk mematikan nalar kritis',
    description: 'Menciptakan skenario kiamat yang dilebih-lebihkan untuk memicu kepanikan primal pembaca, sehingga mereka mengambil tindakan terburu-buru tanpa memverifikasi fakta.',
    viral_example: '"Jika kebijakan pajak baru disahkan, seluruh tabungan pensiun Anda akan lenyap bulan depan!"',
    reflection_prompt: 'Apakah saya bereaksi berdasarkan bukti data nyata, atau karena rasa takut akut yang sengaja dipicu?'
  },
  confirmation_bias: {
    name: 'Bias Konfirmasi',
    subtitle: 'Hanya mempercayai data yang mendukung keyakinan awal',
    description: 'Kecenderungan psikologis untuk mencari, menafsirkan, dan mengingat informasi yang memperkuat prasangka pribadi sembari mengabaikan bukti yang membantahnya.',
    viral_example: '"Saya tahu vaksin ini bermasalah karena satu postingan blog ini membuktikannya, abaikan 50 studi medis lainnya."',
    reflection_prompt: 'Apakah saya bersedia menguji fakta yang bertentangan dengan preferensi ideologis saya?'
  },
  weasel_words: {
    name: 'Kata Mengelak (Weasel Words)',
    subtitle: 'Klaim samar tanpa rujukan institusi yang dapat diverifikasi',
    description: 'Menggunakan frasa anonim seperti "para ahli menyatakan" atau "banyak orang mengatakan" untuk menciptakan ilusi konsensus tanpa menyebutkan sumber ilmiah aslinya.',
    viral_example: '"Para pakar terkemuka sepakat bahwa ramuan ini meningkatkan kecerdasan otak hingga 300%."',
    reflection_prompt: 'Siapa nama peneliti, institusi, dan jurnal ilmiah terbitan yang secara spesifik dirujuk?'
  },
  urgency_scarcity: {
    name: 'Urgensi Palsu & Jebakan Finansial',
    subtitle: 'Tekanan batas waktu semu untuk memicu tindakan gegabah',
    description: 'Menciptakan batas waktu darurat tiruan ("Klaim dalam 10 menit!") untuk memutus proses verifikasi rasional korban dan memaksakan transfer dana atau data pribadi.',
    viral_example: '"PERINGATAN AKUN: Dompet kripto Anda dibekukan! Klik tautan dalam 5 menit untuk menyelamatkan aset."',
    reflection_prompt: 'Mengapa pihak ini memaksa saya bertindak dalam hitungan menit sebelum saya sempat memverifikasinya?'
  },
  strawman: {
    name: 'Argumen Orang-Orangan Sawah (Strawman)',
    subtitle: 'Mendistorsi posisi lawan agar lebih mudah diserang',
    description: 'Mengubah atau membesar-besarkan argumen lawan menjadi versi karikatur yang konyol, lalu menyerang karikatur tersebut seolah-olah itu adalah argumen aslinya.',
    viral_example: '"Pihak oposisi ingin memperbaiki transportasi umum karena mereka ingin melarang kepemilikan mobil pribadi!"',
    reflection_prompt: 'Apakah ini kutipan kata demi kata yang sebenarnya diucapkan oleh pembicara asli?'
  },
  bandwagon: {
    name: 'Efek Ikut-Ikutan (Bandwagon)',
    subtitle: 'Menganggap sesuatu benar hanya karena populer',
    description: 'Menyatakan bahwa suatu klaim pasti benar atau bernilai tinggi semata-mata karena telah dibagikan jutaan kali atau diikuti oleh banyak orang.',
    viral_example: '"100.000 orang sudah bergabung dalam skema investasi ini minggu ini, tidak mungkin semuanya salah!"',
    reflection_prompt: 'Apakah popularitas dan jumlah penonton di media sosial menjamin keabsahan fakta ilmiah?'
  },
  sunk_cost: {
    name: 'Jebakan Biaya Hangus (Sunk Cost Fallacy)',
    subtitle: 'Bertahan pada kesalahan karena sudah terlanjur berinvestasi',
    description: 'Melanjutkan komitmen pada keyakinan atau aset yang terbukti merugi semata-mata karena sudah mengorbankan banyak waktu, uang, atau emosi di masa lalu.',
    viral_example: '"Saya sudah rugi $5.000 pada token kripto ini, saya harus menambah dana lagi agar tidak rugi total."',
    reflection_prompt: 'Jika saya memulai hari ini tanpa beban masa lalu, apakah saya tetap mengambil keputusan ini?'
  },
  halo_effect: {
    name: 'Efek Halo',
    subtitle: 'Memindahkan reputasi bidang lain ke klaim yang tidak relevan',
    description: 'Mengasumsikan bahwa seseorang yang sukses di suatu bidang (misalnya olahraga atau akting) otomatis memiliki otoritas ilmiah dalam bidang kesehatan atau ekonomi.',
    viral_example: '"Aktor pemenang piala Oscar ini merekomendasikan diet mineral ini, jadi pasti aman dan terbukti secara medis."',
    reflection_prompt: 'Apakah figur publik ini memiliki sertifikasi ilmiah dalam disiplin ilmu yang dibicarakannya?'
  },
  cherry_picking: {
    name: 'Memilih Sepihak (Cherry Picking)',
    subtitle: 'Mengambil sebagian kecil data dan menyembunyikan gambaran utuh',
    description: 'Secara selektif hanya menampilkan anomali data yang menguntungkan narasi pribadi sembari menyembunyikan tren agregat jangka panjang yang membantahnya.',
    viral_example: '"Suhu kota ini turun minggu ini, membuktikan bahwa pemanasan global selama 50 tahun adalah rekayasa."',
    reflection_prompt: 'Bagaimana tren statistik rata-rata jangka panjang jika dilihat dari seluruh kumpulan data?'
  },
  conspiracy_framing: {
    name: 'Pola Pikir Konspirasi (Suppression Myth)',
    subtitle: 'Membingkai ketiadaan bukti sebagai bukti adanya konspirasi',
    description: 'Menuduh bahwa fakta yang ditolak oleh komunitas ilmiah terjadi karena "media arus utama sengaja menyembunyikan kebenaran rahasia".',
    viral_example: '"Dokter tidak ingin Anda tahu obat alami ini karena mereka ingin menjual obat mahal. Sebarkan sebelum dihapus!"',
    reflection_prompt: 'Apakah ada mekanisme verifikasi independen yang dapat mengonfirmasi klaim ini?'
  }
};

export function getStoredLanguage() {
  if (typeof window === 'undefined') return 'en';
  return localStorage.getItem('verilens_lang') || 'en';
}

export function setStoredLanguage(lang) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('verilens_lang', lang);
  window.dispatchEvent(new Event('verilens_lang_updated'));
}

export function useTranslation() {
  const [lang, setLangState] = useState('en');

  useEffect(() => {
    setLangState(getStoredLanguage());
    function handleUpdate() {
      setLangState(getStoredLanguage());
    }
    window.addEventListener('verilens_lang_updated', handleUpdate);
    return () => window.removeEventListener('verilens_lang_updated', handleUpdate);
  }, []);

  const changeLanguage = (newLang) => {
    setStoredLanguage(newLang);
    setLangState(newLang);
  };

  const t = (key) => {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
  };

  return { t, lang, setLanguage: changeLanguage };
}
