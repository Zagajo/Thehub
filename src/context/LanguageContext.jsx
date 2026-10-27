import React, { createContext, useContext, useState, useEffect } from 'react';

export const LanguageContext = createContext();

export const translations = {
  en: {
    // Navigation
    nav_overview: 'Overview',
    nav_courses: 'Courses & Modules',
    nav_paths: 'Learning Paths',
    nav_assessments: 'Assessments',
    nav_peer: 'Peer Learning',
    nav_passport: 'Skill Passport',
    nav_nisr: 'NISR Intel',
    nav_employer: 'Employer Match',
    nav_language: 'Translate / Indimi',
    nav_admin: 'Admin Dashboard',
    nav_more: 'More',
    nav_other_tabs: 'Other Tabs',
    nav_signin: 'Sign In / Register',
    nav_signout: 'Sign Out',
    nav_admin_badge: 'ADMIN',
    nav_title: 'The Hub',
    nav_country: 'Rwanda',
    nav_subtitle: 'Skills & NISR Labour Intelligence',

    // Hero & Home
    hero_kicker: 'National Skills Platform · NISR Labour Evidence Aligned',
    hero_title: 'The Hub',
    hero_title_highlight: 'Enterprise Learning',
    hero_desc: 'A data-informed technical training and credentialing platform engineered around official National Institute of Statistics of Rwanda (NISR) labour demand. Features in-depth subtopic notes, mandatory 10-question module mastery quizzes, deterministic career paths, and bilingual peer study circles.',
    btn_explore_curriculum: 'Explore Curriculum',
    btn_career_paths: 'Career Pathways',
    btn_find_partner: 'Find Study Partner',
    btn_take_diagnostic: 'Take Diagnostic',

    // Metrics
    metric_curriculum: 'Modular Curriculum',
    metric_curriculum_sub: 'End-of-Module Quiz (≥8/10 to advance)',
    metric_paths: 'Career Paths',
    metric_paths_sub: 'Deterministic gap analysis & capstone briefs',
    metric_connect: 'Connect Pillar',
    metric_connect_sub: '40-min structured bilingual study sessions',
    metric_nisr: 'NISR LFS',
    metric_nisr_sub: 'Services sector employment share',

    // Courses & Quizzes
    courses_title: 'Curriculum Catalog & Module Mastery',
    courses_desc: 'Structured engineering and data pathways with in-depth subtopic notes, guided lectures, and mandatory 10-question multiple-choice quizzes with strict 8/10 mastery advancement gating.',
    courses_search_placeholder: 'Search courses, skills, or topics...',
    btn_view_curriculum: 'View Curriculum',
    btn_continue_course: 'Continue Course',
    btn_enroll: 'Enroll in Course',
    label_enrolled: 'Enrolled · Progress Tracking Active',
    label_progression: 'Course Progression',
    label_module_locked: 'Locked · Complete Previous Quiz with ≥8/10',
    label_module_passed: 'Passed',
    label_quiz_benchmark: 'Assessment Rule: You must score at least 8 out of 10 (80%) to complete this module and unlock the next step.',
    btn_start_quiz: 'Start 10-Question Quiz',
    btn_retake_quiz: 'Retake 10-Question Quiz',
    btn_submit_quiz: 'Submit 10-Question Quiz for Evaluation',
    btn_read_notes: 'Read Notes',
    btn_open_notes: 'Open Subtopic Notes',
    label_subtopics_title: 'Step-by-Step Subtopics (Click to Read In-Depth Explanatory Notes)',
    label_completed: 'Completed',
    label_pending: 'Pending',
    label_mark_completed: 'Mark as Completed',
    label_marked_completed: '✓ Marked as Completed',
    label_close_notes: 'Close Notes',
    label_close_continue: 'Close & Continue',
    btn_request_cert: 'Request Verified Certificate',
    label_cert_ready: 'All Modules Passed (Verified ≥ 8/10 on all quizzes)! Your official Certificate is ready.',

    // Learning Paths
    paths_title: 'Data-Informed Learning Pathways',
    paths_desc: 'Deterministic career tracks engineered around verified Rwandan labour market demand. Each pathway outlines required competencies, target scores, and practical capstone evidence.',
    label_nisr_evidence: 'Rwanda NISR Labour Market Evidence',
    label_competency_profile: 'Required Competency Profile vs Your Current Standing',
    label_capstone_req: 'Capstone Evidence Project Requirement',
    label_pathway_readiness: 'Pathway Readiness',
    label_targeted_remediations: 'Targeted Skill Remediations',

    // Peer Matching
    peer_title: 'Peer Learning & Language Exchange',
    peer_desc: 'Learning is inherently collaborative. Connect with Rwandan peers for structured 40-minute bilingual language exchanges (English & Kinyarwanda) and curated cohort study circles across engineering and data disciplines.',
    label_request_match: 'Request Language Exchange Match',
    label_lang_practice: 'Language I want to practice:',
    label_lang_support: 'Language I can support:',
    label_session_protocol: '40-Minute Session Protocol:',
    btn_find_matched_partner: 'Find Matched Partner',
    label_active_partners: 'Your Active Peer Study Partners',
    label_study_circles: 'Community Cohort Study Circles',

    // Skill Passport
    passport_title: 'Verified Skill Passport',
    passport_credentials_vault: 'Verified Certificates & SHA-256 Vault',
    passport_active_enrollments: 'Active Enrollments & Progression',
    btn_scan_qr: 'View & Scan QR Certificate',

    // Language Hub
    lang_hub_title: 'Multilingual Platform & Translation Hub',
    lang_hub_desc: 'In compliance with Rwanda’s official multilingual policy (Ikinyarwanda, English, Français), switch the entire interface language with one click or explore technical terms translated across all three languages.',
    lang_select_prompt: 'Select Platform Interface Language:',
    lang_current_active: 'Currently Active',
    lang_switch_to: 'Switch to',
    lang_glossary_title: 'Official Trilingual Technical Glossary'
  },

  fr: {
    // Navigation
    nav_overview: 'Aperçu',
    nav_courses: 'Cours & Modules',
    nav_paths: 'Parcours Métiers',
    nav_assessments: 'Évaluations',
    nav_peer: 'Apprentissage Pair',
    nav_passport: 'Passeport Compétences',
    nav_nisr: 'Données NISR',
    nav_employer: 'Recrutement Entreprises',
    nav_language: 'Traduire / Langues',
    nav_admin: 'Console Admin',
    nav_more: 'Plus',
    nav_other_tabs: 'Autres Onglets',
    nav_signin: 'Se Connecter / S\'inscrire',
    nav_signout: 'Déconnexion',
    nav_admin_badge: 'ADMIN',
    nav_title: 'The Hub',
    nav_country: 'Rwanda',
    nav_subtitle: 'Compétences & Données du Marché du Travail NISR',

    // Hero & Home
    hero_kicker: 'Plateforme Nationale des Compétences · Données NISR Vérifiées',
    hero_title: 'The Hub',
    hero_title_highlight: 'Formation d\'Entreprise',
    hero_desc: 'Plateforme de formation technique et de certification fondée sur les données officielles du marché du travail de l\'Institut National de la Statistique du Rwanda (NISR). Comprend des notes de cours détaillées, des quiz obligatoires de 10 questions avec seuil de réussite à 8/10, des parcours professionnels déterministes et des échanges linguistiques bilingues.',
    btn_explore_curriculum: 'Explorer le Programme',
    btn_career_paths: 'Parcours de Carrière',
    btn_find_partner: 'Trouver un Partenaire',
    btn_take_diagnostic: 'Passer le Diagnostic',

    // Metrics
    metric_curriculum: 'Programme Modulaire',
    metric_curriculum_sub: 'Quiz de Fin de Module (≥8/10 pour avancer)',
    metric_paths: 'Parcours Métiers',
    metric_paths_sub: 'Analyse déterministe des écarts & projets capstone',
    metric_connect: 'Pilier Connect',
    metric_connect_sub: 'Sessions d\'études bilingues structurées de 40 min',
    metric_nisr: 'NISR LFS',
    metric_nisr_sub: 'Part de l\'emploi dans le secteur des services',

    // Courses & Quizzes
    courses_title: 'Catalogue des Cours & Maîtrise Modulaire',
    courses_desc: 'Parcours structurés en ingénierie et science des données avec notes de cours approfondies, cours magistraux guidés et quiz obligatoires de 10 questions exigeant un score d\'au moins 8/10 pour débloquer la suite.',
    courses_search_placeholder: 'Rechercher des cours, compétences ou thématiques...',
    btn_view_curriculum: 'Voir le Programme',
    btn_continue_course: 'Continuer le Cours',
    btn_enroll: 'S\'inscrire au Cours',
    label_enrolled: 'Inscrit · Suivi de progression actif',
    label_progression: 'Progression du Cours',
    label_module_locked: 'Verrouillé · Réussir le quiz précédent avec ≥8/10',
    label_module_passed: 'Validé',
    label_quiz_benchmark: 'Règle d\'évaluation : Vous devez obtenir au moins 8 sur 10 (80%) pour valider ce module et débloquer l\'étape suivante.',
    btn_start_quiz: 'Démarrer le Quiz (10 Questions)',
    btn_retake_quiz: 'Repasser le Quiz (10 Questions)',
    btn_submit_quiz: 'Soumettre le Quiz pour Évaluation',
    btn_read_notes: 'Lire les Notes',
    btn_open_notes: 'Ouvrir les Notes du Sous-thème',
    label_subtopics_title: 'Sous-thèmes Étape par Étape (Cliquez pour lire les explications approfondies)',
    label_completed: 'Terminé',
    label_pending: 'En attente',
    label_mark_completed: 'Marquer comme Lu & Validé',
    label_marked_completed: '✓ Validé avec Succès',
    label_close_notes: 'Fermer les Notes',
    label_close_continue: 'Fermer & Continuer',
    btn_request_cert: 'Demander le Certificat Vérifié',
    label_cert_ready: 'Tous les modules sont validés (≥8/10 aux quiz) ! Votre certificat officiel est disponible.',

    // Learning Paths
    paths_title: 'Parcours d\'Apprentissage Fondés sur les Données',
    paths_desc: 'Filières professionnelles déterministes élaborées à partir de la demande vérifiée du marché du travail rwandais. Chaque parcours définit les compétences requises, les scores cibles et les livrables concrets.',
    label_nisr_evidence: 'Preuves du Marché du Travail - NISR Rwanda',
    label_competency_profile: 'Profil de Compétences Requis vs Votre Niveau Actuel',
    label_capstone_req: 'Exigence du Projet Capstone Professionnel',
    label_pathway_readiness: 'Niveau de Préparation au Parcours',
    label_targeted_remediations: 'Remédiations Ciblées des Compétences',

    // Peer Matching
    peer_title: 'Apprentissage entre Pairs & Échange Linguistique',
    peer_desc: 'L\'apprentissage est intrinsèquement collaboratif. Connectez-vous avec des pairs rwandais pour des échanges linguistiques bilingues structurés de 40 minutes (anglais et kinyarwanda) et rejoignez des cercles d\'études thématiques.',
    label_request_match: 'Demander un Jumelage Linguistique',
    label_lang_practice: 'Langue que je souhaite pratiquer :',
    label_lang_support: 'Langue que je peux enseigner :',
    label_session_protocol: 'Protocole de Session de 40 Minutes :',
    btn_find_matched_partner: 'Trouver un Partenaire Jumelé',
    label_active_partners: 'Vos Partenaires d\'Étude Actifs',
    label_study_circles: 'Cercles d\'Études Communautaires',

    // Skill Passport
    passport_title: 'Passeport National des Compétences',
    passport_credentials_vault: 'Coffre-fort de Certificats & Signatures SHA-256',
    passport_active_enrollments: 'Inscriptions Actives & Progression',
    btn_scan_qr: 'Afficher & Scanner le Certificat QR',

    // Language Hub
    lang_hub_title: 'Plateforme Multilingue & Hub de Traduction',
    lang_hub_desc: 'Conformément à la politique trilingue officielle du Rwanda (Ikinyarwanda, Français, Anglais), basculez l\'ensemble de l\'interface en un clic ou consultez le glossaire technique traduit dans les trois langues.',
    lang_select_prompt: 'Sélectionnez la Langue de l\'Interface :',
    lang_current_active: 'Actuellement Active',
    lang_switch_to: 'Passer en',
    lang_glossary_title: 'Glossaire Technique Trilingue Officiel'
  },

  rw: {
    // Navigation
    nav_overview: 'Incamake',
    nav_courses: 'Amasomo n\'Ibyiciro',
    nav_paths: 'Inzira z\'Umwuga',
    nav_assessments: 'Isuzuma n\'Ibizamini',
    nav_peer: 'Gusangira Ubumenyi',
    nav_passport: 'Ipasiporo y\'Ubumenyi',
    nav_nisr: 'Amakuru ya NISR',
    nav_employer: 'Guhuza n\'Abakoresha',
    nav_language: 'Guhindura Ururimi',
    nav_admin: 'Ubuyobozi bwa Sisitemu',
    nav_more: 'Ibindi',
    nav_other_tabs: 'Ibindi Byiciro',
    nav_signin: 'Kwinjira / Kwiyandikisha',
    nav_signout: 'Gusohoka',
    nav_admin_badge: 'UBURYOHE',
    nav_title: 'The Hub',
    nav_country: 'u Rwanda',
    nav_subtitle: 'Ubumenyi bw\'Ikoranabuhanga n\'Isoko ry\'Umurimo (NISR)',

    // Hero & Home
    hero_kicker: 'Urubuga rw\'Igihugu rw\'Ubumenyi · Bishingiye ku Mibare ya NISR',
    hero_title: 'The Hub',
    hero_title_highlight: 'Kwigisha Ikoranabuhanga',
    hero_desc: 'Urubuga rw\'igihugu rwo kwigisha ubumenyi n\'impamyabumenyi byishingikirije ku mibare y\'Ikigo cy\'Igihugu cy\'Ibarurishamibare mu Rwanda (NISR). Birimo ibisobanuro birambuye by\'amasomo, ibizamini byo ku rwego rwo hejuru by\'ibibazo 10 bisaba amanota 8/10 kugira ngo ukomeze, inzira z\'umwuga, no guhugurana mu ndimi.',
    btn_explore_curriculum: 'Reba Porogaramu y\'Amasomo',
    btn_career_paths: 'Inzira z\'Umwuga',
    btn_find_partner: 'Shaka Umufatanyabikorwa',
    btn_take_diagnostic: 'Kora Isuzuma-Shingiro',

    // Metrics
    metric_curriculum: 'Amasomo y\'Ibyiciro',
    metric_curriculum_sub: 'Ibizamini 10 kuri buri somo (≥8/10 kugira ngo ukomeze)',
    metric_paths: 'Inzira z\'Umwuga',
    metric_paths_sub: 'Gupima icyuho cy\'ubumenyi n\'imishinga ngiro',
    metric_connect: 'Inkingi yo Guhuza',
    metric_connect_sub: 'Ibiganiro by\'iminota 40 mu ndimi ebyiri',
    metric_nisr: 'Imibare ya NISR',
    metric_nisr_sub: 'Umugabane w\'abakora muri serivisi n\'ikoranabuhanga',

    // Courses & Quizzes
    courses_title: 'Urutonde rw\'Amasomo n\'Ibyiciro',
    courses_desc: 'Inzira zitunganyije muri tekiniki na siyansi y\'amakuru zifite inyandiko zisobanura buri gice, amasomo ya videwo, n\'ibizamini by\'ibibazo 10 bisaba amanota nibura 8/10 kugira ngo ufungure igice gikurikira.',
    courses_search_placeholder: 'Shakisha amasomo, ubuhanga, cyangwa ingingo...',
    btn_view_curriculum: 'Reba Porogaramu',
    btn_continue_course: 'Komeza Isomo',
    btn_enroll: 'Iyandikishe mu Isomo',
    label_enrolled: 'Wariyandikishije · Iterambere rirabarwa',
    label_progression: 'Iterambere ry\'Isomo',
    label_module_locked: 'Harafunze · Batsinda ikizamini cyabanje kuri ≥8/10',
    label_module_passed: 'Byatsinzwe',
    label_quiz_benchmark: 'Amategeko y\'isuzuma: Ugomba gutsinda nibura amanota 8 kuri 10 (80%) kugira ngo urangize iki gice ufungure gikurikira.',
    btn_start_quiz: 'Tangira Ikizamini cy\'Ibibazo 10',
    btn_retake_quiz: 'Ongera Ukore Ikizamini cy\'Ibibazo 10',
    btn_submit_quiz: 'Ohereza Ikizamini Kugira Ngo Gisuzumwe',
    btn_read_notes: 'Soma Ibisobanuro',
    btn_open_notes: 'Fungura Inyandiko z\'Iki Gice',
    label_subtopics_title: 'Ibyiciro by\'Isomo Intambwe ku Yindi (Kanda usome ibisobanuro byimbitse)',
    label_completed: 'Byarangiye',
    label_pending: 'Bitegerejwe',
    label_mark_completed: 'Emeza ko Wabisomye',
    label_marked_completed: '✓ Byemejwe ko Byarangiye',
    label_close_notes: 'Funga Inyandiko',
    label_close_continue: 'Funga Ukomeze',
    btn_request_cert: 'Saba Impamyabushobozi Yemejwe',
    label_cert_ready: 'Watsinze ibyiciro byose (≥8/10 mu bizamini)! Impamyabushobozi yawe iriteguye.',

    // Learning Paths
    paths_title: 'Inzira z\'Umwuga Zishingiye ku Mibare',
    paths_desc: 'Inzira z\'akazi zashyizweho hashingiwe ku bisabwa n\'isoko ry\'umurimo mu Rwanda. Buri nzira igaragaza ubumenyi bukenewe, amanota asabwa, n\'imishinga ngiro yo kugaragaza ubushobozi.',
    label_nisr_evidence: 'Ibimenyetso by\'Isoko ry\'Umurimo (NISR Rwanda)',
    label_competency_profile: 'Ubumenyi Busabwa vs Urwego Uriho Ubu',
    label_capstone_req: 'Ibisabwa ku Mushinga Ngiro (Capstone)',
    label_pathway_readiness: 'Urwego rwo Kwitegura Umwuga',
    label_targeted_remediations: 'Amasomo Yo Kunganira Ahari Icyuho',

    // Peer Matching
    peer_title: 'Gusangira Ubumenyi no Kwigana Indimi',
    peer_desc: 'Kwigira hamwe birushaho gutanga umusaruro. Huza n\'abandi banyarwanda mu biganiro by\'iminota 40 byo kungurana ubumenyi mu ndimi (Icyongereza n\'Ikinyarwanda) no mu matsinda y\'ubumenyi.',
    label_request_match: 'Saba Guhuzwa n\'Umufatanyabikorwa mu Ndimi',
    label_lang_practice: 'Ururimi nshaka kwimenyerezamo:',
    label_lang_support: 'Ururimi nshobora gufashamo abandi:',
    label_session_protocol: 'Gahunda y\'Iminota 40 y\'Ikiganiro:',
    btn_find_matched_partner: 'Shaka Umufatanyabikorwa Wahujwe Nawe',
    label_active_partners: 'Abo Mufatanyije Kwiga Kuri Ubu',
    label_study_circles: 'Amatsinda yo Kwiga mu Muryango',

    // Skill Passport
    passport_title: 'Ipasiporo y\'Igihugu y\'Ubumenyi',
    passport_credentials_vault: 'Ububiko bw\'Impamyabushobozi na SHA-256',
    passport_active_enrollments: 'Amasomo Uri Kwiga n\'Iterambere',
    btn_scan_qr: 'Reba no Gusikana Impamyabumenyi ya QR',

    // Language Hub
    lang_hub_title: 'Urubuga rw\'Indimi Nyinshi no Gusobanura',
    lang_hub_desc: 'Mu rwego rwo kubahiriza politiki y\'u Rwanda y\'indimi zemewe n\'amategeko (Ikinyarwanda, Icyongereza, n\'Igifaransa), hindura ururimi rwose rw\'urubuga ukoresheje gukanda rimwe cyangwa usome amagambo y\'ikoranabuhanga mu ndimi zose uko ari eshatu.',
    lang_select_prompt: 'Hitamo Ururimi Urubuga Ruri Bukoreshe:',
    lang_current_active: 'Ururimi Ruri Gukoreshwa Kuri Ubu',
    lang_switch_to: 'Hindura Ujye muri',
    lang_glossary_title: 'Inkoranyamagambo y\'Ikoranabuhanga mu Ndimi Ebyiri n\'Ikinyarwanda'
  }
};

// Official Rwanda trilingual technical computing glossary
export const technicalGlossary = [
  {
    en: 'Asynchronous I/O',
    fr: 'Entrées/Sorties Asynchrones',
    rw: 'Ibyinjira n\'Ibisohoka bidasaba gutegereza (Asynchronous)',
    definition: 'Handling concurrent input/output operations without freezing the execution thread.'
  },
  {
    en: 'Relational Database',
    fr: 'Base de données relationnelle',
    rw: 'Ububiko bw\'amakuru bufitanye isano (Relational DB)',
    definition: 'Structured storage organizing data into tables with foreign keys and constraints.'
  },
  {
    en: 'Dependency Injection',
    fr: 'Injection de dépendances',
    rw: 'Kwinjiza ibikoresho n\'imikoranire (Dependency Injection)',
    definition: 'Design pattern passing required services into functions rather than hardcoding them.'
  },
  {
    en: 'Cryptographic Hash (SHA-256)',
    fr: 'Hachage cryptographique (SHA-256)',
    rw: 'Umutekano n\'ikimenyetso kidahinduka cy\'imibare (SHA-256)',
    definition: 'One-way mathematical function producing a unique 256-bit signature for credential verification.'
  },
  {
    en: 'Labour Force Participation Rate (LFPR)',
    fr: 'Taux de participation au marché du travail',
    rw: 'Igipimo cy\'abari mu murimo mu baturage bagejeje igihe (LFPR)',
    definition: 'Proportion of the working-age population (16+) economically active according to NISR.'
  },
  {
    en: 'Machine Learning Gradient Descent',
    fr: 'Descente de gradient (Apprentissage Automatique)',
    rw: 'Kunoza imikorere y\'ubwenge bw\'ubukorano (Gradient Descent)',
    definition: 'Optimization algorithm iteratively calculating partial derivatives to minimize model loss.'
  },
  {
    en: 'Continuous Integration & Deployment (CI/CD)',
    fr: 'Intégration et déploiement continus (CI/CD)',
    rw: 'Isuzumwa n\'ishyirwaho rihoraho rya porogaramu (CI/CD)',
    definition: 'Automated software delivery pipeline building, testing, and deploying changes reliably.'
  },
  {
    en: 'IoT Sensor Telemetry',
    fr: 'Télémétrie des capteurs IoT',
    rw: 'Gukusanya amakuru y\'ibyuma byo mu murima ku kure (IoT)',
    definition: 'Transmitting real-time environmental measurements from microcontrollers via MQTT protocols.'
  }
];

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('hub_language') || 'en';
  });

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('hub_language', lang);
  };

  const t = (key, fallback) => {
    const langDict = translations[language] || translations.en;
    if (langDict[key]) return langDict[key];
    if (translations.en[key]) return translations.en[key];
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations, technicalGlossary }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
