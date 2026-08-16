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
    step1_desc: 'Learn the 12 exact psychological triggers scammers and ragebaiters use to bypass your rational filters.',
    step1_action: 'Inspect 12 Tactics ▾',
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
    gauntlet_replay: 'Play Again',
    btn_fallacy: 'FALLACY / BIAS',
    btn_factual: 'FACTUAL REPORT',
    btn_scam: 'SCAM / PHISHING',

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
    hackathon_badge: 'Lindungi Perhatian & Ketenangan Pikiran Anda',
    hero_title: 'Beranda Anda dirancang untuk membuat Anda marah, cemas, dan mudah dimanipulasi.',
    hero_desc: 'Algoritma mengeksploitasi titik buta psikologis demi pendapatan iklan. Dalam 60 detik sehari, latih refleks kognitif Anda untuk mengenali jebakan sebelum merugikan ketenangan pikiran Anda.',
    hero_cta_primary: 'Uji Pertahanan Anda (Percobaan 60 Detik)',
    hero_cta_secondary: 'Lihat Cara Kerja Jebakan ▾',
    hero_cta_arena: 'Arena Deteksi',
    hero_cta_gauntlet: 'Tantangan 60 Detik',
    hero_cta_skills: 'Pohon Keterampilan',
    hero_cta_extension: 'Ekstensi Chrome',
    stat_faster_title: '70% Lebih Cepat',
    stat_faster_desc: 'Kemarahan palsu menyebar 6x lebih cepat dibanding laporan fakta',
    stat_window_title: '<5 Detik',
    stat_window_desc: 'Waktu yang dibutuhkan algoritma untuk membajak emosi Anda',
    stat_local_title: '100% Privat',
    stat_local_desc: 'Perlindungan real-time diproses aman langsung di browser Anda',
    step1_badge: 'LANGKAH 01',
    step1_title: 'Bongkar Umpan Manipulasi',
    step1_desc: 'Pelajari 12 pemicu psikologis yang digunakan pembuat hoaks dan penipu untuk melewati filter rasional Anda.',
    step1_action: 'Periksa 12 Taktik ▾',
    step2_badge: 'LANGKAH 02',
    step2_title: 'Uji Radar Anda di Bawah Tekanan',
    step2_desc: 'Bisakah Anda mengenali klaim palsu dalam 5 detik di bawah tekanan waktu? Cari tahu sebelum beranda Anda mengecoh Anda.',
    step2_action: 'Mulai Uji Cepat 60 Detik',
    step3_badge: 'LANGKAH 03',
    step3_title: 'Lindungi Penjelajahan Web Langsung',
    step3_desc: 'Verifikasi artikel atau berita kontroversial dalam 3 klik dengan metode investigasi lateral Stanford SIFT.',
    step3_action: 'Buka Sandbox',

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
    step1_desc: 'Conoce los 12 disparadores psicológicos que usan estafadores y creadores de bulos para burlar tu razón.',
    step1_action: 'Explorar 12 Tácticas ▾',
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
    codex_title: 'Códice Ilustrado: Falacias y Sesgos Cognitivos',
    codex_desc: 'Inspirado en yourlogicalfallacyis.com. Toca cualquier carta para voltearla y descubrir su anatomía psicológica.',
    search_placeholder: 'Buscar falacias (ej. miedo, scam, autoridad)...',
    cat_all: 'Todas',
    cat_logic: 'Lógica',
    cat_emotional: 'Emocional',
    cat_attribution: 'Atribución',
    cat_cognitive: 'Cognitivo',
    cat_scam: 'Estafa',
    card_tap_front: 'Toca para ver anatomía',
    card_tap_back: 'Toca para regresar',
    card_viral_scenario: 'Escenario Viral:',
    card_reflection: 'Pregunta Metacognitiva:',
    card_sandbox_btn: 'Probar en Laboratorio',

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
    step1_desc: 'Identifiez les 12 leviers psychologiques exploités par les créateurs de fake news pour tromper votre esprit critique.',
    step1_action: 'Explorer les 12 Tactiques ▾',
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
    codex_title: 'Codex Illustré des Sophismes & Biais',
    codex_desc: 'Inspiré de yourlogicalfallacyis.com. Cliquez sur une carte pour la retourner et explorer son anatomie cognitive.',
    search_placeholder: 'Rechercher un sophisme (ex: peur, arnaque, autorité)...',
    cat_all: 'Tous',
    cat_logic: 'Logique',
    cat_emotional: 'Émotionnel',
    cat_attribution: 'Attribution',
    cat_cognitive: 'Cognitif',
    cat_scam: 'Arnaque',
    card_tap_front: 'Cliquer pour voir l’anatomie',
    card_tap_back: 'Cliquer pour retourner',
    card_viral_scenario: 'Exemple Viral :',
    card_reflection: 'Question d’Auto-Évaluation :',
    card_sandbox_btn: 'Tester en Laboratoire',

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
    step1_desc: '掌握造谣者和诈骗分子绕过理性防火墙所使用的 12 种心理操纵模式。',
    step1_action: '检阅 12 种操纵术 ▾',
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
    codex_title: '图解逻辑谬误与认知偏见图鉴',
    codex_desc: '点击任意卡片即可翻转，深入探索其心理操控机制与应对反思。',
    search_placeholder: '搜索谬误 (如：恐惧、诈骗、从众)...',
    cat_all: '全部',
    cat_logic: '逻辑类',
    cat_emotional: '情绪煽动',
    cat_attribution: '归因偏见',
    cat_cognitive: '认知偏差',
    cat_scam: '网络诈骗',
    card_tap_front: '点击翻转查看剖析',
    card_tap_back: '点击返回',
    card_viral_scenario: '典型网络案例：',
    card_reflection: '元认知反思提问：',
    card_sandbox_btn: '沙盒实测',

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
  adhominem: {
    name: 'Ad Hominem',
    subtitle: 'Menyerang Pribadi & Pengalihan Isu',
    description: 'Menyerang karakter, kepribadian, atau latar belakang lawan alih-alih membahas substansi argumen objektif mereka.',
    viral_example: '"Jangan percaya data iklim Dr. Aris—dia pernah dibayar perusahaan riset, jadi dia pasti boneka korup!"',
    reflection_prompt: 'Jika Anda mengabaikan hinaan pribadinya, data atau bukti nyata apa yang sebenarnya tersisa dari klaim tersebut?'
  },
  falsedilemma: {
    name: 'Dilema Palsu',
    subtitle: 'Dikotomi Hitam-Putih yang Dipaksakan',
    description: 'Menyederhanakan masalah kompleks menjadi hanya dua pilihan ekstrem, sambil menghilangkan alternatif jalan tengah.',
    viral_example: '"Pilihannya hanya dua: dukung RUU pengawasan ini 100%, atau Anda membiarkan teroris menyerang sekolah kita!"',
    reflection_prompt: 'Pilihan ketiga atau solusi kompromi apa yang sengaja disembunyikan oleh ultimatum ini?'
  },
  strawman: {
    name: 'Manusia Jerami (Straw Man)',
    subtitle: 'Distorsi & Karikatur Argumen',
    description: 'Memutarbalikkan atau melebih-lebihkan argumen lawan agar terdengar konyol dan mudah diserang.',
    viral_example: '"Pihak lawan ingin mengurangi anggaran militer—itu artinya mereka ingin negara kita dijajah besok pagi!"',
    reflection_prompt: 'Apakah ini benar-benar posisi asli yang dipegang lawan, atau versi karikatur yang sengaja dibuat agar mudah dijatuhkan?'
  },
  appealtofear: {
    name: 'Bujukan Rasa Takut',
    subtitle: 'Menakut-nakuti & Umpan Kiamat',
    description: 'Menggunakan prediksi bencana ekstrem untuk memicu kepanikan dan memaksa persetujuan tanpa verifikasi data.',
    viral_example: '"Jika perjanjian ini disahkan besok, ekonomi kita akan hancur total dan negara kita musnah dalam hitungan minggu!"',
    reflection_prompt: 'Apakah data ilmiah objektif benar-benar memprediksi hal ini, ataukah rasa takut sengaja dipakai untuk menakut-nakuti?'
  },
  sunkcost: {
    name: 'Bias Biaya Hangus (Sunk Cost)',
    subtitle: 'Terjebak Kerugian Masa Lalu',
    description: 'Terus melanjutkan proyek atau keputusan yang gagal hanya karena sudah terlanjur menginvestasikan banyak uang atau waktu.',
    viral_example: '"Kita sudah menghabiskan 50 miliar untuk aplikasi bermasalah ini, jadi kita harus tambah 20 miliar lagi daripada rugi!"',
    reflection_prompt: 'Jika Anda memulai dari nol hari ini tanpa beban masa lalu, apakah Anda tetap akan menginvestasikan uang ini?'
  },
  posthoc: {
    name: 'Post Hoc Ergo Propter Hoc',
    subtitle: 'Korelasi Palsu Sebab-Akibat',
    description: 'Menganggap bahwa karena peristiwa B terjadi setelah peristiwa A, maka A pasti merupakan penyebab langsung dari B.',
    viral_example: '"Sejak menara 5G dipasang di desa kami, hasil panen padi menurun. Jelas radiasi sinyal merusak tanaman kita!"',
    reflection_prompt: 'Faktor eksternal apa lagi (seperti cuaca, hama, atau pupuk) yang mungkin menjadi penyebab sebenarnya?'
  },
  bandwagon: {
    name: 'Efek Ikut-ikutan (Bandwagon)',
    subtitle: 'Tekanan Mayoritas & Validasi Sosial',
    description: 'Menganggap suatu klaim pasti benar hanya karena dipercayai atau diikuti oleh jutaan orang di media sosial.',
    viral_example: '"Lebih dari 10 juta orang sudah membagikan video ini di TikTok, jadi klaim ini tidak mungkin palsu!"',
    reflection_prompt: 'Apakah kebenaran suatu fakta ditentukan oleh jumlah like dan share, atau oleh bukti empiris?'
  },
  haloeffect: {
    name: 'Efek Halo',
    subtitle: 'Otoritas Semu & Kharisma Figur',
    description: 'Menganggap pendapat seorang selebriti atau tokoh terkenal pasti benar dalam bidang sains/medis di luar keahliannya.',
    viral_example: '"Aktor terkenal ini rutin meminum ramuan detoks ini setiap pagi, jadi suplemen ini terbukti 100% aman dan berkhasiat!"',
    reflection_prompt: 'Apakah figur tersebut memiliki kualifikasi medis atau ilmiah resmi dalam bidang yang ia bicarakan?'
  },
  anchoring: {
    name: 'Bias Jangkar (Anchoring)',
    subtitle: 'Terpaku pada Angka Pertama',
    description: 'Terlalu mengandalkan potongan informasi atau angka pertama yang didengar saat mengambil keputusan.',
    viral_example: '"Harga asli pelatihan saham ini 20 juta, tapi khusus hari ini hanya 199 ribu! Anda untung besar jika beli sekarang!"',
    reflection_prompt: 'Apakah nilai sebenarnya dari produk tersebut sebanding dengan harganya, terlepas dari perbandingan harga awalnya?'
  },
  confirmationbias: {
    name: 'Bias Konfirmasi',
    subtitle: 'Gelembung Informasi Pribadi',
    description: 'Hanya mencari, mempercayai, dan mengingat informasi yang mendukung keyakinan awal kita sambil menolak data yang berlawanan.',
    viral_example: '"Saya mengabaikan 20 jurnal medis resmi dan hanya membaca 1 blog yang sependapat dengan teori saya!"',
    reflection_prompt: 'Apakah Anda bersedia mengubah pandangan jika disodorkan data kuat yang membuktikan sebaliknya?'
  },
  scamurgency: {
    name: 'Rekayasa Urgensi Palsu',
    subtitle: 'Umpan Penipuan Panik Digital',
    description: 'Menciptakan rasa panik dengan batas waktu palsu agar korban segera mengklik tautan phishing tanpa berpikir panjang.',
    viral_example: '"PERINGATAN: Rekening bank Anda dibekukan! Klik tautan ini dalam 5 menit untuk verifikasi OTP atau dana Anda hilang!"',
    reflection_prompt: 'Lembaga resmi mana yang pernah meminta verifikasi data darurat melalui pesan acak dan tautan tidak resmi?'
  },
  ingroupbias: {
    name: 'Bias Kelompok Sendiri',
    subtitle: 'Polarisasi Kita vs Mereka',
    description: 'Menilai kelompok sendiri selalu bermoral dan benar, sementara kelompok lain selalu dianggap jahat dan berniat buruk.',
    viral_example: '"Kelompok kita selalu memperjuangkan keadilan, sementara kelompok sebelah pasti punya niat jahat merusak bangsa!"',
    reflection_prompt: 'Apakah Anda menerapkan standar moral dan logika yang sama ketatnya terhadap kelompok Anda sendiri?'
  }
};

export const SPANISH_FALLACIES = {
  adhominem: {
    name: 'Ad Hominem',
    subtitle: 'Ataque Personal y Desvío de Atención',
    description: 'Atacar el carácter o los antecedentes del oponente en lugar de refutar los méritos de su argumento.',
    viral_example: '"No escuches los datos del Dr. Aris: una vez fue consultor, ¡es un títere corrupto!"',
    reflection_prompt: 'Si eliminas los insultos personales, ¿qué datos o pruebas reales quedan en la afirmación?'
  },
  falsedilemma: {
    name: 'Falso Dilema',
    subtitle: 'Dicotomía Forzada Blanco o Negro',
    description: 'Reducir un problema complejo a solo dos opciones extremas, borrando todos los puntos medios.',
    viral_example: '"O apoyas al 100% esta ley de vigilancia, ¡o estás a favor de que los terroristas ataquen!"',
    reflection_prompt: '¿Qué tercera o cuarta alternativa razonable está siendo deliberadamente ignorada?'
  },
  strawman: {
    name: 'Hombre de Paja',
    subtitle: 'Distorsión y Caricatura del Argumento',
    description: 'Caricaturizar o exagerar la postura del oponente para que parezca absurda y fácil de atacar.',
    viral_example: '"Quieren revisar el presupuesto de defensa; ¡eso significa que quieren que nos invadan mañana!"',
    reflection_prompt: '¿Es esta la postura real del oponente o una versión exagerada para desacreditarlo?'
  },
  appealtofear: {
    name: 'Apelación al Miedo',
    subtitle: 'Catastrofismo y Manipulación Emocional',
    description: 'Usar predicciones apocalípticas para provocar pánico e inducir decisiones sin verificar hechos.',
    viral_example: '"Si se aprueba este tratado, ¡nuestra economía colapsará en semanas y habrá caos total!"',
    reflection_prompt: '¿La evidencia real respalda este escenario catastrófico o se usa el terror para manipularte?'
  },
  sunkcost: {
    name: 'Costo Hundido',
    subtitle: 'Atrapado por Inversiones Pasadas',
    description: 'Continuar una mala decisión solo porque ya se ha invertido mucho tiempo o dinero en ella.',
    viral_example: '"Ya gastamos millones en este proyecto fallido; ¡tenemos que invertir más para no perderlo!"',
    reflection_prompt: 'Si empezaras de cero hoy, ¿volverías a invertir en este proyecto?'
  },
  posthoc: {
    name: 'Causa Falsa (Post Hoc)',
    subtitle: 'Confundir Correlación con Causalidad',
    description: 'Asumir que porque un evento ocurrió después de otro, el primero fue la causa directa del segundo.',
    viral_example: '"Desde que instalaron la antena 5G, las cosechas bajaron. ¡La radiación dañó el campo!"',
    reflection_prompt: '¿Qué otros factores externos (clima, fertilizantes, plagas) podrían ser la verdadera causa?'
  },
  bandwagon: {
    name: 'Efecto Arrastre (Bandwagon)',
    subtitle: 'Presión de Grupo y Aprobación Social',
    description: 'Creer que una afirmación es verdadera solo porque millones de personas la comparten en redes.',
    viral_example: '"Más de 5 millones de personas compartieron este video; ¡no puede ser falso!"',
    reflection_prompt: '¿La verdad de un hecho se mide por la cantidad de likes o por la evidencia científica?'
  },
  haloeffect: {
    name: 'Efecto Halo',
    subtitle: 'Falsa Autoridad por Celebridad',
    description: 'Dar por válida la opinión de un famoso en materias médicas o científicas fuera de su especialidad.',
    viral_example: '"Este famoso actor toma este suplemento cada mañana, ¡así que está médicamente comprobado!"',
    reflection_prompt: '¿Tiene esa persona credenciales científicas formales en el tema del que opina?'
  },
  anchoring: {
    name: 'Sesgo de Anclaje',
    subtitle: 'Fijación en la Primera Cifra',
    description: 'Depender en exceso del primer dato o precio recibido al tomar una decisión racional.',
    viral_example: '"El curso costaba 500 dólares, pero hoy está a 19 dólares. ¡Es una ganga imperdible!"',
    reflection_prompt: '¿El valor real del contenido justifica el precio, más allá de la rebaja aparente?'
  },
  confirmationbias: {
    name: 'Sesgo de Confirmación',
    subtitle: 'Burbuja de Autoengaño',
    description: 'Buscar y creer únicamente la información que confirma tus creencias previas e ignorar el resto.',
    viral_example: '"Ignoré 30 estudios científicos y solo leí el blog que concuerda con mi teoría."',
    reflection_prompt: '¿Estarías dispuesto a cambiar de opinión si te presentan evidencia sólida en contra?'
  },
  scamurgency: {
    name: 'Urgencia Artificial (Phishing)',
    subtitle: 'Manipulación por Pánico Digital',
    description: 'Crear una falsa urgencia para que la víctima haga clic en enlaces fraudulentos sin pensar.',
    viral_example: '"¡ALERTA: Tu cuenta bancaria será cancelada en 5 minutos! Haz clic aquí para verificar tu clave."',
    reflection_prompt: '¿Algún banco legítimo exige claves urgentes mediante enlaces en mensajes informales?'
  },
  ingroupbias: {
    name: 'Sesgo Endogrupal',
    subtitle: 'Polarización "Nosotros contra Ellos"',
    description: 'Ver a tu grupo como virtuoso y considerar que el grupo rival siempre actúa de mala fe.',
    viral_example: '"Nuestro partido siempre defiende al pueblo; ellos solo quieren destruir el país."',
    reflection_prompt: '¿Aplicas el mismo nivel de exigencia ética a los miembros de tu propio grupo?'
  }
};

export const FRENCH_FALLACIES = {
  adhominem: {
    name: 'Ad Hominem',
    subtitle: 'Attaque Personnelle & Diversion',
    description: 'Attaquer la personne plutôt que d’examiner la rigueur factuelle de son argumentation.',
    viral_example: '"N’écoutez pas les données du Dr Aris : il a été consultant, c’est forcément un corrompu !"',
    reflection_prompt: 'Si l’on retire les attaques personnelles, quelles preuves empiriques subsistent dans son propos ?'
  },
  falsedilemma: {
    name: 'Faux Dilemme',
    subtitle: 'Dichotomie Forcée Noir ou Blanc',
    description: 'Réduire une question complexe à deux choix extrêmes en occultant toutes les nuances intermédiaires.',
    viral_example: '"Soit vous soutenez cette loi de surveillance à 100 %, soit vous soutenez les terroristes !"',
    reflection_prompt: 'Quelles alternatives ou compromis raisonnables cet ultimatum cherche-t-il à masquer ?'
  },
  strawman: {
    name: 'Épouvantail (Homme de Paille)',
    subtitle: 'Caricature & Déformation',
    description: 'Déformer et exagérer les propos d’un adversaire pour les rendre ridicules et faciles à démolir.',
    viral_example: '"Ils veulent réévaluer le budget militaire : cela signifie qu’ils veulent que notre pays soit envahi demain !"',
    reflection_prompt: 'S’agit-il de la véritable position défendue ou d’une caricature délibérément affaiblie ?'
  },
  appealtofear: {
    name: 'Appel à la Peur',
    subtitle: 'Alarmisme & Chantage Émotionnel',
    description: 'Brandir des menaces apocalyptiques pour court-circuiter l’esprit critique et forcer l’adhésion.',
    viral_example: '"Si ce traité est signé, notre économie s’effondrera en quelques semaines et ce sera le chaos total !"',
    reflection_prompt: 'Les données scientifiques prédisent-elles ce scénario ou la terreur est-elle utilisée comme levier ?'
  },
  sunkcost: {
    name: 'Coûts Irrécupérables',
    subtitle: 'Piège de l’Investissement Passé',
    description: 'Persister dans une voie vouée à l’échec uniquement parce qu’on y a déjà consacré du temps ou de l’argent.',
    viral_example: '"Nous avons déjà investi des millions dans ce projet raté, il faut continuer pour ne pas tout perdre !"',
    reflection_prompt: 'En repartant de zéro aujourd’hui, investiriez-vous à nouveau dans ce projet ?'
  },
  posthoc: {
    name: 'Fausse Causalité (Post Hoc)',
    subtitle: 'Confusion entre Corrélation et Causalité',
    description: 'Déduire qu’un événement est la cause d’un autre uniquement parce qu’il s’est produit juste avant.',
    viral_example: '"Depuis l’installation de l’antenne 5G, les récoltes ont baissé. Les ondes détruisent nos champs !"',
    reflection_prompt: 'Quels autres facteurs externes (climat, engrais, parasites) pourraient expliquer ce phénomène ?'
  },
  bandwagon: {
    name: 'Effet de Mode (Bandwagon)',
    subtitle: 'Pression Sociale & Conformisme',
    description: 'Prétendre qu’une idée est vraie uniquement parce que des millions de personnes la partagent en ligne.',
    viral_example: '"Plus de 10 millions de personnes ont partagé cette vidéo, c’est la preuve absolue que c’est vrai !"',
    reflection_prompt: 'La véracité d’un fait se mesure-t-elle au nombre de partages ou aux preuves vérifiables ?'
  },
  haloeffect: {
    name: 'Effet de Halo',
    subtitle: 'Faible Autorité & Séduction de Célébrité',
    description: 'Accorder une confiance aveugle à une célébrité sur un sujet médical ou scientifique hors de ses compétences.',
    viral_example: '"Cet acteur célèbre boit ce mélange chaque matin, c’est donc 100 % prouvé scientifiquement !"',
    reflection_prompt: 'Cette personnalité possède-t-elle des compétences scientifiques reconnues dans ce domaine ?'
  },
  anchoring: {
    name: 'Biais d’Ancrage',
    subtitle: 'Focalisation sur la Première Valeur',
    description: 'Se fier excessivement à la première information chiffrée reçue lors d’une prise de décision.',
    viral_example: '"La formation valait 1000 €, mais elle est à 29 € aujourd’hui seulement : c’est l’affaire du siècle !"',
    reflection_prompt: 'La valeur réelle du contenu justifie-t-elle le prix, indépendamment du rabais affiché ?'
  },
  confirmationbias: {
    name: 'Biais de Confirmation',
    subtitle: 'Bulle d’Auto-Validation',
    description: 'Ne rechercher et ne retenir que les informations qui confortent ses convictions préalables.',
    viral_example: '"J’ai ignoré 50 études scientifiques pour ne lire que l’unique blog qui confirme ma théorie."',
    reflection_prompt: 'Seriez-vous prêt à changer d’avis face à des preuves solides et contradictoires ?'
  },
  scamurgency: {
    name: 'Fausse Urgence (Phishing)',
    subtitle: 'Panique Artificielle & Hameçonnage',
    description: 'Créer un sentiment d’urgence immédiat pour inciter la victime à cliquer sans réfléchir.',
    viral_example: '"URGENT : Votre compte bancaire sera bloqué dans 5 minutes ! Cliquez ici pour confirmer vos accès."',
    reflection_prompt: 'Une banque légitime demande-t-elle un mot de passe en urgence par un lien non sécurisé ?'
  },
  ingroupbias: {
    name: 'Biais d’Appartenance',
    subtitle: 'Polarisation Eux contre Nous',
    description: 'Juger son propre groupe comme vertueux et prêter systématiquement de mauvaises intentions aux autres.',
    viral_example: '"Notre camp défend toujours la vérité, alors que l’autre camp ne cherche qu’à tromper le pays !"',
    reflection_prompt: 'Appliquez-vous les mêmes exigences d’intégrité morale et logique à votre propre groupe ?'
  }
};

export const CHINESE_FALLACIES = {
  adhominem: {
    name: '人身攻击谬误 (Ad Hominem)',
    subtitle: '攻击动机与转移焦点',
    description: '不讨论论点的客观事实与证据，而是针对发言者的个人品格、背景或身份进行抹黑。',
    viral_example: '“别听阿里斯博士的气候数据，他以前拿过咨询公司的报酬，绝对是个被收买的骗子！”',
    reflection_prompt: '如果剔除人身侮辱与动机揣测，这项主张本身还剩下哪些真实客观的数据证据？'
  },
  falsedilemma: {
    name: '非黑即白谬误 (False Dilemma)',
    subtitle: '虚假二元对立与极端绑架',
    description: '将复杂多元的现实问题强行简化为非此即彼的两个极端选择，刻意抹杀中间路线。',
    viral_example: '“要么你百分之百支持这项法案，要么你就是故意纵容犯罪分子破坏我们的家园！”',
    reflection_prompt: '这项极端威胁刻意隐瞒了哪些合理的第三种选择或折中妥协方案？'
  },
  strawman: {
    name: '稻草人谬误 (Straw Man)',
    subtitle: '曲解观点与树敌攻击',
    description: '歪曲、夸大或断章取义对手的真实立场，制造一个荒谬脆弱的“假靶子”进行批判。',
    viral_example: '“他们建议调整开支预算，这分明就是想让我们明天就全面缴械投降！”',
    reflection_prompt: '这真的是对方的原意，还是被刻意扭曲成容易被批驳的极端版本？'
  },
  appealtofear: {
    name: '诉诸恐惧 (Appeal to Fear)',
    subtitle: '末日恐吓与情绪绑架',
    description: '利用骇人听闻的灾难预言激发人们的生存焦虑，逼迫受众在未经核实的情况下顺从。',
    viral_example: '“如果这项协议通过，我们的经济将在几周内彻底崩溃，社会将彻底毁灭！”',
    reflection_prompt: '真正的科学与数据是否支持这种末日推论，还是恐惧被用作强推观点的操纵工具？'
  },
  sunkcost: {
    name: '沉没成本谬误 (Sunk Cost)',
    subtitle: '执迷不悟与沉没套牢',
    description: '仅仅因为过去已经投入了大量时间、金钱或精力，而继续坚持一项毫无前途的错误决策。',
    viral_example: '“我们已经在这个烂项目上花了五千万，必须再追加两千万，否则前面的钱全打水漂了！”',
    reflection_prompt: '如果今天从零开始重新评估，你还会为这个方向投入哪怕一分钱吗？'
  },
  posthoc: {
    name: '前后因果谬误 (Post Hoc)',
    subtitle: '将时间先后误认为因果关系',
    description: '仅仅因为事件 B 发生在事件 A 之后，就轻率断定 A 一定是导致 B 的直接原因。',
    viral_example: '“自从村里建了信号塔，农作物的产量就下降了，明显是电磁辐射破坏了庄稼！”',
    reflection_prompt: '还有哪些外部环境因素（如天气变动、病虫害或土壤肥力）才是真正的原因？'
  },
  bandwagon: {
    name: '从众效应 (Bandwagon Effect)',
    subtitle: '多数绑架与羊群心理',
    description: '仅因某种观点被社交网络上海量人群点赞或转发，就盲目认定其一定是客观真理。',
    viral_example: '“全网已经有超过一千万人转发了这个视频，难道千万人都会搞错吗？肯定是真的！”',
    reflection_prompt: '事实的真伪是由客观证据决定的，还是由点赞和转发数量决定的？'
  },
  haloeffect: {
    name: '光环效应 (Halo Effect)',
    subtitle: '跨界盲信与偶像崇拜',
    description: '因某位明星或名人在某个领域享有声誉，就盲目相信其在医学或科学等跨界领域的言论。',
    viral_example: '“这位著名影星每天早晨都喝这款排毒水，所以这个配方绝对百分之百科学有效！”',
    reflection_prompt: '该公众人物是否在其所推荐的医学或科学领域具备正规权威的专业资质？'
  },
  anchoring: {
    name: '锚定效应 (Anchoring Bias)',
    subtitle: '先入为主与首因固化',
    description: '在进行决策或价值评估时，过度依赖最初接收到的第一条信息或价格标杆。',
    viral_example: '“这门课原价 9999 元，今日限时特惠只需 99 元！立刻抢购就等于净赚大几千！”',
    reflection_prompt: '该产品本身的实际价值是否真的值这个价格，而不论其标榜的原价有多夸张？'
  },
  confirmationbias: {
    name: '确认偏误 (Confirmation Bias)',
    subtitle: '信息茧房与偏听偏信',
    description: '只搜集、相信和传播能够印证自己既有偏见的信息，对相反的大量事实视而不见。',
    viral_example: '“我无视了 50 篇权威科学期刊的结论，只阅读那唯一一本支持我个人猜想的博客。”',
    reflection_prompt: '如果面对无可辩驳且经过同行评审的反面证据，你是否愿意修正自己的固有观念？'
  },
  scamurgency: {
    name: '虚假紧迫感 (Scam Urgency)',
    subtitle: '恐慌诱导与钓鱼陷阱',
    description: '通过虚构账户冻结或法律风险制造恐慌，迫使受害者在慌乱中点击钓鱼恶意链接。',
    viral_example: '“【紧急警告】您的银行账户将在 5 分钟内被强制冻结！请立即点击此链接输入验证码解除！”',
    reflection_prompt: '正规金融或官方机构何时会通过非官方随机短信和未知链接要求输入敏感验证码？'
  },
  ingroupbias: {
    name: '内群体偏见 (In-Group Bias)',
    subtitle: '非我族类与群体极化',
    description: '对自己所属的群体给予无条件的道德光环，而将对立群体一律预设为心怀叵测的恶意者。',
    viral_example: '“我们这一方永远站在正义与道德高地，而对方陣营所做的一切都包藏祸心！”',
    reflection_prompt: '你是否对自己群体内部的错误与逻辑漏洞，保持与审视对手时同样严谨的批判标准？'
  }
};

export function getLocalizedFallacy(item, lang = 'en') {
  if (!item) return {};
  if (lang === 'id' && INDONESIAN_FALLACIES[item.id]) {
    return { ...item, ...INDONESIAN_FALLACIES[item.id] };
  }
  if (lang === 'es' && SPANISH_FALLACIES[item.id]) {
    return { ...item, ...SPANISH_FALLACIES[item.id] };
  }
  if (lang === 'fr' && FRENCH_FALLACIES[item.id]) {
    return { ...item, ...FRENCH_FALLACIES[item.id] };
  }
  if (lang === 'zh' && CHINESE_FALLACIES[item.id]) {
    return { ...item, ...CHINESE_FALLACIES[item.id] };
  }
  return item;
}

export function useTranslation() {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const saved = localStorage.getItem('verilens_lang');
    if (saved && TRANSLATIONS[saved]) {
      setLang(saved);
    }
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

  return { t, lang, setLanguage, languages: SUPPORTED_LANGUAGES };
}
