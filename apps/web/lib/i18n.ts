'use client';

import { useState, useEffect } from 'react';

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'id', label: 'Indonesian', native: 'Bahasa Indonesia' },
  { code: 'es', label: 'Spanish', native: 'Español' },
  { code: 'fr', label: 'French', native: 'Français' },
  { code: 'zh', label: 'Chinese', native: '中文' }
];

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

    // Home Page Hero (Consumer Loss-Aversion Framing)
    hackathon_badge: 'Protect Your Attention & Sanity',
    hero_title: 'Your feed is engineered to make you furious, anxious, and easy to fool.',
    hero_desc: 'Algorithms weaponize psychological blindspots for ad revenue. In 60 seconds a day, train your cognitive reflexes to spot manipulation traps before they cost you your peace of mind.',
    hero_cta_primary: 'Test Your Defenses (60s Trial)',
    hero_cta_secondary: 'See How Traps Work ▾',
    hero_cta_arena: 'Play Spotter Arena',
    hero_cta_gauntlet: '60s Daily Gauntlet',
    hero_cta_skills: 'Skill Tree',
    hero_cta_extension: 'Get Chrome Extension',
    stat_faster_title: '70% Faster',
    stat_faster_desc: 'Fake outrage spreads 6x faster than factual reporting',
    stat_window_title: '<5 Seconds',
    stat_window_desc: 'The window an algorithm needs to trigger emotional hijacking',
    stat_local_title: '100% Local',
    stat_local_desc: 'Real-time protection processed privately in your browser',
    step1_badge: 'STEP 01',
    step1_title: 'Unmask the Bait',
    step1_desc: 'Learn the 24 exact psychological triggers scammers and ragebaiters use to bypass your rational filters.',
    step1_action: 'Inspect 24 Tactics ▾',
    step2_badge: 'STEP 02',
    step2_title: 'Pressure-Test Your Radar',
    step2_desc: 'Can you spot a fabricated claim in 5 seconds under timed stress? Find out before your feed fools you.',
    step2_action: 'Start 60s Speed Test',
    step3_badge: 'STEP 03',
    step3_title: 'Shield Your Live Browsing',
    step3_desc: 'Verify any controversial article or headline in 3 clicks with automated Stanford SIFT lateral investigation.',
    step3_action: 'Launch Sandbox',

    // Codex Section
    codex_badge: 'Interactive Learning Dojo',
    codex_title: 'The Illustrated Fallacy & Bias Codex (24 Archetypes)',
    codex_desc: 'Inspired by yourlogicalfallacyis.com. Tap any card to flip it and reveal the psychological anatomy.',
    search_placeholder: 'Search 24 fallacies (e.g. fear, scam, halo, ai, slope)...',
    cat_all: 'All',
    cat_logic: 'Logic',
    cat_emotional: 'Emotional',
    cat_attribution: 'Attribution',
    cat_cognitive: 'Cognitive',
    cat_scam: 'Scam',
    cat_dialectical: 'Dialectical',
    cat_relevance: 'Relevance',
    cat_presumption: 'Presumption',
    cat_ambiguity: 'Ambiguity',
    card_tap_front: 'Tap to flip anatomy',
    card_tap_back: 'Tap to flip back',
    card_viral_scenario: 'Viral Scenario:',
    card_reflection: 'Metacognition Prompt:',
    card_sandbox_btn: 'Sandbox',
    card_view_dossier: 'View Full Card ➔',
    codex_dossier_breadcrumb: 'Codex',
    codex_dossier_archetype_label: 'Archetype',
    codex_dossier_allegorical_title: 'Allegorical Symbolism & Anatomy',
    codex_dossier_allegorical_desc: 'How Renaissance masters codified this manipulation archetype into symbolic art.',
    codex_dossier_psychology_title: 'Why Your Brain Falls for This',
    codex_dossier_media_title: 'Viral Case Study & Media Breakdown',
    codex_dossier_sift_title: 'SIFT Lateral Defense Protocol',
    codex_dossier_try_sandbox_btn: 'Launch SIFT Sandbox Analyzer',
    codex_dossier_prev: 'Previous Archetype',
    codex_dossier_next: 'Next Archetype',
    codex_dossier_back_btn: 'Back to Codex',
    codex_case_studies_title: '5 Real-World Case Studies & Field Deconstructions',
    codex_case_studies_desc: 'How this fallacy manifests across politics, algorithms, corporate marketing, health, and workplace culture.',
    codex_claim_label: 'Deceptive Claim',
    codex_deconstruction_label: 'Manipulative Deconstruction',
    codex_correction_label: 'SIFT Lateral Correction',
    codex_share_whatsapp: 'Share on WhatsApp',
    codex_share_btn: 'Share this Card',
    share_modal_title: 'Share this Card',
    share_modal_desc: 'Share this fallacy breakdown with your friends and community to build collective media defense.',
    share_copy_link: 'Copy Direct Link',
    share_link_copied: 'Link Copied to Clipboard!',
    share_instagram_tip: 'Link copied! Paste it in your Instagram Bio, Story Link Sticker, or DM.',

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
    gauntlet_replay: 'Play Again',
    btn_fallacy: 'FALLACY / BIAS',
    btn_factual: 'FACTUAL REPORT',
    btn_scam: 'SCAM / PHISHING',

    // Arena Simulation
    arena_badge: 'UNESCO Cognitive Gym',
    arena_title: 'The Bias Spotter Arena',
    arena_desc: 'Put your critical thinking reflexes to the test! You will face 5 real-world viral scenarios (scams, outrage headlines, deepfake transcripts). Spot the underlying fallacy before the clock runs out.',
    arena_rules_title: 'Arena Rules:',
    arena_rule_1: '5 Micro-Rounds: One viral post or claim per round.',
    arena_rule_2: 'Streak Multipliers: Correct answers in a row boost your XP (1x, 2x, 3x).',
    arena_rule_3: 'Pedagogical Feedback: Learn the UNESCO SIFT move for every scenario.',
    arena_start_btn: 'Enter the Arena',
    arena_round_label: 'Round',
    arena_of_label: 'of',
    arena_round_title: 'Spot the Weaponized Bias',
    arena_streak: 'Streak',
    arena_medium: 'Medium:',
    arena_context: 'Context:',
    arena_correct_spot: 'CORRECT SPOT',
    arena_manipulation_missed: 'MANIPULATION MISSED',
    arena_sift_label: 'UNESCO SIFT Lateral Move:',
    arena_next_btn: 'Next Scenario',
    arena_eval_btn: 'View Final Evaluation',
    arena_finished_badge: 'ARENA FINISHED',
    arena_finished_title: 'Arena Challenge Complete!',
    arena_finished_desc: 'UNESCO Media & Information Literacy Assessment',
    arena_grade_label: 'Assigned Grade',
    arena_score_label: 'Total Score',
    arena_max_streak_label: 'Max Streak',
    arena_completed_label: 'Completed',
    arena_cert_btn: 'Claim UNESCO Certificate',
    arena_replay_btn: 'Play Another Round',
    arena_test_live_btn: 'Test Live Articles',
    rank_master: 'Master Critical Thinker',
    rank_proficient: 'Proficient Fact-Checker',
    rank_developing: 'Developing Analyst',

    // Certificate Modal
    cert_badge: 'UNESCO GLOBAL MIL YOUTH HACKATHON 2026',
    cert_title: 'Certificate of Cognitive Immunity',
    cert_subtitle: 'Official Media & Information Literacy Certification • SIFT Framework',
    cert_certifies_that: 'This certifies that',
    cert_body: 'Has successfully completed the assessment, demonstrating competence in detecting rhetorical fallacies, cognitive biases, emotional manipulation, and financial lures.',
    cert_score_label: 'Score',
    cert_accuracy_label: 'Accuracy',
    cert_issued_label: 'Issued',
    cert_verified_by: 'Verified by VeriLens Engine',
    cert_copy_btn: 'Copy Share Summary',
    cert_copied_btn: 'Copied to Clipboard!',
    cert_print_btn: 'Print / Save PDF',
    close_btn: 'Close',
    cert_share_text: 'I just earned my UNESCO Media Literacy Cognitive Immunity Certificate on VeriLens with {accuracy}% accuracy and {score} XP! Test your critical thinking: https://verilens.okihita.dev #UNESCO #MediaLiteracy #VeriLens2026',
    audio_toggle_on: 'Mute Sound Effects',
    audio_toggle_off: 'Enable Sound Effects',

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
    nav_codex: 'Kodeks',
    nav_sandbox: 'Sandbox',
    nav_classroom: 'Kelas Guru',
    nav_extension: 'Ekstensi Peramban',
    nav_trophy: 'Ruang Piala',
    nav_skills: 'Pohon Keterampilan',
    nav_league: 'Liga Global',
    nav_daily_gauntlet: 'Tantangan Harian',
    nav_spotter_arena: 'Arena Deteksi',
    nav_feed_sim: 'Simulator Beranda',
    nav_fallacy_forge: 'Laboratorium Narasi',
    nav_duel: 'Duel Kognitif 1v1',
    xp_label: 'XP',
    level_prefix: 'Tkt.',

    // Home Page Hero (Consumer Loss-Aversion Framing)
    hackathon_badge: 'Lindungi Perhatian & Ketenangan Pikiranmu',
    hero_title: 'Beranda kamu dirancang untuk membuatmu marah, cemas, dan mudah dimanipulasi.',
    hero_desc: 'Algoritma mengeksploitasi titik buta psikologis demi pendapatan iklan. Dalam 60 detik sehari, latih refleks kognitifmu untuk mengenali jebakan sebelum merugikan ketenangan pikiranmu.',
    hero_cta_primary: 'Uji Pertahananmu (Percobaan 60 Detik)',
    hero_cta_secondary: 'Lihat Cara Kerja Jebakan ▾',
    hero_cta_arena: 'Arena Deteksi',
    hero_cta_gauntlet: 'Tantangan 60 Detik',
    hero_cta_skills: 'Pohon Keterampilan',
    hero_cta_extension: 'Ekstensi Chrome',
    stat_faster_title: '70% Lebih Cepat',
    stat_faster_desc: 'Kemarahan palsu menyebar 6x lebih cepat dibanding laporan fakta',
    stat_window_title: '<5 Detik',
    stat_window_desc: 'Waktu yang dibutuhkan algoritma untuk membajak emosimu',
    stat_local_title: '100% Privat',
    stat_local_desc: 'Perlindungan real-time diproses aman langsung di browsermu',
    step1_badge: 'LANGKAH 01',
    step1_title: 'Bongkar Umpan Manipulasi',
    step1_desc: 'Pelajari 24 pemicu psikologis yang digunakan pembuat hoaks dan penipu untuk melewati filter rasionalmu.',
    step1_action: 'Periksa 24 Taktik ▾',
    step2_badge: 'LANGKAH 02',
    step2_title: 'Uji Radarmu di Bawah Tekanan',
    step2_desc: 'Bisakah kamu mengenali klaim palsu dalam 5 detik di bawah tekanan waktu? Cari tahu sebelum beranda mengecohmu.',
    step2_action: 'Mulai Uji Cepat 60 Detik',
    step3_badge: 'LANGKAH 03',
    step3_title: 'Lindungi Penjelajahan Web Langsung',
    step3_desc: 'Verifikasi artikel atau berita kontroversial dalam 3 klik dengan metode investigasi lateral Stanford SIFT.',
    step3_action: 'Buka Sandbox',

    // Codex Section
    codex_badge: 'Dojo Pembelajaran Interaktif',
    codex_title: 'Kodeks Bergambar: 24 Sesat Pikir & Bias Kognitif',
    codex_desc: 'Terinspirasi oleh yourlogicalfallacyis.com. Ketuk kartu untuk membalik dan mempelajari anatomi psikologisnya.',
    search_placeholder: 'Cari 24 sesat pikir (contoh: takut, scam, halo, ai, domino)...',
    cat_all: 'Semua',
    cat_logic: 'Logika',
    cat_emotional: 'Emosional',
    cat_attribution: 'Atribusi',
    cat_cognitive: 'Kognitif',
    cat_scam: 'Penipuan',
    cat_dialectical: 'Dialektika',
    cat_relevance: 'Relevansi',
    cat_presumption: 'Praduga',
    cat_ambiguity: 'Ambiguitas',
    card_tap_front: 'Ketuk untuk membalik anatomi',
    card_tap_back: 'Ketuk untuk kembali',
    card_viral_scenario: 'Contoh Skenario Viral:',
    card_reflection: 'Pertanyaan Refleksi Metakognitif:',
    card_sandbox_btn: 'Uji di Sandbox',
    card_view_dossier: 'Lihat Kartu Lengkap ➔',
    codex_dossier_breadcrumb: 'Kodeks',
    codex_dossier_archetype_label: 'Arketipe',
    codex_dossier_allegorical_title: 'Simbolisme & Anatomi Alegoris',
    codex_dossier_allegorical_desc: 'Bagaimana maestro Renaisans mengkodifikasi arketipe manipulasi ini menjadi seni simbolis.',
    codex_dossier_psychology_title: 'Mengapa Otak Terjebak Pola Ini',
    codex_dossier_media_title: 'Studi Kasus Viral & Analisis Media',
    codex_dossier_sift_title: 'Protokol Pertahanan Lateral SIFT',
    codex_dossier_try_sandbox_btn: 'Buka Penganalisis Sandbox SIFT',
    codex_dossier_prev: 'Arketipe Sebelumnya',
    codex_dossier_next: 'Arketipe Berikutnya',
    codex_dossier_back_btn: 'Kembali ke Kodeks',
    codex_case_studies_title: '5 Studi Kasus Nyata & Dekonstruksi Lapangan',
    codex_case_studies_desc: 'Bagaimana sesat pikir ini muncul di ranah politik, algoritma media sosial, pemasaran, kesehatan, dan tempat kerja.',
    codex_claim_label: 'Klaim Menyesatkan',
    codex_deconstruction_label: 'Dekonstruksi Manipulasi',
    codex_correction_label: 'Koreksi Lateral SIFT',
    codex_share_whatsapp: 'Bagikan di WhatsApp',
    codex_share_btn: 'Bagikan Kartu Ini',
    share_modal_title: 'Bagikan Kartu Ini',
    share_modal_desc: 'Bagikan analisis sesat pikir ini kepada teman dan komunitas untuk membangun pertahanan media kolektif.',
    share_copy_link: 'Salin Tautan Langsung',
    share_link_copied: 'Tautan Berhasil Disalin!',
    share_instagram_tip: 'Tautan tersalin! Tempel di Bio, Stiker Tautan Cerita, atau DM Instagram Anda.',

    // Gauntlet
    gauntlet_badge: 'Mode Bertahan Cepat 60 Detik',
    gauntlet_title: 'Tantangan Bias Harian',
    gauntlet_desc: 'Uji refleks kognitifmu. Kamu memiliki 60 detik untuk menyortir judul berita menjadi Sesat Pikir, Berita Faktual, atau Penipuan. Kumpulkan kombo untuk poin maksimal.',
    gauntlet_rules_title: 'Aturan Permainan:',
    gauntlet_rule_1: 'Kecepatan 60 Detik: Sortir klaim sebelum waktu habis.',
    gauntlet_rule_2: 'Poin Kombo: Pengali 2x, 3x, dan 4x untuk jawaban benar beruntun.',
    gauntlet_rule_3: 'Sertifikat Resmi: Skor tinggi membuka Sertifikat UNESCO-mu.',
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

    // Arena Simulation
    arena_badge: 'Sasana Kognitif UNESCO',
    arena_title: 'Arena Deteksi Bias',
    arena_desc: 'Uji refleks berpikir kritismu! Kamu akan menghadapi 5 skenario viral nyata (penipuan, judul umpan amarah, transkrip deepfake). Temukan sesat pikir yang tersembunyi.',
    arena_rules_title: 'Aturan Arena:',
    arena_rule_1: '5 Ronde Mikro: Satu unggahan atau klaim viral per ronde.',
    arena_rule_2: 'Pengali Beruntun: Jawaban benar beruntun melipatgandakan XP-mu (1x, 2x, 3x).',
    arena_rule_3: 'Umpan Balik Edukatif: Pelajari langkah investigasi lateral UNESCO SIFT di setiap skenario.',
    arena_start_btn: 'Masuk ke Arena',
    arena_round_label: 'Ronde',
    arena_of_label: 'dari',
    arena_round_title: 'Kenali Bias Manipulatif',
    arena_streak: 'Kombo',
    arena_medium: 'Media:',
    arena_context: 'Konteks:',
    arena_correct_spot: 'DETEKSI TEPAT',
    arena_manipulation_missed: 'MANIPULASI TERLEWAT',
    arena_sift_label: 'Langkah Investigasi Lateral UNESCO SIFT:',
    arena_next_btn: 'Skenario Berikutnya',
    arena_eval_btn: 'Lihat Evaluasi Akhir',
    arena_finished_badge: 'ARENA SELESAI',
    arena_finished_title: 'Tantangan Arena Tuntas!',
    arena_finished_desc: 'Penilaian Literasi Media & Informasi UNESCO',
    arena_grade_label: 'Predikat Analisis',
    arena_score_label: 'Total Skor',
    arena_max_streak_label: 'Kombo Maksimal',
    arena_completed_label: 'Selesai',
    arena_cert_btn: 'Klaim Sertifikat UNESCO',
    arena_replay_btn: 'Mainkan Ronde Baru',
    arena_test_live_btn: 'Uji Artikel Langsung',
    rank_master: 'Pakar Pemikir Kritis',
    rank_proficient: 'Pemeriksa Fakta Mahir',
    rank_developing: 'Analis Berkembang',

    // Certificate Modal
    cert_badge: 'HACKATHON PEMUDA MIL GLOBAL UNESCO 2026',
    cert_title: 'Sertifikat Kekebalan Kognitif',
    cert_subtitle: 'Sertifikasi Literasi Media & Informasi Resmi • Kerangka SIFT',
    cert_certifies_that: 'Dengan ini menerangkan bahwa',
    cert_body: 'Telah berhasil menyelesaikan evaluasi, membuktikan kompetensi kritis dalam mendeteksi sesat pikir retorika, bias kognitif, manipulasi emosional, dan jebakan finansial digital.',
    cert_score_label: 'Skor Poin',
    cert_accuracy_label: 'Akurasi',
    cert_issued_label: 'Diterbitkan',
    cert_verified_by: 'Terverifikasi oleh VeriLens Engine',
    cert_copy_btn: 'Salin Ringkasan Bagikan',
    cert_copied_btn: 'Tersalin ke Papan Klip!',
    cert_print_btn: 'Cetak / Simpan PDF',
    close_btn: 'Tutup',
    cert_share_text: 'Saya baru saja meraih Sertifikat Kekebalan Kognitif UNESCO di VeriLens dengan akurasi {accuracy}% dan {score} XP! Uji kemampuan literasi mediamu: https://verilens.okihita.dev #UNESCO #LiterasiMedia #VeriLens2026',
    audio_toggle_on: 'Bisukan Efek Suara',
    audio_toggle_off: 'Aktifkan Efek Suara',

    // Footer
    footer_desc: 'Ekosistem literasi media dan informasi akses terbuka yang memadukan pengondisian kognitif berbasis permainan dengan perlindungan peramban web langsung. Dibuat untuk UNESCO Global MIL Youth Hackathon 2026.',
    footer_train_title: 'Permainan Latihan',
    footer_prog_title: 'Perkembangan & Peringkat',
    footer_eco_title: 'Ekosistem',
    footer_copy: '2026 Proyek VeriLens • Dikembangkan untuk UNESCO Global MIL Youth Hackathon',
    footer_privacy_note: 'Sumber Terbuka • Pemrosesan Lokal Ramah Privasi'
  },

  es: {
    // Navigation
    brand_sub: 'UNESCO MIL 2026',
    nav_games: 'Juegos de Entrenamiento',
    nav_codex: 'Códice',
    nav_sandbox: 'Laboratorio',
    nav_classroom: 'Aula Virtual',
    nav_extension: 'Extensión Web',
    nav_trophy: 'Sala de Trofeos',
    nav_skills: 'Árbol de Habilidades',
    nav_league: 'Liga Global',
    nav_daily_gauntlet: 'Desafío Diario',
    nav_spotter_arena: 'Arena de Detección',
    nav_feed_sim: 'Simulador de Feed',
    nav_fallacy_forge: 'Forja de Falacias',
    nav_duel: 'Duelo Cognitivo 1v1',
    xp_label: 'XP',
    level_prefix: 'Niv.',

    // Home Page Hero (Consumer Loss-Aversion Framing)
    hackathon_badge: 'Protege Tu Atención y Serenidad',
    hero_title: 'Tu feed está diseñado para hacerte enfadar, dudar y caer en trampas.',
    hero_desc: 'Los algoritmos explotan tus sesgos psicológicos para monetizar tu atención. En 60 segundos al día, entrena tus reflejos para detectar manipulaciones antes de que afecten tu paz mental.',
    hero_cta_primary: 'Prueba Tus Defensas (60s)',
    hero_cta_secondary: 'Ver Cómo Funcionan ▾',
    hero_cta_arena: 'Arena de Detección',
    hero_cta_gauntlet: 'Desafío Diario 60s',
    hero_cta_skills: 'Habilidades',
    hero_cta_extension: 'Extensión Chrome',
    stat_faster_title: '70% Más Rápido',
    stat_faster_desc: 'La indignación falsa se propaga 6 veces más rápido que la verdad',
    stat_window_title: '<5 Segundos',
    stat_window_desc: 'El tiempo que necesita el algoritmo para manipular tus emociones',
    stat_local_title: '100% Local',
    stat_local_desc: 'Protección en tiempo real procesada de forma privada en tu navegador',
    step1_badge: 'PASO 01',
    step1_title: 'Desenmascara el Cebo',
    step1_desc: 'Conoce los 24 disparadores psicológicos que usan estafadores y creadores de bulos para burlar tu razón.',
    step1_action: 'Explorar 24 Tácticas ▾',
    step2_badge: 'PASO 02',
    step2_title: 'Pon a Prueba Tu Radar',
    step2_desc: '¿Puedes identificar un titular falso en 5 segundos bajo presión? Descúbrelo antes de que te engañen.',
    step2_action: 'Iniciar Prueba de 60s',
    step3_badge: 'PASO 03',
    step3_title: 'Protege Tu Navegación en Vivo',
    step3_desc: 'Verifica cualquier artículo o titular dudoso en 3 clics con el método lateral Stanford SIFT.',
    step3_action: 'Abrir Laboratorio',

    // Codex Section
    codex_badge: 'Dojo de Aprendizaje Interactivo',
    codex_title: 'Códice Ilustrado: 24 Falacias y Sesgos Cognitivos',
    codex_desc: 'Inspirado en yourlogicalfallacyis.com. Toca cualquier carta para voltearla y descubrir su anatomía psicológica.',
    search_placeholder: 'Buscar 24 falacias (ej. miedo, scam, halo, ai, pendiente)...',
    cat_all: 'Todas',
    cat_logic: 'Lógica',
    cat_emotional: 'Emocional',
    cat_attribution: 'Atribución',
    cat_cognitive: 'Cognitivo',
    cat_scam: 'Estafa',
    cat_dialectical: 'Dialéctica',
    cat_relevance: 'Relevancia',
    cat_presumption: 'Presunción',
    cat_ambiguity: 'Ambigüedad',
    card_tap_front: 'Toca para ver anatomía',
    card_tap_back: 'Toca para regresar',
    card_viral_scenario: 'Escenario Viral:',
    card_reflection: 'Pregunta Metacognitiva:',
    card_sandbox_btn: 'Probar en Laboratorio',
    card_view_dossier: 'Ver Tarjeta Completa ➔',
    codex_dossier_breadcrumb: 'Códice',
    codex_dossier_archetype_label: 'Arquetipo',
    codex_dossier_allegorical_title: 'Simbolismo y Anatomía Alegórica',
    codex_dossier_allegorical_desc: 'Cómo los maestros del Renacimiento codificaron este arquetipo de manipulación en arte simbólico.',
    codex_dossier_psychology_title: 'Por qué el cerebro cae en esta trampa',
    codex_dossier_media_title: 'Estudio de Caso Viral y Análisis de Medios',
    codex_dossier_sift_title: 'Protocolo de Defensa Lateral SIFT',
    codex_dossier_try_sandbox_btn: 'Iniciar Analizador Sandbox SIFT',
    codex_dossier_prev: 'Arquetipo Anterior',
    codex_dossier_next: 'Arquetipo Siguiente',
    codex_dossier_back_btn: 'Volver al Códice',
    codex_case_studies_title: '5 Estudios de Caso Reales y Deconstrucciones de Campo',
    codex_case_studies_desc: 'Cómo se manifiesta esta falacia en la política, los algoritmos, el marketing corporativo, la salud y la cultura laboral.',
    codex_claim_label: 'Afirmación Engañosa',
    codex_deconstruction_label: 'Deconstrucción Manipulativa',
    codex_correction_label: 'Corrección Lateral SIFT',
    codex_share_whatsapp: 'Compartir en WhatsApp',
    codex_share_btn: 'Compartir esta Tarjeta',
    share_modal_title: 'Compartir esta Tarjeta',
    share_modal_desc: 'Comparte este desglose de falacias con tus amigos y comunidad para construir una defensa mediática colectiva.',
    share_copy_link: 'Copiar Enlace Directo',
    share_link_copied: '¡Enlace Copiado al Portapapeles!',
    share_instagram_tip: '¡Enlace copiado! Pégalo en tu biografía, sticker de enlace en Stories o DM de Instagram.',

    // Gauntlet
    gauntlet_badge: 'Modo Supervivencia Contrarreloj (60s)',
    gauntlet_title: 'El Desafío Diario de Sesgos',
    gauntlet_desc: 'Pon a prueba tus reflejos cognitivos. Tienes 60 segundos para clasificar titulares en Falacia, Factual o Estafa.',
    gauntlet_rules_title: 'Reglas del Desafío:',
    gauntlet_rule_1: 'Velocidad en 60s: Clasifica antes de que se agote el tiempo.',
    gauntlet_rule_2: 'Multiplicadores: 2x, 3x y 4x por rachas consecutivas acertadas.',
    gauntlet_rule_3: 'Certificación: Obtén puntuaciones altas para desbloquear tu Certificado UNESCO.',
    gauntlet_start_btn: 'Iniciar Desafío 60s',
    gauntlet_time_up: 'Tiempo Agotado',
    gauntlet_perf_sub: 'Rendimiento de Reflejos Cognitivos en 60 Segundos',
    gauntlet_accuracy: 'Precisión',
    gauntlet_sorted: 'Titulares Evaluados',
    gauntlet_claim_cert: 'Reclamar Certificado',
    gauntlet_replay: 'Jugar de Nuevo',
    btn_fallacy: 'FALACIA / SESGO',
    btn_factual: 'REPORTE FACTUAL',
    btn_scam: 'ESTAFA / PHISHING',

    // Arena Simulation
    arena_badge: 'Gimnasio Cognitivo UNESCO',
    arena_title: 'Arena de Detección de Sesgos',
    arena_desc: '¡Pon a prueba tus reflejos de pensamiento crítico! Enfrentarás 5 escenarios virales reales (estafas, titulares de indignación, transcripciones deepfake). Detecta la falacia antes de que termine el tiempo.',
    arena_rules_title: 'Reglas de la Arena:',
    arena_rule_1: '5 Microrondas: Una publicación o afirmación viral por ronda.',
    arena_rule_2: 'Multiplicadores de Racha: Las respuestas correctas consecutivas aumentan tus XP (1x, 2x, 3x).',
    arena_rule_3: 'Retroalimentación Pedagógica: Aprende el movimiento lateral UNESCO SIFT para cada caso.',
    arena_start_btn: 'Entrar a la Arena',
    arena_round_label: 'Ronda',
    arena_of_label: 'de',
    arena_round_title: 'Detecta el Sesgo Manipulador',
    arena_streak: 'Racha',
    arena_medium: 'Medio:',
    arena_context: 'Contexto:',
    arena_correct_spot: 'DETECCIÓN CORRECTA',
    arena_manipulation_missed: 'MANIPULACIÓN NO DETECTADA',
    arena_sift_label: 'Movimiento Lateral UNESCO SIFT:',
    arena_next_btn: 'Siguiente Escenario',
    arena_eval_btn: 'Ver Evaluación Final',
    arena_finished_badge: 'ARENA FINALIZADA',
    arena_finished_title: '¡Desafío de Arena Completado!',
    arena_finished_desc: 'Evaluación de Alfabetización Mediática e Informacional de la UNESCO',
    arena_grade_label: 'Calificación Asignada',
    arena_score_label: 'Puntuación Total',
    arena_max_streak_label: 'Racha Máxima',
    arena_completed_label: 'Completado',
    arena_cert_btn: 'Reclamar Certificado UNESCO',
    arena_replay_btn: 'Jugar Otra Ronda',
    arena_test_live_btn: 'Probar Artículos Reales',
    rank_master: 'Pensador Crítico Maestro',
    rank_proficient: 'Verificador Competente',
    rank_developing: 'Analista en Desarrollo',

    // Certificate Modal
    cert_badge: 'HACKATHON JUVENIL GLOBAL UNESCO MIL 2026',
    cert_title: 'Certificado de Inmunidad Cognitiva',
    cert_subtitle: 'Certificación Oficial de Alfabetización Mediática e Informacional • Marco SIFT',
    cert_certifies_that: 'Se certifica que',
    cert_body: 'Ha completado exitosamente la evaluación, demostrando competencia crítica para detectar falacias retóricas, sesgos cognitivos, manipulación emocional y trampas financieras digitales.',
    cert_score_label: 'Puntuación',
    cert_accuracy_label: 'Precisión',
    cert_issued_label: 'Emitido',
    cert_verified_by: 'Verificado por VeriLens Engine',
    cert_copy_btn: 'Copiar Resumen para Compartir',
    cert_copied_btn: '¡Copiado al Portapapeles!',
    cert_print_btn: 'Imprimir / Guardar PDF',
    close_btn: 'Cerrar',
    cert_share_text: '¡Acabo de obtener mi Certificado de Inmunidad Cognitiva UNESCO en VeriLens con {accuracy}% de precisión y {score} XP! Pon a prueba tu pensamiento crítico: https://verilens.okihita.dev #UNESCO #AlfabetizacionMediatica #VeriLens2026',
    audio_toggle_on: 'Silenciar Efectos de Sonido',
    audio_toggle_off: 'Activar Efectos de Sonido',

    // Footer
    footer_desc: 'Ecosistema de alfabetización mediática e informacional que combina entrenamiento cognitivo gamificado con protección en tiempo real para el navegador. Desarrollado para el UNESCO Global MIL Youth Hackathon 2026.',
    footer_train_title: 'Juegos de Entrenamiento',
    footer_prog_title: 'Progreso y Niveles',
    footer_eco_title: 'Ecosistema',
    footer_copy: '2026 Proyecto VeriLens • Creado para el UNESCO Global MIL Youth Hackathon',
    footer_privacy_note: 'Código Abierto • Procesamiento Local y Privado'
  },

  fr: {
    // Navigation
    brand_sub: 'UNESCO MIL 2026',
    nav_games: 'Entraînement Cognitif',
    nav_codex: 'Codex',
    nav_sandbox: 'Laboratoire',
    nav_classroom: 'Espace Enseignant',
    nav_extension: 'Extension Navigateur',
    nav_trophy: 'Salle des Trophées',
    nav_skills: 'Arbre des Compétences',
    nav_league: 'Ligue Mondiale',
    nav_daily_gauntlet: 'Défi Quotidien',
    nav_spotter_arena: 'Arène de Détection',
    nav_feed_sim: 'Simulateur de Fil',
    nav_fallacy_forge: 'Forge à Sophismes',
    nav_duel: 'Duel Cognitif 1v1',
    xp_label: 'XP',
    level_prefix: 'Niv.',

    // Home Page Hero (Consumer Loss-Aversion Framing)
    hackathon_badge: 'Protégez Votre Attention et Votre Sérénité',
    hero_title: 'Votre fil d’actualité est conçu pour vous indigner et vous piéger.',
    hero_desc: 'Les algorithmes exploitent vos vulnérabilités cognitives pour générer des clics. En 60 secondes par jour, musclez vos réflexes pour déjouer les manipulations avant qu’elles ne volent votre temps.',
    hero_cta_primary: 'Tester Mes Réflexes (60s)',
    hero_cta_secondary: 'Comprendre les Pièges ▾',
    hero_cta_arena: 'Arène de Détection',
    hero_cta_gauntlet: 'Défi Quotidien 60s',
    hero_cta_skills: 'Compétences',
    hero_cta_extension: 'Extension Chrome',
    stat_faster_title: '70% Plus Rapide',
    stat_faster_desc: 'Les fausses indignations se propagent 6x plus vite que les faits',
    stat_window_title: '<5 Secondes',
    stat_window_desc: 'Le temps nécessaire à un algorithme pour détourner votre jugement',
    stat_local_title: '100% Local',
    stat_local_desc: 'Protection en temps réel traitée en toute confidentialité dans votre navigateur',
    step1_badge: 'ÉTAPE 01',
    step1_title: 'Démasquer l’Appât',
    step1_desc: 'Identifiez les 24 leviers psychologiques exploités par les créateurs de fake news pour tromper votre esprit critique.',
    step1_action: 'Explorer les 24 Tactiques ▾',
    step2_badge: 'ÉTAPE 02',
    step2_title: 'Mettre Votre Radar à l’Épreuve',
    step2_desc: 'Pouvez-vous détecter un faux titre en 5 secondes sous pression ? Testez-vous avant d’être manipulé.',
    step2_action: 'Lancer le Test Rapide',
    step3_badge: 'ÉTAPE 03',
    step3_title: 'Sécuriser Votre Navigation en Direct',
    step3_desc: 'Vérifiez n’importe quel article ou titre suspect en 3 clics grâce à la méthode latérale Stanford SIFT.',
    step3_action: 'Ouvrir le Laboratoire',

    // Codex Section
    codex_badge: 'Dojo d’Apprentissage Interactif',
    codex_title: 'Codex Illustré : 24 Sophismes & Biais Cognitifs',
    codex_desc: 'Inspiré de yourlogicalfallacyis.com. Cliquez sur une carte pour la retourner et explorer son anatomie cognitive.',
    search_placeholder: 'Rechercher 24 sophismes (ex: peur, arnaque, autorité, ia, pente)...',
    cat_all: 'Tous',
    cat_logic: 'Logique',
    cat_emotional: 'Émotionnel',
    cat_attribution: 'Attribution',
    cat_cognitive: 'Cognitif',
    cat_scam: 'Arnaque',
    cat_dialectical: 'Dialectique',
    cat_relevance: 'Pertinence',
    cat_presumption: 'Présomption',
    cat_ambiguity: 'Ambiguïté',
    card_tap_front: 'Cliquer pour voir l’anatomie',
    card_tap_back: 'Cliquer pour retourner',
    card_viral_scenario: 'Exemple Viral :',
    card_reflection: 'Question d’Auto-Évaluation :',
    card_sandbox_btn: 'Tester en Laboratoire',
    card_view_dossier: 'Voir la Carte Complète ➔',
    codex_dossier_breadcrumb: 'Codex',
    codex_dossier_archetype_label: 'Archétype',
    codex_dossier_allegorical_title: 'Symbolisme et Anatomie Allégorique',
    codex_dossier_allegorical_desc: 'Comment les maîtres de la Renaissance ont codifié cet archétype de manipulation en art symbolique.',
    codex_dossier_psychology_title: 'Pourquoi le cerveau tombe dans ce piège',
    codex_dossier_media_title: 'Étude de Cas Viral et Analyse des Médias',
    codex_dossier_sift_title: 'Protocole de Défense Latérale SIFT',
    codex_dossier_try_sandbox_btn: 'Lancer l\'Analyseur SIFT Sandbox',
    codex_dossier_prev: 'Archétype Précédent',
    codex_dossier_next: 'Archétype Suivant',
    codex_dossier_back_btn: 'Retour au Codex',
    codex_case_studies_title: '5 Études de Cas Réels et Déconstructions sur le Terrain',
    codex_case_studies_desc: 'Comment ce sophisme se manifeste dans la politique, les algorithmes, le marketing, la santé et le travail.',
    codex_claim_label: 'Affirmation Trompeuse',
    codex_deconstruction_label: 'Déconstruction Manipulatrice',
    codex_correction_label: 'Correction Latérale SIFT',
    codex_share_whatsapp: 'Partager sur WhatsApp',
    codex_share_btn: 'Partager cette Carte',
    share_modal_title: 'Partager cette Carte',
    share_modal_desc: 'Partagez cette analyse de sophisme avec vos amis et votre communauté pour renforcer l’esprit critique collectif.',
    share_copy_link: 'Copier le Lien Direct',
    share_link_copied: 'Lien Copié dans le Presse-papiers !',
    share_instagram_tip: 'Lien copié ! Collez-le dans votre bio, sticker de lien en Story ou DM Instagram.',

    // Gauntlet
    gauntlet_badge: 'Survie Chronométrée en 60 Secondes',
    gauntlet_title: 'Le Défi Quotidien des Biais',
    gauntlet_desc: 'Entraînez votre esprit critique. Vous avez 60 secondes pour catégoriser des titres en Sophisme, Fait ou Arnaque.',
    gauntlet_rules_title: 'Règles du Défi :',
    gauntlet_rule_1: 'Rapidité en 60s : Triez les affirmations avant la fin du compte à rebours.',
    gauntlet_rule_2: 'Combos : Multiplicateurs 2x, 3x et 4x pour les réponses correctes consécutives.',
    gauntlet_rule_3: 'Certification : Obtenez un score élevé pour débloquer votre Certificat UNESCO.',
    gauntlet_start_btn: 'Démarrer le Défi 60s',
    gauntlet_time_up: 'Temps Écoulé !',
    gauntlet_perf_sub: 'Performance des Réflexes Cognitifs en 60s',
    gauntlet_accuracy: 'Précision',
    gauntlet_sorted: 'Titres Évalués',
    gauntlet_claim_cert: 'Réclamer mon Certificat',
    gauntlet_replay: 'Rejouer',
    btn_fallacy: 'SOPHISME / BIAIS',
    btn_factual: 'RAPPORT FACTUEL',
    btn_scam: 'ARNAQUE / PHISHING',

    // Arena Simulation
    arena_badge: 'Gym Cognitive de l\'UNESCO',
    arena_title: 'Arène de Détection des Biais',
    arena_desc: 'Mets tes réflexes d\'esprit critique à l\'épreuve ! Tu feras face à 5 scénarios viraux réels (arnaques, titres sensationnalistes, faux contenus IA). Démasque le sophisme sous-jacent.',
    arena_rules_title: 'Règles de l\'Arène :',
    arena_rule_1: '5 Micro-Manches : Un post ou une affirmation virale par manche.',
    arena_rule_2: 'Multiplicateurs de Série : Les bonnes réponses consécutives augmentent tes XP (1x, 2x, 3x).',
    arena_rule_3: 'Pédagogie Active : Apprends le réflexe latéral UNESCO SIFT pour chaque situation.',
    arena_start_btn: 'Entrer dans l\'Arène',
    arena_round_label: 'Manche',
    arena_of_label: 'sur',
    arena_round_title: 'Repère le Biais Manipulateur',
    arena_streak: 'Série',
    arena_medium: 'Support :',
    arena_context: 'Contexte :',
    arena_correct_spot: 'DÉTECTION EXACTE',
    arena_manipulation_missed: 'MANIPULATION MANQUÉE',
    arena_sift_label: 'Réflexe Latéral UNESCO SIFT :',
    arena_next_btn: 'Scénario Suivant',
    arena_eval_btn: 'Voir le Bilan Final',
    arena_finished_badge: 'ARÈNE TERMINÉE',
    arena_finished_title: 'Défi de l\'Arène Terminé !',
    arena_finished_desc: 'Évaluation de l\'Éducation aux Médias et à l\'Information de l\'UNESCO',
    arena_grade_label: 'Mention Obtenue',
    arena_score_label: 'Score Total',
    arena_max_streak_label: 'Série Maximale',
    arena_completed_label: 'Complété',
    arena_cert_btn: 'Obtenir le Certificat UNESCO',
    arena_replay_btn: 'Rejouer une Manche',
    arena_test_live_btn: 'Tester des Articles Réels',
    rank_master: 'Maître de l\'Esprit Critique',
    rank_proficient: 'Vérificateur Confirmé',
    rank_developing: 'Analyste en Progression',

    // Certificate Modal
    cert_badge: 'HACKATHON MONDIAL JEUNESSE UNESCO EMI 2026',
    cert_title: 'Certificat d\'Immunité Cognitive',
    cert_subtitle: 'Certification Officielle en Éducation aux Médias et à l\'Information • Méthode SIFT',
    cert_certifies_that: 'Ce certificat atteste que',
    cert_body: 'A complété avec succès l\'évaluation, démontrant sa compétence à démasquer les sophismes rhétoriques, biais cognitifs, manipulations émotionnelles et arnaques financières.',
    cert_score_label: 'Score',
    cert_accuracy_label: 'Précision',
    cert_issued_label: 'Délivré le',
    cert_verified_by: 'Vérifié par VeriLens Engine',
    cert_copy_btn: 'Copier le Résumé de Partage',
    cert_copied_btn: 'Copié dans le Presse-papier !',
    cert_print_btn: 'Imprimer / Sauvegarder PDF',
    close_btn: 'Fermer',
    cert_share_text: 'Je viens d\'obtenir mon Certificat d\'Immunité Cognitive UNESCO sur VeriLens avec {accuracy}% de précision et {score} XP ! Teste ton esprit critique : https://verilens.okihita.dev #UNESCO #EMI #VeriLens2026',
    audio_toggle_on: 'Couper les Effets Sonores',
    audio_toggle_off: 'Activer les Effets Sonores',

    // Footer
    footer_desc: 'Écosystème éducatif d’Éducation aux Médias et à l’Information (EMI) combinant entraînement ludique et protection du navigateur en temps réel. Conçu pour le Hackathon Mondial UNESCO MIL Youth 2026.',
    footer_train_title: 'Jeux d’Entraînement',
    footer_prog_title: 'Progression & Rangs',
    footer_eco_title: 'Écosystème',
    footer_copy: 'Projet VeriLens 2026 • Développé pour le Hackathon Mondial UNESCO MIL',
    footer_privacy_note: 'Open Source • Traitement Local Respectueux de la Vie Privée'
  },

  zh: {
    // Navigation
    brand_sub: '联合国教科文组织 MIL 2026',
    nav_games: '训练游戏',
    nav_codex: '图鉴',
    nav_sandbox: '沙盒实验室',
    nav_classroom: '教师课堂',
    nav_extension: '浏览器插件',
    nav_trophy: '荣誉室',
    nav_skills: '技能树',
    nav_league: '全球天梯',
    nav_daily_gauntlet: '每日挑战',
    nav_spotter_arena: '识别竞技场',
    nav_feed_sim: '信息流模拟器',
    nav_fallacy_forge: '谬误工坊',
    nav_duel: '1v1 思辨对决',
    xp_label: '经验值',
    level_prefix: '等级',

    // Home Page Hero (Consumer Loss-Aversion Framing)
    hackathon_badge: '守护你的注意力与认知清醒',
    hero_title: '你的信息流正被算法精心设计，让你愤怒、焦虑且易受操纵。',
    hero_desc: '平台算法利用人性弱点收割广告收益。每天只需 60 秒，训练你的批判性思维反射，在虚假陷阱偷走你的理智与财产前识破套路。',
    hero_cta_primary: '测试你的认知防线 (60秒)',
    hero_cta_secondary: '查看套路运作方式 ▾',
    hero_cta_arena: '进入竞技场',
    hero_cta_gauntlet: '60秒每日速辨',
    hero_cta_skills: '技能树',
    hero_cta_extension: '获取浏览器插件',
    stat_faster_title: '传播快 70%',
    stat_faster_desc: '情绪化虚假信息比事实报道传播速度快 6 倍',
    stat_window_title: '<5 秒',
    stat_window_desc: '算法完成情绪绑架并引发冲动点击所需的极短窗口',
    stat_local_title: '100% 本地隐私',
    stat_local_desc: '所有分析均在浏览器端本地完成，绝不上传您的阅读隐私',
    step1_badge: '第一步',
    step1_title: '识破诱饵套路',
    step1_desc: '掌握造谣者和诈骗分子绕过理性防火墙所使用的 24 种心理操纵模式。',
    step1_action: '检阅 24 种操纵术 ▾',
    step2_badge: '第二步',
    step2_title: '高压实战雷达',
    step2_desc: '能否在 5 秒倒计时内识破虚假标题与诈骗诱饵？在被信息流欺骗前先完成自测。',
    step2_action: '开启 60 秒挑战',
    step3_badge: '第三步',
    step3_title: '实时浏览护盾',
    step3_desc: '借助斯坦福 SIFT 侧向核查法，只需 3 次点击即可核查任意争议文章。',
    step3_action: '启动沙盒',

    // Codex Section
    codex_badge: '交互式思维训练场',
    codex_title: '图解逻辑谬误与认知偏见图鉴 (24大经典模型)',
    codex_desc: '点击任意卡片即可翻转，深入探索其心理操控机制与应对反思。',
    search_placeholder: '搜索 24 种逻辑谬误 (如：恐惧、诈骗、滑坡、AI、权威)...',
    cat_all: '全部',
    cat_logic: '逻辑类',
    cat_emotional: '情绪煽动',
    cat_attribution: '归因偏见',
    cat_cognitive: '认知偏差',
    cat_scam: '网络诈骗',
    cat_dialectical: '论辩话术',
    cat_relevance: '关联性谬误',
    cat_presumption: '假定性谬误',
    cat_ambiguity: '歧义性谬误',
    card_tap_front: '点击翻转查看剖析',
    card_tap_back: '点击返回',
    card_viral_scenario: '典型网络案例：',
    card_reflection: '元认知反思提问：',
    card_sandbox_btn: '沙盒实测',
    card_view_dossier: '查看完整卡片 ➔',
    codex_dossier_breadcrumb: '法典',
    codex_dossier_archetype_label: '原型',
    codex_dossier_allegorical_title: '寓言象征与结构剖析',
    codex_dossier_allegorical_desc: '文艺复兴大师如何将这种操纵原型编码为象征艺术。',
    codex_dossier_psychology_title: '大脑为何会落入此陷阱',
    codex_dossier_media_title: '病毒式案例研究与媒体剖析',
    codex_dossier_sift_title: 'SIFT 侧向阅读防御协议',
    codex_dossier_try_sandbox_btn: '启动 SIFT 沙盒分析器',
    codex_dossier_prev: '上一个原型',
    codex_dossier_next: '下一个原型',
    codex_dossier_back_btn: '返回法典',
    codex_case_studies_title: '5个真实世界案例研究与现场剖析',
    codex_case_studies_desc: '这种谬误如何在政治、算法推荐、商业营销、健康医疗和职场文化中表现出来。',
    codex_claim_label: '欺骗性主张',
    codex_deconstruction_label: '操纵手法剖析',
    codex_correction_label: 'SIFT 侧向验证纠正',
    codex_share_whatsapp: '在 WhatsApp 上分享',
    codex_share_btn: '分享此卡片',
    share_modal_title: '分享此卡片',
    share_modal_desc: '与您的朋友和社群分享此谬误解析，共同构建媒介防护力。',
    share_copy_link: '复制直接链接',
    share_link_copied: '链接已复制到剪贴板！',
    share_instagram_tip: '链接已复制！粘贴到您的 Instagram 简介、快拍链接贴纸或私信中。',

    // Gauntlet
    gauntlet_badge: '60秒极速生存挑战',
    gauntlet_title: '每日认知偏见速辨场',
    gauntlet_desc: '检验你的思维反射能力。你需要在 60 秒内将突发新闻标题归类为逻辑谬误、真实报道或网络诈骗。',
    gauntlet_rules_title: '挑战规则：',
    gauntlet_rule_1: '60秒倒计时：在时间耗尽前迅速做出判断。',
    gauntlet_rule_2: '连击倍率：连续答对可激活 2x、3x 及 4x 积分加成。',
    gauntlet_rule_3: '官方证书：获得高分即可解锁联合国教科文组织电子认证证书。',
    gauntlet_start_btn: '开始 60 秒挑战',
    gauntlet_time_up: '挑战时间到！',
    gauntlet_perf_sub: '60 秒认知决策评测结果',
    gauntlet_accuracy: '准确率',
    gauntlet_sorted: '已评估条目',
    gauntlet_claim_cert: '领取认证证书',
    gauntlet_replay: '再次挑战',
    btn_fallacy: '逻辑谬误 / 偏见',
    btn_factual: '真实客观报道',
    btn_scam: '虚假诈骗 / 钓鱼',

    // Arena Simulation
    arena_badge: '联合国教科文组织思维训练馆',
    arena_title: '偏见识别竞技场',
    arena_desc: '测试你的批判性思维反射！你将面临 5 个真实的网络病毒式传播案例（诈骗陷阱、情绪煽动标题、深度伪造文字）。在倒计时结束前识破潜藏的逻辑谬误。',
    arena_rules_title: '竞技场规则：',
    arena_rule_1: '5 个微回合：每轮分析一条真实热传言论或欺诈诱饵。',
    arena_rule_2: '连胜经验加成：连续答对可叠加经验翻倍奖励（1x、2x、3x）。',
    arena_rule_3: '实战启发：掌握针对每个场景的 UNESCO SIFT 横向核查法。',
    arena_start_btn: '进入竞技场',
    arena_round_label: '第',
    arena_of_label: '轮，共',
    arena_round_title: '识别武器化偏见',
    arena_streak: '连胜',
    arena_medium: '传播媒介：',
    arena_context: '背景语境：',
    arena_correct_spot: '准确识别',
    arena_manipulation_missed: '未识别出操纵',
    arena_sift_label: '教科文组织 SIFT 横向核查步骤：',
    arena_next_btn: '下一场景',
    arena_eval_btn: '查看最终评估',
    arena_finished_badge: '挑战完成',
    arena_finished_title: '竞技场挑战通关！',
    arena_finished_desc: '联合国教科文组织媒体与信息素养评估',
    arena_grade_label: '评定等级',
    arena_score_label: '总得分',
    arena_max_streak_label: '最高连胜',
    arena_completed_label: '完成进度',
    arena_cert_btn: '领取联合国教科文组织证书',
    arena_replay_btn: '再战一轮',
    arena_test_live_btn: '核查真实文章',
    rank_master: '批判性思维大师',
    rank_proficient: '熟练事实核查员',
    rank_developing: '进阶分析员',

    // Certificate Modal
    cert_badge: '2026 联合国教科文组织全球 MIL 青年黑客松',
    cert_title: '认知免疫官方认证证书',
    cert_subtitle: '官方媒体与信息素养认证 • 斯坦福 SIFT 侧向核查框架',
    cert_certifies_that: '特此证明',
    cert_body: '已圆满完成评估，展现出识别逻辑谬误、认知偏见、情绪操控及网络金融诈骗的卓越批判性思维素养。',
    cert_score_label: '总得分',
    cert_accuracy_label: '准确率',
    cert_issued_label: '签发日期',
    cert_verified_by: '由 VeriLens 引擎官方核验',
    cert_copy_btn: '复制分享文案',
    cert_copied_btn: '已复制到剪贴板！',
    cert_print_btn: '打印 / 保存为 PDF',
    close_btn: '关闭',
    cert_share_text: '我刚刚在 VeriLens 获得了联合国教科文组织认知免疫证书，准确率达 {accuracy}%，斩获 {score} XP！快来测试你的批判性思维：https://verilens.okihita.dev #UNESCO #媒体素养 #VeriLens2026',
    audio_toggle_on: '静音音效',
    audio_toggle_off: '开启音效',

    // Footer
    footer_desc: '面向全球青年的开源媒介与信息素养学习平台，融合游戏化思维训练与浏览器实时护盾技术。专为 2026 联合国教科文组织全球 MIL 青年黑客松打造。',
    footer_train_title: '思维训练',
    footer_prog_title: '段位与进阶',
    footer_eco_title: '生态体系',
    footer_copy: '2026 VeriLens 项目 • 专为联合国教科文组织全球 MIL 黑客松开发',
    footer_privacy_note: '开源软件 • 严格遵循本地隐私优先保护'
  }
};

export const INDONESIAN_FALLACIES = {
  ad_hominem: {
    name: 'Ad Hominem',
    subtitle: 'Menyerang Pribadi & Pengalihan Isu',
    description: 'Menyerang karakter, kepribadian, atau latar belakang lawan alih-alih membahas substansi argumen objektif mereka.',
    viral_example: '"Jangan percaya data iklim Dr. Aris—dia pernah dibayar perusahaan riset, jadi dia pasti boneka korup!"',
    reflection_prompt: 'Jika kamu mengabaikan hinaan pribadinya, data atau bukti nyata apa yang sebenarnya tersisa dari klaim tersebut?'
  },
  false_dilemma: {
    name: 'Dilema Palsu',
    subtitle: 'Dikotomi Hitam-Putih yang Dipaksakan',
    description: 'Menyederhanakan masalah kompleks menjadi hanya dua pilihan ekstrem, sambil menghilangkan alternatif jalan tengah.',
    viral_example: '"Pilihannya hanya dua: dukung RUU pengawasan ini 100%, atau kamu membiarkan teroris menyerang sekolah kita!"',
    reflection_prompt: 'Pilihan ketiga atau solusi kompromi apa yang sengaja disembunyikan oleh ultimatum ini?'
  },
  ad_metum: {
    name: 'Bujukan Rasa Takut',
    subtitle: 'Menakut-nakuti & Umpan Kiamat',
    description: 'Menggunakan prediksi bencana ekstrem untuk memicu kepanikan dan memaksa persetujuan tanpa verifikasi data.',
    viral_example: '"Jika perjanjian ini disahkan besok, ekonomi kita akan hancur total dan negara kita musnah dalam hitungan minggu!"',
    reflection_prompt: 'Apakah data ilmiah objektif benar-benar memprediksi hal ini, ataukah rasa takut sengaja dipakai untuk menakut-nakuti?'
  },
  confirmation_bias: {
    name: 'Bias Konfirmasi',
    subtitle: 'Gelembung Informasi Pribadi',
    description: 'Hanya mencari, mempercayai, dan mengingat informasi yang mendukung keyakinan awal kita sambil menolak data yang berlawanan.',
    viral_example: '"Saya mengabaikan 20 jurnal medis resmi dan hanya membaca 1 blog yang sependapat dengan teori saya!"',
    reflection_prompt: 'Apakah kamu bersedia mengubah pandangan jika disodorkan data kuat yang membuktikan sebaliknya?'
  },
  weasel_words: {
    name: 'Kata Mengelak (Weasel Words)',
    subtitle: 'Atribusi Samar Tanpa Pertanggungjawaban',
    description: 'Menciptakan ilusi dukungan otoritatif melalui frasa anonim dan mengambang seperti "para pakar memperingatkan".',
    viral_example: '"Semua ilmuwan terkemuka sepakat tanpa ragu bahwa bumbu dapur ini bisa membuang 100% racun tubuh!"',
    reflection_prompt: 'Lembaga penelitian atau jurnal medis mana yang secara spesifik disebutkan dalam teks tersebut?'
  },
  scam_urgency: {
    name: 'Rekayasa Urgensi Palsu',
    subtitle: 'Umpan Penipuan Panik Digital',
    description: 'Menciptakan rasa panik dengan batas waktu palsu agar korban segera mengklik tautan phishing tanpa berpikir panjang.',
    viral_example: '"PERINGATAN: Rekening bank kamu dibekukan! Klik tautan ini dalam 5 menit untuk verifikasi OTP atau dana kamu hilang!"',
    reflection_prompt: 'Lembaga resmi mana yang pernah meminta verifikasi data darurat melalui pesan acak dan tautan tidak resmi?'
  },
  strawman: {
    name: 'Manusia Jerami (Straw Man)',
    subtitle: 'Distorsi & Karikatur Argumen',
    description: 'Memutarbalikkan atau melebih-lebihkan argumen lawan agar terdengar konyol dan mudah diserang.',
    viral_example: '"Pihak lawan ingin mengurangi anggaran militer—itu artinya mereka ingin negara kita dijajah besok pagi!"',
    reflection_prompt: 'Apakah ini benar-benar posisi asli yang dipegang lawan, atau versi karikatur yang sengaja dibuat agar mudah dijatuhkan?'
  },
  bandwagon: {
    name: 'Efek Ikut-ikutan (Bandwagon)',
    subtitle: 'Tekanan Mayoritas & Validasi Sosial',
    description: 'Menganggap suatu klaim pasti benar hanya karena dipercayai atau diikuti oleh jutaan orang di media sosial.',
    viral_example: '"Lebih dari 10 juta orang sudah membagikan video ini di TikTok, jadi klaim ini tidak mungkin palsu!"',
    reflection_prompt: 'Apakah kebenaran suatu fakta ditentukan oleh jumlah like dan share, atau oleh bukti empiris?'
  },
  sunk_cost: {
    name: 'Bias Biaya Hangus (Sunk Cost)',
    subtitle: 'Terjebak Kerugian Masa Lalu',
    description: 'Terus melanjutkan proyek atau keputusan yang gagal hanya karena sudah terlanjur menginvestasikan banyak uang atau waktu.',
    viral_example: '"Kita sudah menghabiskan 50 miliar untuk aplikasi bermasalah ini, jadi kita harus tambah 20 miliar lagi daripada rugi!"',
    reflection_prompt: 'Jika kamu memulai dari nol hari ini tanpa beban masa lalu, apakah kamu tetap akan menginvestasikan uang ini?'
  },
  halo_effect: {
    name: 'Efek Halo',
    subtitle: 'Otoritas Semu & Kharisma Figur',
    description: 'Menganggap pendapat seorang selebriti atau tokoh terkenal pasti benar dalam bidang sains/medis di luar keahliannya.',
    viral_example: '"Aktor terkenal ini rutin meminum ramuan detoks ini setiap pagi, jadi suplemen ini terbukti 100% aman dan berkhasiat!"',
    reflection_prompt: 'Apakah figur tersebut memiliki kualifikasi medis atau ilmiah resmi dalam bidang yang ia bicarakan?'
  },
  cherry_picking: {
    name: 'Pemilihan Selektif (Cherry Picking)',
    subtitle: 'Penyembunyian Bukti & Data Parsial',
    description: 'Hanya memilih segelintir data yang cocok dengan narasi pribadi sambil sengaja menyembunyikan mayoritas fakta yang berlawanan.',
    viral_example: '"Pemanasan global itu hoaks! Lihat satu kota di Siberia ini yang suhunya rekor terdingin minggu lalu!"',
    reflection_prompt: 'Apakah anomali terisolasi ini mewakili tren agregat 50 tahun, atau sekadar data acak yang sengaja dipilih?'
  },
  conspiracy_framing: {
    name: 'Framing Konspirasi',
    subtitle: 'Mitos Pembungkaman Kebenaran',
    description: 'Mengklaim bahwa ketiadaan bukti justru merupakan bukti mutlak adanya konspirasi besar yang menutup-nutupinya.',
    viral_example: '"Media arus utama tidak akan memberitakan obat rahasia ini karena industri farmasi membayar triliunan agar kamu tetap sakit!"',
    reflection_prompt: 'Apakah hipotesis ini dirancang sedemikian rupa agar tidak pernah bisa dibantah oleh bukti apa pun?'
  },
  slippery_slope: {
    name: 'Lereng Licin (Slippery Slope)',
    subtitle: 'Efek Domino Bencana Tanpa Bukti',
    description: 'Menyatakan bahwa satu langkah kecil atau kebijakan awal pasti akan memicu rantai bencana ekstrem tanpa bukti kausal yang nyata.',
    viral_example: '"Jika kota ini menyetujui jalur sepeda 15 menit, langkah berikutnya adalah larangan bepergian dan penyitaan semua mobil pribadi!"',
    reflection_prompt: 'Apakah ada bukti rantai sebab-akibat yang nyata, ataukah ada pengabaian pos penjagaan dan pengawasan demokrasi di tengahnya?'
  },
  whataboutism: {
    name: 'Whataboutism (Tu Quoque)',
    subtitle: 'Pengalihan Isu dengan Menuduh Balik',
    description: 'Menangkis kritik yang sah dengan langsung menunjuk kesalahan pihak lain yang sama sekali tidak berhubungan.',
    viral_example: '"Kenapa media sibuk menyelidiki kebocoran data kami? Bagaimana dengan perusahaan asing yang membocorkan 100 juta akun tiga tahun lalu?!"',
    reflection_prompt: 'Apakah mengungkit kesalahan masa lalu pihak lain membantah bukti atas tuduhan saat ini?'
  },
  false_cause: {
    name: 'Sebab Palsu (Post Hoc)',
    subtitle: 'Korelasi Semu Dianggap Kausalitas',
    description: 'Menganggap bahwa karena peristiwa B terjadi setelah peristiwa A, maka A pasti merupakan penyebab langsung dari B.',
    viral_example: '"Kunjungan klinik melonjak tepat setelah menara sinyal baru dipasang bulan lalu, membuktikan radiasi merusak daya tahan tubuh!"',
    reflection_prompt: 'Apakah A benar-benar menyebabkan B secara ilmiah, ataukah itu sekadar kebetulan musiman atau faktor eksternal lainnya?'
  },
  false_authority: {
    name: 'Otoritas Palsu (Gelar Tak Relevan)',
    subtitle: 'Pemanfaatan Gelar di Luar Bidang Keahlian',
    description: 'Mengutip figur bergelar tinggi di satu bidang untuk memvalidasi klaim di bidang sains yang sama sekali tidak dikuasainya.',
    viral_example: '"Profesor teknik dirgantara ternama baru saja merilis blog yang mengklaim kolesterol tidak berdampak pada jantung!"',
    reflection_prompt: 'Apakah rekam jejak riset dan publikasi akademis pakar ini secara spesifik berada di bidang yang ia bicarakan?'
  },
  appeal_to_nature: {
    name: 'Bujukan Alami (Appeal to Nature)',
    subtitle: 'Kekeliruan Purity Kesehatan',
    description: 'Beranggapan bahwa segala sesuatu yang berlabel "alami" pasti aman dan manjur, sedangkan yang sintetis/laboratorium pasti beracun.',
    viral_example: '"Buang obat resep dokter kamu! Akar hutan liar ini 100% alami, bebas efek samping dan menyembuhkan penyakit jantung tuntas!"',
    reflection_prompt: 'Apakah bahan alami (seperti racun ular atau arsenik) selalu aman, dan apakah obat hasil uji klinis laboratorium selalu berbahaya?'
  },
  no_true_scotsman: {
    name: 'Bukan Orang Skotlandia Asli',
    subtitle: 'Perisai Kemurnian & Definisi yang Berubah',
    description: 'Melindungi klaim universal dari contoh nyata dengan mengubah definisi kelompok secara mendadak demi mendiskualifikasi bantahan.',
    viral_example: '"Jurnalis sejati tidak akan pernah mengkritik gerakan kami. Jika ada yang menulis investigasi buruk, dia bukan jurnalis sungguhan!"',
    reflection_prompt: 'Apakah definisi kelompok sengaja diubah semata-mata untuk menyingkirkan bukti nyata yang membantah klaim awal?'
  },
  anchoring_bias: {
    name: 'Bias Jangkar (Anchoring)',
    subtitle: 'Terpaku pada Angka Pertama',
    description: 'Terlalu mengandalkan angka atau informasi harga pertama yang dilihat saat menilai kelayakan atau nilai suatu hal.',
    viral_example: '"Kelas trading ini bernilai 100 juta menurut para ahli Wall Street, tapi khusus 2 jam ke depan cukup bayar 99 ribu!"',
    reflection_prompt: 'Apakah harga acuan awal tersebut merupakan harga riil pasar, atau sekadar jangkar buatan agar diskon terlihat fantastis?'
  },
  dunning_kruger: {
    name: 'Efek Dunning-Kruger',
    subtitle: 'Bias Kepercayaan Diri Pemula',
    description: 'Kondisi di mana orang dengan pengetahuan sangat minim merasa paling paham dan meremehkan para pakar berpengalaman.',
    viral_example: '"Saya sudah menonton 3 video di YouTube akhir pekan ini, sekarang saya jauh lebih paham kebijakan inflasi dibanding gubernur bank sentral!"',
    reflection_prompt: 'Apakah konsumsi konten kilat di internet cukup untuk menandingi metodologi riset dan pengalaman puluhan tahun para peneliti?'
  },
  hasty_generalization: {
    name: 'Generalisasi Terburu-buru',
    subtitle: 'Menyimpulkan dari Satu Contoh',
    description: 'Menarik kesimpulan umum yang mutlak mengenai suatu populasi atau teknologi hanya berdasarkan satu cerita atau video viral.',
    viral_example: '"Sepupu saya beli mobil listrik dan baterainya mogok saat cuaca dingin. Mobil listrik adalah penipuan total yang tak akan pernah berhasil!"',
    reflection_prompt: 'Apakah satu kejadian viral ini mewakili data performa agregat ribuan pengguna, atau sekadar sampel tunggal yang diekstrapolasi?'
  },
  circular_reasoning: {
    name: 'Penalaran Melingkar',
    subtitle: 'Argumen yang Mengasumsikan Dirinya Benar',
    description: 'Membangun argumen yang kesimpulannya sudah dijadikan premis dasar, sehingga berputar dalam lingkaran tanpa bukti independen.',
    viral_example: '"Kamu bisa mempercayai setiap bocoran dari akun anonim ini karena mereka hanya menyebarkan kebenaran, dan kita tahu itu benar karena akun ini yang mempostingnya!"',
    reflection_prompt: 'Apakah argumen ini menyajikan bukti eksternal dari pihak ketiga yang independen, atau hanya mengulang-ulang pernyataannya sendiri?'
  },
  in_group_bias: {
    name: 'Bias Kelompok Sendiri',
    subtitle: 'Standar Ganda Kita vs Mereka',
    description: 'Menilai tindakan kelompok sendiri selalu berlandaskan niat mulia, sambil menganggap tindakan yang sama dari lawan sebagai niat jahat.',
    viral_example: '"Ketika kubu kita menggunakan aturan darurat, itu adalah kepemimpinan tegas; ketika kubu lawan melakukannya, itu kudeta inkonstitusional!"',
    reflection_prompt: 'Apakah saya akan menilai kebijakan atau tindakan ini secara berbeda jika dilakukan oleh kubu yang berlawanan?'
  },
  liars_dividend: {
    name: 'Dividen Pembohong (AI Cynicism)',
    subtitle: 'Dalih AI untuk Menghindari Tanggung Jawab',
    description: 'Memanfaatkan ketakutan publik terhadap deepfake untuk membantah rekaman suara atau video nyata sebagai "rekayasa AI".',
    viral_example: '"Rekaman suara saya yang membahas suap itu 100% rekayasa AI deepfake buatan bot musuh! Jangan percaya telingamu!"',
    reflection_prompt: 'Apakah klaim deepfake tersebut didukung oleh bukti forensik digital, atau hanya dalih cepat untuk menutupi kesalahan yang terbongkar?'
  }
};

export const SPANISH_FALLACIES = {
  ad_hominem: {
    name: 'Ad Hominem',
    subtitle: 'Ataque Personal y Desvío de Atención',
    description: 'Atacar el carácter o los antecedentes del oponente en lugar de refutar los méritos de su argumento.',
    viral_example: '"No escuches los datos del Dr. Aris: una vez fue consultor, ¡es un títere corrupto!"',
    reflection_prompt: 'Si eliminas los insultos personales, ¿qué datos o pruebas reales quedan en la afirmación?'
  },
  false_dilemma: {
    name: 'Falso Dilema',
    subtitle: 'Dicotomía Forzada Blanco o Negro',
    description: 'Reducir un problema complejo a solo dos opciones extremas, borrando todos los puntos medios.',
    viral_example: '"O apoyas al 100% esta ley de vigilancia, ¡o estás a favor de que los terroristas ataquen!"',
    reflection_prompt: '¿Qué tercera o cuarta alternativa razonable está siendo deliberadamente ignorada?'
  },
  ad_metum: {
    name: 'Apelación al Miedo',
    subtitle: 'Catastrofismo y Manipulación Emocional',
    description: 'Usar predicciones apocalípticas para provocar pánico e inducir decisiones sin verificar hechos.',
    viral_example: '"Si se aprueba este tratado, ¡nuestra economía colapsará en semanas y habrá caos total!"',
    reflection_prompt: '¿La evidencia real respalda este escenario catastrófico o se usa el terror para manipularte?'
  },
  confirmation_bias: {
    name: 'Sesgo de Confirmación',
    subtitle: 'Burbuja de Autoengaño',
    description: 'Buscar y creer únicamente la información que confirma tus creencias previas e ignorar el resto.',
    viral_example: '"Ignoré 30 estudios científicos y solo leí el blog que concuerda con mi teoría."',
    reflection_prompt: '¿Estarías dispuesto a cambiar de opinión si te presentan evidencia sólida en contra?'
  },
  weasel_words: {
    name: 'Palabras Comadreja (Weasel Words)',
    subtitle: 'Atribución Vaga y Pasiva',
    description: 'Crear la ilusión de respaldo experto mediante frases anónimas como "los expertos advierten".',
    viral_example: '"¡Científicos de prestigio afirman sin dudas que esta especia elimina el 100% de las toxinas!"',
    reflection_prompt: '¿Qué universidad o estudio científico específico se nombra realmente en el texto?'
  },
  scam_urgency: {
    name: 'Urgencia Artificial (Phishing)',
    subtitle: 'Manipulación por Pánico Digital',
    description: 'Crear una falsa urgencia para que la víctima haga clic en enlaces fraudulentos sin pensar.',
    viral_example: '"¡ALERTA: Tu cuenta bancaria será cancelada en 5 minutos! Haz clic aquí para verificar tu clave."',
    reflection_prompt: '¿Algún banco legítimo exige claves urgentes mediante enlaces en mensajes informales?'
  },
  strawman: {
    name: 'Hombre de Paja',
    subtitle: 'Distorsión y Caricatura del Argumento',
    description: 'Caricaturizar o exagerar la postura del oponente para que parezca absurda y fácil de atacar.',
    viral_example: '"Quieren revisar el presupuesto de defensa; ¡eso significa que quieren que nos invadan mañana!"',
    reflection_prompt: '¿Es esta la postura real del oponente o una versión exagerada para desacreditarlo?'
  },
  bandwagon: {
    name: 'Efecto Arrastre (Bandwagon)',
    subtitle: 'Presión de Grupo y Aprobación Social',
    description: 'Creer que una afirmación es verdadera solo porque millones de personas la comparten en redes.',
    viral_example: '"Más de 5 millones de personas compartieron este video; ¡no puede ser falso!"',
    reflection_prompt: '¿La verdad de un hecho se mide por la cantidad de likes o por la evidencia científica?'
  },
  sunk_cost: {
    name: 'Costo Hundido',
    subtitle: 'Atrapado por Inversiones Pasadas',
    description: 'Continuar una mala decisión solo porque ya se ha invertido mucho tiempo o dinero en ella.',
    viral_example: '"Ya gastamos millones en este proyecto fallido; ¡tenemos que invertir más para no perderlo!"',
    reflection_prompt: 'Si empezaras de cero hoy, ¿volverías a invertir en este proyecto?'
  },
  halo_effect: {
    name: 'Efecto Halo',
    subtitle: 'Falsa Autoridad por Celebridad',
    description: 'Dar por válida la opinión de un famoso en materias médicas o científicas fuera de su especialidad.',
    viral_example: '"Este famoso actor toma este suplemento cada mañana, ¡así que está médicamente comprobado!"',
    reflection_prompt: '¿Tiene esa persona credenciales científicas formales en el tema del que opina?'
  },
  cherry_picking: {
    name: 'Selección Gratuita (Cherry Picking)',
    subtitle: 'Datos Sesgados y Ocultación de Pruebas',
    description: 'Seleccionar únicamente los datos que apoyan tu postura ocultando la inmensa mayoría de pruebas en contra.',
    viral_example: '"¡El cambio climático es un fraude! ¡Miren este pueblo donde hizo un frío récord el jueves!"',
    reflection_prompt: '¿Representa este dato aislado la tendencia climática global de los últimos 50 años?'
  },
  conspiracy_framing: {
    name: 'Encuadre Conspirativo',
    subtitle: 'El Mito de la Supresión',
    description: 'Afirmar que la falta total de pruebas es la demostración definitiva de que hay un complot para ocultarlas.',
    viral_example: '"¡Los medios no hablan de esta cura secreta porque las farmacéuticas pagan para mantenernos enfermos!"',
    reflection_prompt: '¿Está formulada esta teoría de modo que ninguna prueba en contra pueda jamás refutarla?'
  },
  slippery_slope: {
    name: 'Pendiente Resbaladiza',
    subtitle: 'El Efecto Dominó hacia el Desastre',
    description: 'Afirmar que un primer paso menor conducirá inevitablemente a una catástrofe extrema sin demostrar nexos causales.',
    viral_example: '"Si se aprueban las zonas de 15 minutos, ¡el siguiente paso será el confinamiento forzoso y confiscar los coches!"',
    reflection_prompt: '¿Existe una cadena causal comprobada o se están ignorando los controles democráticos intermedios?'
  },
  whataboutism: {
    name: 'Whataboutism (Y Tú Más)',
    subtitle: 'Desvío de Culpa y Falsa Hipocresía',
    description: 'Evadir una crítica legítima acusando inmediatamente al oponente de una falta del pasado no relacionada.',
    viral_example: '"¿Por qué investigan nuestra filtración? ¿Qué hay de la empresa extranjera que filtró 100 millones de datos?"',
    reflection_prompt: '¿El hecho de señalar los errores de otros responde o invalida las pruebas de la acusación actual?'
  },
  false_cause: {
    name: 'Causa Falsa (Post Hoc)',
    subtitle: 'Confundir Coincidencia con Causalidad',
    description: 'Asumir que porque el evento B ocurrió después del evento A, A fue la causa directa de B.',
    viral_example: '"Las visitas al médico aumentaron tras instalar la antena 5G: ¡las ondas están destruyendo las defensas!"',
    reflection_prompt: '¿Existe un mecanismo científico comprobado o se trata de una coincidencia estacional?'
  },
  false_authority: {
    name: 'Falsa Autoridad (Título Irrelevante)',
    subtitle: 'Extrapolación de Prestigio Profesional',
    description: 'Citar a alguien con título académico en un campo para respaldar afirmaciones en una disciplina ajena.',
    viral_example: '"Un catedrático de ingeniería aeroespacial afirma en su blog que el colesterol no daña el corazón."',
    reflection_prompt: '¿Tiene este experto formación médica e investigaciones publicadas en cardiología?'
  },
  appeal_to_nature: {
    name: 'Apelación a lo Natural',
    subtitle: 'La Falacia de la Pureza Natural',
    description: 'Asumir que todo lo natural es intrínsecamente seguro y bueno, y que todo lo de laboratorio es tóxico.',
    viral_example: '"¡Dejen sus pastillas recetadas! Esta raíz silvestre es 100% natural, cura el corazón y no tiene efectos secundarios."',
    reflection_prompt: '¿Son siempre seguros los venenos naturales y peligrosos los medicamentos con ensayos clínicos?'
  },
  no_true_scotsman: {
    name: 'Ningún Escocés Verdadero',
    subtitle: 'Definición Cambiante para Blindarse',
    description: 'Modificar arbitrariamente la definición de un grupo para excluir cualquier contraejemplo que desmienta una generalización.',
    viral_example: '"Un verdadero periodista jamás criticaría nuestra causa. Quien escribió esa nota no es un periodista ético."',
    reflection_prompt: '¿Se cambiaron las reglas de la definición únicamente para desacreditar una prueba incómoda?'
  },
  anchoring_bias: {
    name: 'Sesgo de Anclaje',
    subtitle: 'Fijación en la Primera Cifra',
    description: 'Depender en exceso del primer número o precio que se escucha al evaluar el valor real de algo.',
    viral_example: '"Este curso de criptomonedas está valorado en 10.000 dólares, ¡pero hoy te lo llevas por solo 97 dólares!"',
    reflection_prompt: '¿Es el precio inicial un valor real de mercado o un ancla inflada para simular una ganga?'
  },
  dunning_kruger: {
    name: 'Efecto Dunning-Kruger',
    subtitle: 'Sesgo de Exceso de Confianza del Novato',
    description: 'Fenómeno por el cual personas con escaso conocimiento en un tema complejo creen saber más que los especialistas.',
    viral_example: '"Vi tres videos este fin de semana y ahora entiendo la política monetaria mucho mejor que el banco central."',
    reflection_prompt: '¿Tengo la formación metodológica para refutar el consenso científico tras un consumo breve en internet?'
  },
  hasty_generalization: {
    name: 'Generalización Apresurada',
    subtitle: 'Conclusión Universal por un Caso Aislado',
    description: 'Extraer una conclusión absoluta sobre una tecnología o grupo basándose únicamente en una historia personal o video viral.',
    viral_example: '"A mi primo se le apagó la batería del coche eléctrico en invierno. ¡Los coches eléctricos son una estafa total!"',
    reflection_prompt: '¿Representa este caso aislado el comportamiento general de miles de usuarios o es solo una excepción?'
  },
  circular_reasoning: {
    name: 'Razonamiento Circular',
    subtitle: 'Petición de Principio y Argumento Tautológico',
    description: 'Construir un argumento cuya conclusión ya está asumida en la premisa, sin aportar pruebas externas independientes.',
    viral_example: '"Puedes confiar en esta cuenta porque solo dice la verdad absoluta, y sabemos que es verdad porque ellos lo publicaron."',
    reflection_prompt: '¿Aporta este argumento pruebas de terceros o simplemente se repite a sí mismo con otras palabras?'
  },
  in_group_bias: {
    name: 'Sesgo Endogrupal',
    subtitle: 'Doble Rasero: Nosotros contra Ellos',
    description: 'Juzgar siempre con benevolencia a los miembros del propio grupo y atribuir malas intenciones al rival por idéntica acción.',
    viral_example: '"Cuando nuestro partido usa decretos de urgencia es liderazgo valiente; cuando lo hace el rival es un golpe de estado."',
    reflection_prompt: '¿Juzgaría de forma diferente esta misma acción si la realizara una persona del bando opuesto?'
  },
  liars_dividend: {
    name: 'El Dividendo del Mentiroso',
    subtitle: 'Cinismo de Deepfake para Eludir Culpas',
    description: 'Aprovechar la existencia de la IA generativa para tachar de "deepfake falso" pruebas reales y auténticas de faltas cometidas.',
    viral_example: '"¡Ese audio donde se me escucha pidiendo comisiones es un deepfake generado por bots de IA! ¡No crean lo que oyen!"',
    reflection_prompt: '¿Aporta la persona pruebas forenses de que el material es sintético o es solo una excusa para evadir responsabilidades?'
  }
};

export const FRENCH_FALLACIES = {
  ad_hominem: {
    name: 'Ad Hominem',
    subtitle: 'Attaque Personnelle & Diversion',
    description: 'Attaquer la personne plutôt que d’examiner la rigueur factuelle de son argumentation.',
    viral_example: '"N’écoutez pas les données du Dr Aris : il a été consultant, c’est forcément un corrompu !"',
    reflection_prompt: 'Si l’on retire les attaques personnelles, quelles preuves empiriques subsistent dans son propos ?'
  },
  false_dilemma: {
    name: 'Faux Dilemme',
    subtitle: 'Dichotomie Forcée Noir ou Blanc',
    description: 'Réduire une question complexe à deux choix extrêmes en occultant toutes les nuances intermédiaires.',
    viral_example: '"Soit vous soutenez cette loi de surveillance à 100 %, soit vous soutenez les terroristes !"',
    reflection_prompt: 'Quelles alternatives ou compromis raisonnables cet ultimatum cherche-t-il à masquer ?'
  },
  ad_metum: {
    name: 'Appel à la Peur',
    subtitle: 'Alarmisme & Chantage Émotionnel',
    description: 'Brandir des menaces apocalyptiques pour court-circuiter l’esprit critique et forcer l’adhésion.',
    viral_example: '"Si ce traité est signé, notre économie s’effondrera en quelques semaines et ce sera le chaos total !"',
    reflection_prompt: 'Les données scientifiques prédisent-elles ce scénario ou la terreur est-elle utilisée comme levier ?'
  },
  confirmation_bias: {
    name: 'Biais de Confirmation',
    subtitle: 'Bulle d’Auto-Validation',
    description: 'Ne rechercher et ne retenir que les informations qui confortent ses convictions préalables.',
    viral_example: '"J’ai ignoré 50 études scientifiques pour ne lire que l’unique blog qui confirme ma théorie."',
    reflection_prompt: 'Seriez-vous prêt à changer d’avis face à des preuves solides et contradictoires ?'
  },
  weasel_words: {
    name: 'Mots d’Évitement (Weasel Words)',
    subtitle: 'Attribution Vague et Anonyme',
    description: 'Donner l’illusion d’une autorité scientifique par des tournures évasives ("les experts affirment").',
    viral_example: '"Des scientifiques renommés affirment sans doute que cette épice élimine 100 % des toxines !"',
    reflection_prompt: 'Quelle université ou étude évaluée par les pairs est concrètement citée dans le texte ?'
  },
  scam_urgency: {
    name: 'Fausse Urgence (Phishing)',
    subtitle: 'Panique Artificielle & Hameçonnage',
    description: 'Créer un sentiment d’urgence immédiat pour inciter la victime à cliquer sans réfléchir.',
    viral_example: '"URGENT : Votre compte bancaire sera bloqué dans 5 minutes ! Cliquez ici pour confirmer vos accès."',
    reflection_prompt: 'Une banque légitime demande-t-elle un mot de passe en urgence par un lien non sécurisé ?'
  },
  strawman: {
    name: 'Épouvantail (Homme de Paille)',
    subtitle: 'Caricature & Déformation',
    description: 'Déformer et exagérer les propos d’un adversaire pour les rendre ridicules et faciles à démolir.',
    viral_example: '"Ils veulent réévaluer le budget militaire : cela signifie qu’ils veulent que notre pays soit envahi demain !"',
    reflection_prompt: 'S’agit-il de la véritable position défendue ou d’une caricature délibérément affaiblie ?'
  },
  bandwagon: {
    name: 'Effet de Mode (Bandwagon)',
    subtitle: 'Pression Sociale & Conformisme',
    description: 'Prétendre qu’une idée est vraie uniquement parce que des millions de personnes la partagent en ligne.',
    viral_example: '"Plus de 10 millions de personnes ont partagé cette vidéo, c’est la preuve absolue que c’est vrai !"',
    reflection_prompt: 'La véracité d’un fait se mesure-t-elle au nombre de partages ou aux preuves vérifiables ?'
  },
  sunk_cost: {
    name: 'Coûts Irrécupérables',
    subtitle: 'Piège de l’Investissement Passé',
    description: 'Persister dans une voie vouée à l’échec uniquement parce qu’on y a déjà consacré du temps ou de l’argent.',
    viral_example: '"Nous avons déjà investi des millions dans ce projet raté, il faut continuer pour ne pas tout perdre !"',
    reflection_prompt: 'En repartant de zéro aujourd’hui, investiriez-vous à nouveau dans ce projet ?'
  },
  halo_effect: {
    name: 'Effet de Halo',
    subtitle: 'Faible Autorité & Séduction de Célébrité',
    description: 'Accorder une confiance aveugle à une célébrité sur un sujet médical ou scientifique hors de ses compétences.',
    viral_example: '"Cet acteur célèbre boit ce mélange chaque matin, c’est donc 100 % prouvé scientifiquement !"',
    reflection_prompt: 'Cette personnalité possède-t-elle des compétences scientifiques reconnues dans ce domaine ?'
  },
  cherry_picking: {
    name: 'Sélection Biaisée (Cherry Picking)',
    subtitle: 'Dissimulation de Preuves & Données Isolées',
    description: 'Ne retenir que les rares données arrangeantes en masquant la majorité écrasante des preuves contraires.',
    viral_example: '"Le réchauffement climatique est un canular ! Regardez cette ville qui a connu un froid record jeudi !"',
    reflection_prompt: 'Cette anecdote locale reflète-t-elle la tendance mondiale sur 50 ans ou une simple anomalie ?'
  },
  conspiracy_framing: {
    name: 'Cadrage Complotiste',
    subtitle: 'Le Mythe de la Vérité Censurée',
    description: 'Prétendre que l’absence totale de preuves est la preuve irréfutable d’un complot qui cherche à tout étouffer.',
    viral_example: '"Les médias refusent de parler de ce remède secret car l’industrie pharmaceutique paie pour nous garder malades !"',
    reflection_prompt: 'Cette hypothèse est-elle construite de façon à ce qu’aucune preuve ne puisse jamais la contredire ?'
  },
  slippery_slope: {
    name: 'Pente Savonneuse',
    subtitle: 'Effet Domino Catastrophiste',
    description: 'Prétendre qu’une première mesure modeste déclenchera inévitablement une chaîne de catastrophes sans lien prouvé.',
    viral_example: '"Si l’on valide les quartiers apaisés, la prochaine étape sera l’interdiction totale de circuler et la saisie des véhicules !"',
    reflection_prompt: 'Existe-t-il une démonstration de cause à effet rigoureuse ou ignore-t-on les garde-fous démocratiques ?'
  },
  whataboutism: {
    name: 'Whataboutisme (Et Vous Alors ?)',
    subtitle: 'Déviation d’Accusation et Faux Réciproque',
    description: 'Esquiver une critique légitime en dénonçant immédiatement une faute commise par un tiers.',
    viral_example: '"Pourquoi enquêter sur nos fuites de données ? Qu’en est-il de l’entreprise étrangère qui a perdu 100 millions de profils ?"',
    reflection_prompt: 'Le fait de pointer les torts d’autrui répond-il aux faits reprochés dans le dossier actuel ?'
  },
  false_cause: {
    name: 'Fausse Causalité (Post Hoc)',
    subtitle: 'Confusion entre Succession et Causalité',
    description: 'Déduire qu’un événement est la cause directe d’un autre simplement parce qu’il s’est produit juste avant.',
    viral_example: '"Les consultations médicales ont bondi après l’allumage de l’antenne 5G : les ondes détruisent notre santé !"',
    reflection_prompt: 'Existe-t-il un mécanisme biologique prouvé ou s’agit-il d’une coïncidence saisonnière ?'
  },
  false_authority: {
    name: 'Fausse Autorité (Titre Hors Sujet)',
    subtitle: 'Transfert Indu de Compétence Académique',
    description: 'Invoquer un titre prestigieux dans un domaine pour légitimer des affirmations dans une science sans rapport.',
    viral_example: '"Un célèbre professeur en ingénierie aérospatiale affirme sur son blog que le cholestérol ne bouche pas les artères."',
    reflection_prompt: 'Cet expert possède-t-il des publications scientifiques évaluées par les pairs en cardiologie ?'
  },
  appeal_to_nature: {
    name: 'Appel à la Nature',
    subtitle: 'Sophisme de la Pureté Naturelle',
    description: 'Considérer que tout ce qui est naturel est obligatoirement bon et sûr, et que le synthétique est toxique.',
    viral_example: '"Jetez vos médicaments ! Cette racine sauvage est 100 % naturelle, sans effets secondaires et guérit le cœur !"',
    reflection_prompt: 'Les poisons naturels sont-ils inoffensifs et les molécules de synthèse testées cliniquement dangereuses ?'
  },
  no_true_scotsman: {
    name: 'Aucun Vrai Écossais',
    subtitle: 'Bouclier de Pureté & Définition Mouvante',
    description: 'Modifier rétroactivement la définition d’un groupe pour exclure tout contre-exemple réfutant un dogme.',
    viral_example: '"Un vrai journaliste ne critiquerait jamais notre cause. Si ce reporter a écrit cet article, ce n’est pas un vrai journaliste."',
    reflection_prompt: 'A-t-on redéfini les critères uniquement pour écarter un fait qui dérangeait la thèse de départ ?'
  },
  anchoring_bias: {
    name: 'Biais d’Ancrage',
    subtitle: 'Focalisation sur la Première Valeur',
    description: 'Se fier excessivement à la première information chiffrée reçue lors d’une prise de décision financière.',
    viral_example: '"Cette formation en cryptomonnaies vaut 10 000 € selon les pros, mais elle est à 97 € pour 2 heures seulement !"',
    reflection_prompt: 'Le prix de référence correspond-il à une valeur réelle ou à un ancrage artificiel pour faire miroiter un rabais ?'
  },
  dunning_kruger: {
    name: 'Effet Dunning-Kruger',
    subtitle: 'Surconfiance et Aveuglement du Débutant',
    description: 'Biais par lequel des personnes peu informées sur un sujet complexe surestiment leurs connaissances face aux experts.',
    viral_example: '"J’ai regardé trois vidéos ce week-end et je maîtrise l’inflation bien mieux que les économistes de la banque centrale !"',
    reflection_prompt: 'Dispose-t-on des outils méthodologiques nécessaires pour contredire des spécialistes après quelques vidéos ?'
  },
  hasty_generalization: {
    name: 'Généralisation Hâtive',
    subtitle: 'Extrapolation Abusive d’un Cas Isolé',
    description: 'Tirer une conclusion définitive sur toute une technologie ou population à partir d’une seule mésaventure personnelle.',
    viral_example: '"Mon cousin a acheté une voiture électrique et la batterie s’est vidée en hiver. C’est une arnaque totale qui ne marchera jamais !"',
    reflection_prompt: 'Cette mésaventure isolée est-elle représentative des statistiques globales de millions d’utilisateurs ?'
  },
  circular_reasoning: {
    name: 'Raisonnement Circulaire',
    subtitle: 'Pétition de Principe et Boucle Tautologique',
    description: 'Construire un argument dont la conclusion est déjà sous-entendue dans la prémisse sans apporter de preuve indépendante.',
    viral_example: '"Vous pouvez faire confiance à ce compte anonyme car il ne dit que la vérité, et nous le savons car c’est lui qui l’affirme !"',
    reflection_prompt: 'L’argument fournit-il des éléments de corroboration extérieurs ou tourne-t-il simplement en rond ?'
  },
  in_group_bias: {
    name: 'Biais d’Appartenance (Eux contre Nous)',
    subtitle: 'Double Standard et Favoritisme Tribal',
    description: 'Pardonner systématiquement les dérives de son propre camp tout en diabolisant les mêmes actes chez les opposants.',
    viral_example: '"Quand notre parti utilise les procédures d’urgence, c’est du courage politique ; quand l’opposition le fait, c’est un coup d’État !"',
    reflection_prompt: 'Aurais-je le même jugement si cet acte précis avait été commis par le camp d’en face ?'
  },
  liars_dividend: {
    name: 'Le Dividende du Menteur',
    subtitle: 'Cynisme du Deepfake pour Fuir ses Responsabilités',
    description: 'Exploiter l’existence de l’IA pour qualifier de "faux deepfake" des preuves vidéo ou audio authentiques de mauvaise conduite.',
    viral_example: '"Cet enregistrement audio où je discute de pots-de-vin est un deepfake à 100 % créé par des bots IA étrangers !"',
    reflection_prompt: 'La personne apporte-t-elle des preuves d’expertise technique ou s’agit-il d’un prétexte pour esquiver la vérité ?'
  }
};

export const CHINESE_FALLACIES = {
  ad_hominem: {
    name: '人身攻击谬误 (Ad Hominem)',
    subtitle: '攻击动机与转移焦点',
    description: '不讨论论点的客观事实与证据，而是针对发言者的个人品格、背景或身份进行抹黑。',
    viral_example: '“别听阿里斯博士的气候数据，他以前拿过咨询公司的报酬，绝对是个被收买的骗子！”',
    reflection_prompt: '如果剔除人身侮辱与动机揣测，这项主张本身还剩下哪些真实客观的数据证据？'
  },
  false_dilemma: {
    name: '非黑即白谬误 (False Dilemma)',
    subtitle: '虚假二元对立与极端绑架',
    description: '将复杂多元的现实问题强行简化为非此即彼的两个极端选择，刻意抹杀中间路线。',
    viral_example: '“要么你百分之百支持这项法案，要么你就是故意纵容犯罪分子破坏我们的家园！”',
    reflection_prompt: '这项极端威胁刻意隐瞒了哪些合理的第三种选择或折中妥协方案？'
  },
  ad_metum: {
    name: '诉诸恐惧 (Appeal to Fear)',
    subtitle: '末日恐吓与情绪绑架',
    description: '利用骇人听闻的灾难预言激发人们的生存焦虑，逼迫受众在未经核实的情况下顺从。',
    viral_example: '“如果这项协议通过，我们的经济将在几周内彻底崩溃，社会将彻底毁灭！”',
    reflection_prompt: '真正的科学与数据是否支持这种末日推论，还是恐惧被用作强推观点的操纵工具？'
  },
  confirmation_bias: {
    name: '确认偏误 (Confirmation Bias)',
    subtitle: '信息茧房与偏听偏信',
    description: '只搜集、相信和传播能够印证自己既有偏见的信息，对相反的大量事实视而不见。',
    viral_example: '“我无视了 50 篇权威科学期刊的结论，只阅读那唯一一本支持我个人猜想的博客。”',
    reflection_prompt: '如果面对无可辩驳且经过同行评审的反面证据，你是否愿意修正自己的固有观念？'
  },
  weasel_words: {
    name: '含糊托词 (Weasel Words)',
    subtitle: '匿名虚假背书与模糊归因',
    description: '通过“专家警告”、“许多人都在说”等模糊措辞，制造拥有权威共识支持的虚假假象。',
    viral_example: '“顶级科学家一致明确指出：这种厨房调料能彻底排出人体 100% 的毒素！”',
    reflection_prompt: '正文中究竟指名道姓地提到了哪所大学、哪家科研机构或哪篇同行评审论文？'
  },
  scam_urgency: {
    name: '虚假紧迫感 (Scam Urgency)',
    subtitle: '恐慌诱导与钓鱼陷阱',
    description: '通过虚构账户冻结或法律风险制造恐慌，迫使受害者在慌乱中点击钓鱼恶意链接。',
    viral_example: '“【紧急警告】您的银行账户将在 5 分钟内被强制冻结！请立即点击此链接输入验证码解除！”',
    reflection_prompt: '正规金融或官方机构何时会通过非官方随机短信和未知链接要求输入敏感验证码？'
  },
  strawman: {
    name: '稻草人谬误 (Straw Man)',
    subtitle: '曲解观点与树敌攻击',
    description: '歪曲、夸大或断章取义对手的真实立场，制造一个荒谬脆弱的“假靶子”进行批判。',
    viral_example: '“他们建议调整开支预算，这分明就是想让我们明天就全面缴械投降！”',
    reflection_prompt: '这真的是对方的原意，还是被刻意扭曲成容易被批驳的极端版本？'
  },
  bandwagon: {
    name: '从众效应 (Bandwagon Effect)',
    subtitle: '多数绑架与羊群心理',
    description: '仅因某种观点被社交网络上海量人群点赞或转发，就盲目认定其一定是客观真理。',
    viral_example: '“全网已经有超过一千万人转发了这个视频，难道千万人都会搞错吗？肯定是真的！”',
    reflection_prompt: '事实的真伪是由客观证据决定的，还是由点赞和转发数量决定的？'
  },
  sunk_cost: {
    name: '沉没成本谬误 (Sunk Cost)',
    subtitle: '执迷不悟与沉没套牢',
    description: '仅仅因为过去已经投入了大量时间、金钱或精力，而继续坚持一项毫无前途的错误决策。',
    viral_example: '“我们已经在这个烂项目上花了五千万，必须再追加两千万，否则前面的钱全打水漂了！”',
    reflection_prompt: '如果今天从零开始重新评估，你还会为这个方向投入哪怕一分钱吗？'
  },
  halo_effect: {
    name: '光环效应 (Halo Effect)',
    subtitle: '跨界盲信与偶像崇拜',
    description: '因某位明星或名人在某个领域享有声誉，就盲目相信其在医学或科学等跨界领域的言论。',
    viral_example: '“这位著名影星每天早晨都喝这款排毒水，所以这个配方绝对百分之百科学有效！”',
    reflection_prompt: '该公众人物是否在其所推荐的医学或科学领域具备正规权威的专业资质？'
  },
  cherry_picking: {
    name: '幸存者偏差与证据筛选 (Cherry Picking)',
    subtitle: '隐瞒全貌与片面摘取',
    description: '刻意挑选个别对自己立场有利的数据极端点，故意掩盖压倒性的整体反面数据。',
    viral_example: '“全球变暖纯属骗局！看看西伯利亚这个小镇上周四测出的创纪录低温！”',
    reflection_prompt: '这个个别特例代表的是全球50年的整体趋势，还是被刻意摘取的离群值？'
  },
  conspiracy_framing: {
    name: '阴谋论构陷 (Conspiracy Framing)',
    subtitle: '无证据即证据的逻辑闭环',
    description: '声称“查无证据”本身恰恰证明了存在极其强大的幕后黑手正在掩盖真相。',
    viral_example: '“主流媒体绝不会报道这种秘方，因为药企巨头每年花数十亿收买他们好让大家继续生病！”',
    reflection_prompt: '该假说是否被设计成无论提供多少反驳证据，在讲述者眼中都无法被证伪？'
  },
  slippery_slope: {
    name: '滑坡谬误 (Slippery Slope)',
    subtitle: '灾难多米诺骨牌与无端推论',
    description: '断言采取某个温和的第一步，就必然导致一连串无法挽回的极端灾难，却未证明各环节间的因果关联。',
    viral_example: '“如果城市批准设立15分钟生活圈试点，下一步必然是强制限制出行并全面没收所有私家车！”',
    reflection_prompt: '作者是否证明了从第一步到最终灾难之间存在不可逆的因果链，还是无视了中间层层的民主监督？'
  },
  whataboutism: {
    name: '围魏救赵 (Whataboutism)',
    subtitle: '反咬一口与道德绑架',
    description: '在面临正当事实质疑时，不正面回应证据，而是立即指责对方或第三方犯过的其他过错以转移视线。',
    viral_example: '“凭什么调查我们公司的数据泄露？三年前那家外国巨头泄露了一亿条数据也没见谁被罚？！”',
    reflection_prompt: '指出他人的过往错误，是否能够解答或推翻当前指控所依据的具体事实与证据？'
  },
  false_cause: {
    name: '虚假因果 (Post Hoc)',
    subtitle: '前后相随误作因果必然',
    description: '仅仅因为事件 B 发生在事件 A 之后，就轻率断定 A 一定是导致 B 的直接原因。',
    viral_example: '“自从上个月村里开通了新通信基站，去诊所看病的人数暴增，这证明电磁波正在破坏人体免疫力！”',
    reflection_prompt: '两件事之间是否存在经过科学验证的因果机制，还是仅仅因为季节变化或巧合碰巧重叠？'
  },
  false_authority: {
    name: '假冒权威 (False Authority)',
    subtitle: '跨界头衔误导与盲目崇拜',
    description: '引用某个领域的知名专家或院士头衔，来为其完全不具备专业资质的另一复杂领域言论背书。',
    viral_example: '“一位顶尖航天工程学教授发文称膳食胆固醇绝不影响心血管健康——你信火箭专家还是信普通营养师？！”',
    reflection_prompt: '这位学者的学术背景和同行评审论文记录，是否真正属于他正在发表言论的学科领域？'
  },
  appeal_to_nature: {
    name: '诉诸纯天然 (Appeal to Nature)',
    subtitle: '天然必优良的健康迷思',
    description: '断言只要标榜“纯天然”就必定安全有效且无副作用，而实验室合成或规范药品就必定有毒。',
    viral_example: '“扔掉降压处方药吧！这种野生草药是100%纯天然的，没有任何副作用且能彻底根治心血管病！”',
    reflection_prompt: '天然物质（如毒蘑菇、砒霜或蛇毒）是否天然安全？经过严格临床试验的合成药物是否必然危险？'
  },
  no_true_scotsman: {
    name: '没有真正的苏格兰人 (No True Scotsman)',
    subtitle: '随意修改定义的纯洁性护盾',
    description: '当普遍性论断遭遇无可辩驳的反例时，通过临时擅自修改群体定义来将反例强行开除，以维护原有偏见。',
    viral_example: '“真正的媒体人绝不会批评我们的活动。如果那个记者写了负面报道，他从一开始就不是真正的记者！”',
    reflection_prompt: '发言者是否仅仅为了推翻一个证明其论断错误的反例，而临时擅自修改了群体的衡量标准？'
  },
  anchoring_bias: {
    name: '锚定效应 (Anchoring Bias)',
    subtitle: '首见数字定锚与价格诱导',
    description: '过度依赖最初接收到的第一条数字信息，导致后续的价值评估与判断被该初始标杆严重扭曲。',
    viral_example: '“这门量化投资大师课华尔街估值 10 万元，但未来 2 小时内只需 99 元！立刻立省 99901 元！”',
    reflection_prompt: '最初的标价是经过市场检验的真实价值，还是为了让折扣显得极其诱人而人为虚构的锚点？'
  },
  dunning_kruger: {
    name: '达克效应 (Dunning-Kruger Effect)',
    subtitle: '新手盲目自信与无知无畏',
    description: '在某个领域仅具备极浅薄知识的人，反而极度高估自己的认知水平，并轻率否定资深专业人士的共识。',
    viral_example: '“我周末看了三部解说视频，现在我对国家宏观货币政策和通胀的理解比央行经济学家深刻得多！”',
    reflection_prompt: '仅仅凭借零碎的快餐式网络阅读，我是否真的具备足以推翻专业科研共识的方法论基础？'
  },
  hasty_generalization: {
    name: '以偏概全 (Hasty Generalization)',
    subtitle: '孤例武断推导与微小样本偏差',
    description: '根据单一孤立的个人经历或极小且无代表性的样本，武断推导关于整个群体或新技术的普遍结论。',
    viral_example: '“我表哥买了辆电车，第一次冬天出远门就在路上抛锚了。电车根本就是彻头彻尾无法使用的骗局！”',
    reflection_prompt: '这一条个别案例能代表千万用户的整体大数据表现，还是被用来以偏概全的单一离群个案？'
  },
  circular_reasoning: {
    name: '循环论证 (Circular Reasoning)',
    subtitle: '把结论当前提的同义反复',
    description: '论证的前提本身就预设了结论的真实性，通过自圆其说的封闭闭环代替客观外部证据。',
    viral_example: '“你可以百分之百相信这个匿名账号发布的每一条猛料，因为他们只发真话，而我们知道那是真话是因为该账号发了！”',
    reflection_prompt: '该论证是否提供了来自独立第三方的客观证据，还是仅仅在用不同的辞令重复它自身的预设立场？'
  },
  in_group_bias: {
    name: '内群体偏见 (In-Group Bias)',
    subtitle: '我群至上与部落主义双标',
    description: '以阵营归属为是非标准，对自己一方的争议行为无底线包容宽恕，而对对立阵营的相同行为予以严厉诛心。',
    viral_example: '“我们这一方动用紧急议事规则，是力挽狂澜的担当；对方阵营使用相同规则，就是践踏法治的阴谋！”',
    reflection_prompt: '如果同样的行为是由对立阵营或我不喜欢的人做出的，我是否会做出截然不同的道德评判？'
  },
  liars_dividend: {
    name: '说谎者的红利 (The Liar\'s Dividend)',
    subtitle: '利用AI恐慌洗白责任的深伪犬儒主义',
    description: '利用公众对生成式 AI 和深度伪造技术的普遍戒备，将揭露自身丑闻的真实影音证据一概污蔑为“AI 伪造”。',
    viral_example: '“网上流传的那段我讨论受贿的录音，百分之百是敌对势力利用 AI 深度伪造生成的！大家千万别信！”',
    reflection_prompt: '声称证据是 AI 伪造的人，是否提供了经过法医学鉴定的技术报告，还是仅仅为了逃避曝光而随口甩锅？'
  }
};

export const INDONESIAN_SCENARIOS = {
  q1: {
    headline: '🚨 DARURAT: Bantuan pemutihan pinjaman pendidikan kamu telah disetujui! Klaim dalam 15 menit sebelum kuota pemerintah ditutup selamanya.',
    platform: 'Peringatan SMS / Terusan Telegram',
    context: 'Seorang mahasiswa menerima pesan singkat mendadak yang memuat tautan Bitly yang dipersingkat.',
    explanation: 'Penipu menciptakan batas waktu palsu (15 menit) untuk memicu kepanikan dan mencegah penerima memeriksa portal resmi kementerian secara mandiri.',
    sift_recommendation: 'Berhenti! Jangan pernah mengklik tautan SMS yang mencurigakan. Buka portal resmi pemerintah langsung di tab baru.'
  },
  q2: {
    headline: '“Pilihannya hanya dua: kamu mendukung penuh RUU pengawasan digital ini, atau kamu membiarkan teroris masuk ke bandara kita dengan leluasa!”',
    platform: 'Wawancara Berita TV / Klip Viral Medsos',
    context: 'Seorang politisi membela rancangan undang-undang retensi data dalam wawancara siaran langsung yang memanas.',
    explanation: 'Pembicara menghapus puluhan alternatif perlindungan privasi bernuansa dan memaksakan ultimatum biner yang manipulatif.',
    sift_recommendation: 'Cari Liputan Lebih Baik: Baca analisis hukum independen dari lembaga kebebasan sipil nirlaba.'
  },
  q3: {
    headline: '“Para ilmuwan terkemuka diam-diam sepakat radiasi 5G merusak gelombang otak manusia. Media arus utama menolak memberitakan konspirasi ini!”',
    platform: 'Video TikTok / Pesan Berantai WhatsApp',
    context: 'Sebuah video dengan musik latar menegangkan yang telah ditonton lebih dari 2,4 juta kali.',
    explanation: 'Menggunakan ketiadaan liputan media arus utama sebagai \'bukti\' konspirasi, sambil menggunakan kata mengelak (\'ilmuwan terkemuka\') tanpa menyebut nama satu institusi pun.',
    sift_recommendation: 'Lacak Klaim: Periksa laporan konsensus radiasi telekomunikasi resmi dari WHO dan IEEE.'
  },
  q4: {
    headline: '“Jangan repot-repot membaca riset ekonomi Dr. Sarah Lin tentang inflasi—dia mengendarai mobil sport mewah dan jelas seorang elitis yang sombong!”',
    platform: 'Utas Diskusi Medsos',
    context: 'Seorang komentator mengabaikan 60 halaman jurnal ekonomi peer-reviewed dengan menyerang kendaraan pribadi sang penulis.',
    explanation: 'Menyerang gaya hidup pribadi peneliti alih-alih memeriksa metodologi statistik atau data empiris dalam makalah ilmiah tersebut.',
    sift_recommendation: 'Investigasi Sumber: Baca ulasan sesama ekonom independen mengenai metodologinya, bukan hinaan pribadinya.'
  },
  q5: {
    headline: '“Kota kita tertutup salju setebal 25 cm tadi malam! Perubahan iklim global resmi terbukti sebagai hoaks buatan birokrat!”',
    platform: 'Unggahan Viral Media Sosial',
    context: 'Foto halaman rumah yang tertutup salju tebal diunggah saat badai musim dingin lokal.',
    explanation: 'Mengacaukan cuaca ekstrem lokal jangka pendek dengan tren iklim global multi-dekade, sengaja memilih satu hari beku sambil mengabaikan data kenaikan suhu 50 tahun.',
    sift_recommendation: 'Cari Liputan Lebih Baik: Konsultasikan peta anomali iklim agregat resmi dari BMKG, NASA, dan NOAA.'
  },
  q6: {
    headline: '“Megabintang sepak bola dunia Cristiano mengonsumsi teh detoks herbal ini setiap hari. Dia punya 600 juta pengikut, jadi teh ini pasti menyembuhkan penyakit kronis!”',
    platform: 'Reels Sponsor Instagram',
    context: 'Seorang atlet dengan ketenaran olahraga raksasa mempromosikan suplemen makanan tanpa izin BPOM.',
    explanation: 'Mengasumsikan bakat atletik dan kharisma selebriti setara dengan keahlian medis dan farmakologis klinis.',
    sift_recommendation: 'Investigasi Sumber: Verifikasi apakah suplemen tersebut memiliki izin edar dan uji keamanan klinis dari BPOM atau FDA.'
  },
  q7: {
    headline: '“Jika kita tidak melarang buku ini sekarang juga, peradaban kita akan runtuh ke dalam anarki total, darah akan tertumpah, dan masa depan generasi muda hancur selamanya!”',
    platform: 'Rapat Dengar Pendapat Publik',
    context: 'Seorang pembicara yang emosional memprotes materi kurikulum perpustakaan sekolah.',
    explanation: 'Menggunakan bahasa kiamat yang hiperbolis untuk memicu kepanikan akut alih-alih mendiskusikan kesesuaian usia materi secara terukur.',
    sift_recommendation: 'Berhenti: Kenali alarmisme emosional dan mintalah tinjauan kurikulum pedagogis yang seimbang.'
  },
  q8: {
    headline: '“Lebih dari 10 juta investor muda telah menyetorkan uang ke Token Quantum-Yield bulan ini. Jangan sampai kamu ketinggalan cuan besar!”',
    platform: 'Server Diskusi Kripto / Iklan Medsos',
    context: 'Banner sponsor yang mendesak pengguna untuk segera bergabung ke dalam liquidity pool aset kripto tak berizin.',
    explanation: 'Memanfaatkan angka besar dan FOMO (takut ketinggalan) untuk meyakinkan korban bahwa skema tersebut aman semata-mata karena jutaan orang diklaim ikut bergabung.',
    sift_recommendation: 'Investigasi Sumber: Cari data pendaftaran izin resmi di OJK atau Bappebti sebelum menginvestasikan dana.'
  }
};

export const SPANISH_SCENARIOS = {
  q1: {
    headline: '🚨 URGENTE: ¡Tu solicitud de condonación de préstamos estudiantiles ha sido aprobada! Reclama en 15 minutos antes de que cierre el plazo federal.',
    platform: 'Alerta SMS / Reenvío de Telegram',
    context: 'Un estudiante recibe un mensaje de texto inesperado con un enlace acortado de Bitly.',
    explanation: 'Los estafadores imponen plazos artificiales estrictos (15 minutos) para inducir pánico y evitar que la víctima verifique en portales oficiales.',
    sift_recommendation: '¡Detente! Nunca hagas clic en enlaces SMS no solicitados. Abre el portal oficial directamente en una nueva pestaña.'
  },
  q2: {
    headline: '“O apoyas plenamente nuestro proyecto de vigilancia digital, ¡o quieres que los terroristas entren libremente en nuestros aeropuertos!”',
    platform: 'Entrevista de Televisión / Clip Viral en Redes',
    context: 'Un político defiende una controvertida ley de registro de datos durante una entrevista televisiva.',
    explanation: 'El orador elimina alternativas matizadas de seguridad y privacidad, forzando un falso dilema binario.',
    sift_recommendation: 'Busca Mejor Cobertura: Consulta análisis jurídicos independientes de organizaciones de derechos civiles.'
  },
  q3: {
    headline: '“Los principales científicos coinciden en secreto en que las frecuencias 5G alteran las ondas cerebrales. ¡Los medios tradicionales ocultan este encubrimiento!”',
    platform: 'Video de TikTok / Cadena de WhatsApp',
    context: 'Un video con música dramática que acumula más de 2,4 millones de reproducciones.',
    explanation: 'Utiliza la falta de cobertura en medios como supuesta \'prueba\' de conspiración, apoyándose en términos ambiguos sin citar instituciones reales.',
    sift_recommendation: 'Rastrea la Afirmación: Verifica los consensos científicos de la OMS y el IEEE sobre radiaciones no ionizantes.'
  },
  q4: {
    headline: '“No te molestes en leer el estudio sobre inflación de la Dra. Sarah Lin: ¡conduce un coche deportivo de lujo y es una elitista desconectada de la realidad!”',
    platform: 'Foro Político en Redes',
    context: 'Un usuario descarta un artículo económico de 60 páginas atacando el vehículo del autor.',
    explanation: 'Ataca el estilo de vida del investigador en lugar de evaluar la metodología o los datos presentados en el estudio.',
    sift_recommendation: 'Investiga la Fuente: Lee las revisiones por pares de otros economistas sobre su metodología.'
  },
  q5: {
    headline: '“¡Nuestra ciudad amaneció con 25 cm de nieve! ¡El cambio climático es oficialmente una farsa inventada por burócratas!”',
    platform: 'Publicación Viral en Redes',
    context: 'Foto de una calle nevada publicada durante una tormenta de invierno local.',
    explanation: 'Confunde el clima meteorológico local a corto plazo con las tendencias climáticas globales a largo plazo, seleccionando un día frío e ignorando décadas de datos.',
    sift_recommendation: 'Busca Mejor Cobertura: Consulta los mapas de anomalías climáticas agregadas de la NASA y la NOAA.'
  },
  q6: {
    headline: '“La superestrella del fútbol Cristiano recomienda este té détox. Tiene 600 millones de seguidores, ¡así que debe curar enfermedades metabólicas!”',
    platform: 'Reel Patrocinado en Instagram',
    context: 'Un atleta de fama mundial promociona un suplemento dietético no regulado.',
    explanation: 'Supone erróneamente que el talento deportivo y la fama en redes equivalen a conocimiento bioquímico y médico.',
    sift_recommendation: 'Investiga la Fuente: Verifica si el producto cuenta con aprobación sanitaria y ensayos clínicos oficiales.'
  },
  q7: {
    headline: '“¡Si no prohibimos este libro de inmediato, nuestra civilización colapsará en la anarquía total y la sociedad quedará arruinada para siempre!”',
    platform: 'Audiencia Pública Escolar',
    context: 'Un orador apasionado protesta contra un libro de la biblioteca escolar.',
    explanation: 'Utiliza un lenguaje apocalíptico para provocar pánico en lugar de analizar con serenidad la idoneidad pedagógica.',
    sift_recommendation: 'Detente: Identifica el alarmismo emocional y solicita evaluaciones pedagógicas imparciales.'
  },
  q8: {
    headline: '“Más de 10 millones de jóvenes inversores ya han depositado dinero en Quantum-Yield Token este mes. ¡No te quedes fuera!”',
    platform: 'Servidor de Trading / Anuncio de Redes',
    context: 'Un banner patrocinado que insta a unirse a un fondo de inversión no regulado.',
    explanation: 'Explota el miedo a perderse algo (FOMO) y grandes cifras para convencer a la víctima de que el proyecto es legítimo.',
    sift_recommendation: 'Investiga la Fuente: Consulta los registros de los reguladores financieros oficiales.'
  }
};

export const FRENCH_SCENARIOS = {
  q1: {
    headline: '🚨 URGENT : Votre bourse d\'annulation de prêt étudiant a été approuvée ! Réclamez sous 15 minutes avant la clôture définitive.',
    platform: 'Alerte SMS / Transfert Telegram',
    context: 'Un étudiant reçoit un SMS inattendu contenant un lien raccourci Bitly.',
    explanation: 'Les escrocs imposent un faux compte à rebours (15 minutes) pour provoquer la panique et empêcher toute vérification sur les sites officiels.',
    sift_recommendation: 'Stop ! Ne clique jamais sur des liens SMS imprévus. Ouvre directement le portail gouvernemental officiel.'
  },
  q2: {
    headline: '“Soit vous soutenez notre projet de loi de surveillance numérique, soit vous laissez les terroristes entrer librement dans nos aéroports !”',
    platform: 'Interview Télévisée / Extrait Viral sur X',
    context: 'Un responsable politique défend un projet de loi controversé lors d\'un débat télévisé houleux.',
    explanation: 'L\'orateur occulte toutes les solutions intermédiaires respectueuses de la vie privée pour imposer un faux dilemme anxiogène.',
    sift_recommendation: 'Trouve une Meilleure Couverture : Consulte les analyses juridiques d\'organisations indépendantes de libertés publiques.'
  },
  q3: {
    headline: '“Les plus grands scientifiques s\'accordent en secret : la 5G altère les ondes cérébrales. Les médias grand public refusent de révéler ce complot !”',
    platform: 'Vidéo TikTok / Chaîne WhatsApp',
    context: 'Une vidéo avec une bande-son dramatique cumulant plus de 2,4 millions de vues.',
    explanation: 'Présente l\'absence de couverture médiatique comme la \'preuve\' d\'un complot, en utilisant des formules floues sans nommer aucun institut.',
    sift_recommendation: 'Remonte à la Source : Vérifie les rapports de consensus scientifique de l\'OMS et de l\'IEEE.'
  },
  q4: {
    headline: '“Ne perdez pas de temps à lire l\'étude sur l\'inflation du Dr Sarah Lin : elle roule en voiture de sport de luxe et n\'a aucune idée de la réalité !”',
    platform: 'Fil de Discussion Politique',
    context: 'Un internaute rejette une étude économique de 60 pages évaluée par des pairs en critiquant la voiture de l\'autrice.',
    explanation: 'Attaque le train de vie personnel du chercheur au lieu d\'analyser la méthodologie statistique et les données empiriques.',
    sift_recommendation: 'Évalue la Source : Lis les revues critiques rédigées par d\'autres économistes, et non les attaques personnelles.'
  },
  q5: {
    headline: '“Notre ville a reçu 25 cm de neige cette nuit ! Le dérèglement climatique mondial est officiellement une imposture de bureaucrates !”',
    platform: 'Publication Virale sur les Réseaux',
    context: 'Photo d\'une allée enneigée prise lors d\'une tempête hivernale locale.',
    explanation: 'Confond la météo locale ponctuelle avec les tendances climatiques globales sur plusieurs décennies, en isolant un jour de gel contre 50 ans de données thermiques.',
    sift_recommendation: 'Trouve une Meilleure Couverture : Consulte les cartes d\'anomalies thermiques mondiales de la NASA et de Météo-France.'
  },
  q6: {
    headline: '“La superstar du football Cristiano soutient cette tisane détox. Avec ses 600 millions d\'abonnés, c\'est la preuve qu\'elle guérit les maladies !”',
    platform: 'Reel Sponsorisé sur Instagram',
    context: 'Un sportif mondialement célèbre fait la promotion d\'un complément alimentaire non homologué.',
    explanation: 'Associe à tort la notoriété sportive et le charisme d\'une célébrité à une expertise pharmacologique et médicale.',
    sift_recommendation: 'Évalue la Source : Vérifie si le produit dispose d\'une autorisation de mise sur le marché délivrée par les autorités de santé.'
  },
  q7: {
    headline: '“Si nous n\'interdisons pas ce livre immédiatement, notre civilisation s\'effondrera dans l\'anarchie et notre jeunesse sera perdue à jamais !”',
    platform: 'Audition Publique Scolaire',
    context: 'Un intervenant virulent réclame le retrait d\'un ouvrage de la bibliothèque.',
    explanation: 'Mobilise un vocabulaire apocalyptique pour susciter une peur panique plutôt que d\'évaluer sereinement la pertinence pédagogique.',
    sift_recommendation: 'Stop : Repère l\'alarmisme émotionnel et demande des avis pédagogiques équilibrés.'
  },
  q8: {
    headline: '“Plus de 10 millions de jeunes investisseurs ont déjà rejoint le token Quantum-Yield ce mois-ci. Ne reste pas à la traîne !”',
    platform: 'Serveur Discord de Trading / Publicité Web',
    context: 'Une bannière publicitaire incitant à déposer des fonds dans un projet crypto non régulé.',
    explanation: 'Exploite l\'effet de meute et la peur de rater une opportunité (FOMO) pour faire croire à la légitimité du projet.',
    sift_recommendation: 'Évalue la Source : Vérifie les registres officiels des autorités des marchés financiers.'
  }
};

export const CHINESE_SCENARIOS = {
  q1: {
    headline: '🚨 紧急通知：你的助学贷款全额减免申请已获批准！请在15分钟内点击领取，逾期国家通道将永久关闭。',
    platform: '短信警报 / Telegram 转发消息',
    context: '一名学生突然收到一条包含可疑短网址链接的陌生短信。',
    explanation: '不法分子设置极短的虚假倒计时（15分钟），利用恐慌情绪阻止受害者独立前往官方政务网站核实。',
    sift_recommendation: '停下！切勿点击未经核实的短信短链接。请直接在浏览器新标签页中访问官方教育门户网站。'
  },
  q2: {
    headline: '“要么你百分之百支持这项数字全面监控法案，要么你就是想放任恐怖分子随意潜入我们的机场！”',
    platform: '电视新闻专访 / 社交平台热传短视频',
    context: '一名政客在直播访谈中激烈辩护一项极具争议的个人数据留存法案。',
    explanation: '发言者蓄意抹杀兼顾隐私与国家安全的技术折中方案，将其歪曲为非黑即白的极端道德绑架。',
    sift_recommendation: '寻找更优质信源：查阅非营利独立法律研究机构与数字公民权利组织的技术白皮书。'
  },
  q3: {
    headline: '“多位顶级科学家私下一致证实5G电磁波会永久改变人类大脑脑电波，主流媒体正全力封杀这一惊天内幕！”',
    platform: '短视频平台爆款视频 / 聊天群聊转发链',
    context: '一段配有悬疑惊悚背景音乐、播放量超240万次的热门短视频。',
    explanation: '将主流媒体未予报道歪曲为存在幕后黑手的“确凿铁证”，通篇使用“顶级科学家”等含糊其辞的推诿词，却未列出任何学术机构。',
    sift_recommendation: '溯源查证：在世界卫生组织（WHO）和电气电子工程师学会（IEEE）官方数据库中检索电磁辐射安全标准共识报告。'
  },
  q4: {
    headline: '“别费劲读萨拉·林博士关于通胀的经济学报告了——她天天开着豪华跑车，明摆着是个脱离群众的不良精英！”',
    platform: '论坛热帖 / 社交平台评论区',
    context: '一名评论者通过攻击作者的名下车辆，全盘否定一份长达60页的同行评审权威经济学论文。',
    explanation: '纯粹针对学者的个人生活方式进行人身抹黑与人格贬损，完全规避对其论文模型与实证数据的学术探讨。',
    sift_recommendation: '核实信源：查阅同行经济学家针对该论文计量模型的同行评审意见，而非聚焦于评论区的人身攻击。'
  },
  q5: {
    headline: '“我们城市昨晚积雪厚达25厘米！这正式证明全球变暖根本就是官僚们编造出来的惊天骗局！”',
    platform: '社交平台爆款图文动态',
    context: '在一次极端暴风雪期间拍摄的自家车道被大雪封堵的照片。',
    explanation: '将短期的局部单点天气现象与跨越数十年的全球气候宏观趋势混为一谈，刻意单挑极寒个案而无视半个世纪以来的全球地表均温攀升数据。',
    sift_recommendation: '寻找更优质信源：查阅中国气象局、NASA及NOAA发布的全球地表温度距平宏观趋势图。'
  },
  q6: {
    headline: '“全球顶级足球巨星C罗亲自代言并每天饮用这款草本排毒茶。他拥有6亿粉丝，这款茶绝对能根治各种代谢慢性病！”',
    platform: '社交平台赞助推广短视频',
    context: '拥有全球影响力的顶尖体育明星在广告中推广一款未经临床验证的保健冲剂。',
    explanation: '将体育竞技领域的杰出成就与公众影响力，盲目等同于生化药理学与临床医学的专业权威。',
    sift_recommendation: '核查信源：在国家药品监督管理部门或国际药监机构数据库中查询该保健品是否具备临床安全批件。'
  },
  q7: {
    headline: '“如果我们不立刻全面封禁这本书，我们的文明将彻底陷入血腥动乱，整个社会的未来将被永久毁灭！”',
    platform: '教育委员会公开听证会现场',
    context: '一名发言者情绪激动地抗议校图书馆采购的一本课外拓展读物。',
    explanation: '使用毁灭性、末日审判式的极端恐吓言辞诱发群体性恐慌，刻意回避对读物分级与学术适龄性的理性研讨。',
    sift_recommendation: '停下反思：辨识情绪化的末日预言恐吓，要求调取专业教育专家委员会的客观分级评估报告。'
  },
  q8: {
    headline: '“本月已有超过1000万年轻投资者火速注资‘量子收益币’。机不可失，千万别被时代列车抛在身后！”',
    platform: '投资交流群 / 社交平台弹窗推广',
    context: '一条催促用户立刻向无牌照加密资产资金池转账的赞助推广横幅。',
    explanation: '利用虚构的庞大参与人数与“错失恐惧症”（FOMO），诱导受害者误以为“大家都在参与就必定安全正规”。',
    sift_recommendation: '核查信源：在国家金融证券监管机构公开名录中核实该平台是否具备合法金融投资牌照。'
  }
};

export function getLocalizedScenario(scenario, lang = 'en') {
  if (!scenario) return {};
  const id = scenario.id;
  let localized = scenario;

  if (lang === 'id' && INDONESIAN_SCENARIOS[id]) {
    localized = { ...scenario, ...INDONESIAN_SCENARIOS[id] };
  } else if (lang === 'es' && SPANISH_SCENARIOS[id]) {
    localized = { ...scenario, ...SPANISH_SCENARIOS[id] };
  } else if (lang === 'fr' && FRENCH_SCENARIOS[id]) {
    localized = { ...scenario, ...FRENCH_SCENARIOS[id] };
  } else if (lang === 'zh' && CHINESE_SCENARIOS[id]) {
    localized = { ...scenario, ...CHINESE_SCENARIOS[id] };
  }

  const correctFallacy = getLocalizedFallacy({ id: scenario.correct_fallacy_id }, lang);
  const correctName = correctFallacy.name || localized.correct_fallacy_name || scenario.correct_fallacy_name;

  const localizedOptions = (scenario.options || []).map((opt) => {
    const optFallacy = getLocalizedFallacy({ id: opt.id }, lang);
    return {
      ...opt,
      name: optFallacy.name || opt.name
    };
  });

  return {
    ...localized,
    correct_fallacy_name: correctName,
    options: localizedOptions
  };
}

export function getLocalizedFallacy(item, lang = 'en') {
  if (!item) return {};
  const normalizedId = item.id ? item.id.replace(/[-_]/g, '_') : '';
  const noUnderscoreId = item.id ? item.id.replace(/[-_]/g, '') : '';

  if (lang === 'id') {
    const data = INDONESIAN_FALLACIES[normalizedId] || INDONESIAN_FALLACIES[noUnderscoreId];
    if (data) return { ...item, ...data };
  }
  if (lang === 'es') {
    const data = SPANISH_FALLACIES[normalizedId] || SPANISH_FALLACIES[noUnderscoreId];
    if (data) return { ...item, ...data };
  }
  if (lang === 'fr') {
    const data = FRENCH_FALLACIES[normalizedId] || FRENCH_FALLACIES[noUnderscoreId];
    if (data) return { ...item, ...data };
  }
  if (lang === 'zh') {
    const data = CHINESE_FALLACIES[normalizedId] || CHINESE_FALLACIES[noUnderscoreId];
    if (data) return { ...item, ...data };
  }
  return item;
}

export function useTranslation() {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const updateLang = () => {
      const saved = localStorage.getItem('verilens_lang');
      if (saved && TRANSLATIONS[saved]) {
        setLang(saved);
      }
    };

    updateLang();
    window.addEventListener('verilens_lang_updated', updateLang);
    window.addEventListener('storage', updateLang);

    return () => {
      window.removeEventListener('verilens_lang_updated', updateLang);
      window.removeEventListener('storage', updateLang);
    };
  }, []);

  const setLanguage = (newLang) => {
    if (TRANSLATIONS[newLang]) {
      setLang(newLang);
      localStorage.setItem('verilens_lang', newLang);
      window.dispatchEvent(new Event('verilens_lang_updated'));
    }
  };

  const t = (key) => {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
  };

  const getLocalized = (item) => getLocalizedFallacy(item, lang);
  const getLocalizedScen = (item) => getLocalizedScenario(item, lang);

  return {
    t,
    lang,
    setLanguage,
    languages: SUPPORTED_LANGUAGES,
    getLocalizedFallacy: getLocalized,
    getLocalizedScenario: getLocalizedScen
  };
}
