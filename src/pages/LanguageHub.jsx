import React, { useState } from 'react';
import {
  Globe,
  Languages,
  Check,
  Search,
  BookOpen,
  ArrowRight,
  Sparkles,
  Layers,
  Copy,
  CheckCheck,
  FileText,
  HelpCircle,
  Cpu
} from 'lucide-react';
import { useLanguage, technicalGlossary } from '../context/LanguageContext';

export default function LanguageHub({ user, onOpenAuth }) {
  const { language, setLanguage, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [customText, setCustomText] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const languageOptions = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      region: 'Rwanda Official & International',
      role: 'Primary International Technical & Commercial Language',
      description: 'Used across global engineering repositories, international labor market diagnostics, and university research curricula.',
      samplePhrase: 'Score at least 8 out of 10 on the end-of-module quiz to unlock the next progression step.'
    },
    {
      code: 'fr',
      name: 'French',
      nativeName: 'Français',
      region: 'Langue Officielle & Francophonie',
      role: 'Langue officielle pour l\'administration, l\'enseignement et la coopération régionale',
      description: 'Largement utilisé dans les institutions publiques, le commerce régional de la Communauté d\'Afrique de l\'Est (CAE) et les partenariats internationaux.',
      samplePhrase: 'Obtenez au moins 8 sur 10 au quiz de fin de module pour débloquer l\'étape suivante de votre formation.'
    },
    {
      code: 'rw',
      name: 'Kinyarwanda',
      nativeName: 'Ikinyarwanda',
      region: 'Ururimi rw\'Igihugu cy\'u Rwanda',
      role: 'Ururimi rw\'Igihugu rugenga umuryango nyarwanda n\'itumanaho rusange',
      description: 'Ururimi kavukire ruhesha agaciro ubumenyi n\'umuco, rukaba runakoreshwa mu gushyira amakuru y\'ikoranabuhanga n\'umurimo mu buryo bworohereye buri munyarwanda.',
      samplePhrase: 'Batsinda nibura amanota 8 kuri 10 mu kizamini gisoza igice kugira ngo ufungure intambwe ikurikira.'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Terms / Amagambo Yose' },
    { id: 'software', label: 'Software & Systems' },
    { id: 'data', label: 'Data & NISR Labour Intel' },
    { id: 'security', label: 'Security & Verification' }
  ];

  // Extended trilingual terminology items
  const extendedGlossary = [
    ...technicalGlossary,
    {
      en: 'End-of-Module Mastery Quiz',
      fr: 'Quiz de Maîtrise de Fin de Module',
      rw: 'Ikizamini cyo Gusoza Igice cy\'Isomo',
      category: 'software',
      definition: 'A 10-question evaluation requiring a minimum score of 8/10 (80%) before progression is permitted.'
    },
    {
      en: 'Skill Passport Credential',
      fr: 'Titre de Compétence du Passeport',
      rw: 'Impamyabushobozi y\'Ipasiporo y\'Ubumenyi',
      category: 'security',
      definition: 'Cryptographically signed digital accreditation containing verifiable competency milestones.'
    },
    {
      en: 'Bilingual Peer Study Circle',
      fr: 'Cercle d\'Étude Bilingue entre Pairs',
      rw: 'Itsinda ryo Kwigana mu Ndimi Ebyiri',
      category: 'software',
      definition: 'A 40-minute synchronous collaboration session pairing language learners for dual-language technical review.'
    },
    {
      en: 'Labour Force Survey (LFS)',
      fr: 'Enquête sur les Forces de Travail (EFT)',
      rw: 'Ubushakashatsi ku Barari mu Murimo (LFS)',
      category: 'data',
      definition: 'Quarterly statistical publication from NISR assessing employment, unemployment, and industry demographics.'
    },
    {
      en: 'Subtopic Explanatory Notes',
      fr: 'Notes Explicatives des Sous-thèmes',
      rw: 'Inyandiko Zisobanura Ibyiciro by\'Isomo',
      category: 'software',
      definition: 'In-depth didactic material providing theoretical foundations, code snippets, and Rwandan operational context.'
    },
    {
      en: 'Deterministic Career Pathway',
      fr: 'Filière Métier Déterministe',
      rw: 'Inzira y\'Umwuga Itagira Ugushidikanya',
      category: 'data',
      definition: 'A structured roadmap mapping verified job requisites directly to evaluated curriculum modules.'
    }
  ];

  const filteredGlossary = extendedGlossary.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.en.toLowerCase().includes(q) ||
      item.fr.toLowerCase().includes(q) ||
      item.rw.toLowerCase().includes(q) ||
      (item.definition && item.definition.toLowerCase().includes(q));

    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'software' && (item.category === 'software' || !item.category)) ||
      (selectedCategory === 'data' && (item.category === 'data' || item.en.includes('Labour') || item.en.includes('Machine'))) ||
      (selectedCategory === 'security' && (item.category === 'security' || item.en.includes('Hash') || item.en.includes('Cryptographic')));

    return matchesSearch && matchesCategory;
  });

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Sample phrases for quick live translation tester
  const presetPhrases = [
    {
      en: 'Enroll in course and track learning milestones',
      fr: 'S\'inscrire au cours et suivre les étapes d\'apprentissage',
      rw: 'Iyandikishe mu isomo maze ukurikirane intambwe z\'imyigire'
    },
    {
      en: 'Score at least 8 out of 10 to advance to the next step',
      fr: 'Obtenez au moins 8 sur 10 pour passer à l\'étape suivante',
      rw: 'Batsinda nibura amanota 8 kuri 10 kugira ngo ukomeze ku yindi ntambwe'
    },
    {
      en: 'Read in-depth explanatory notes for this subtopic',
      fr: 'Lire les notes explicatives approfondies de ce sous-thème',
      rw: 'Soma inyandiko zisobanura birambuye iki gice cy\'isomo'
    },
    {
      en: 'Cryptographically verified with SHA-256 digital signature',
      fr: 'Cryptographiquement vérifié avec une signature numérique SHA-256',
      rw: 'Byemejwe mu buryo bw\'ikoranabuhanga rikomeye rya SHA-256'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      {/* IBM Carbon Header Zone */}
      <section className="bg-white border-b border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-wider">
            <span className="text-blue-700 font-semibold">Trilingual Architecture</span>
            <span>/</span>
            <span>Rwanda National Policy Aligned</span>
            <span>/</span>
            <span className="text-slate-700 font-bold">Ikinyarwanda · English · Français</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <h1 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight">
                {t('lang_hub_title', 'Multilingual Platform & Translation Hub')}
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {t(
                  'lang_hub_desc',
                  'In compliance with Rwanda’s official multilingual policy (Ikinyarwanda, English, Français), switch the entire interface language with one click or explore technical terms translated across all three languages.'
                )}
              </p>
            </div>

            {/* Current Active Language Indicator */}
            <div className="bg-slate-50 border border-slate-300 p-4 shrink-0 flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center border border-blue-700 font-mono font-bold text-sm">
                {language.toUpperCase()}
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">
                  {t('lang_current_active', 'Currently Active Language')}
                </div>
                <div className="text-sm font-bold text-slate-900">
                  {language === 'en' ? 'English (Official / Int.)' : language === 'fr' ? 'Français (Officiel)' : 'Ikinyarwanda (Ururimi rw\'Igihugu)'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Language Switcher Selector Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="text-sm font-mono uppercase tracking-wider text-slate-700 font-semibold flex items-center gap-2">
              <Languages className="w-4 h-4 text-blue-600" />
              <span>{t('lang_select_prompt', 'Select Platform Interface Language:')}</span>
            </h2>
            <span className="text-xs text-slate-500 font-mono">
              Instantly persists in browser session
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {languageOptions.map((opt) => {
              const isCurrent = language === opt.code;
              return (
                <div
                  key={opt.code}
                  className={`bg-white border p-6 flex flex-col justify-between transition-all ${
                    isCurrent
                      ? 'border-blue-600 shadow-md ring-1 ring-blue-600/30'
                      : 'border-slate-300 hover:border-slate-400'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                          {opt.region}
                        </span>
                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mt-0.5">
                          <span>{opt.nativeName}</span>
                          <span className="text-xs font-mono font-normal text-slate-500">({opt.name})</span>
                        </h3>
                      </div>
                      <span className="px-2 py-0.5 font-mono text-xs font-bold border uppercase tracking-wider bg-slate-100 text-slate-700 border-slate-300">
                        {opt.code.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {opt.description}
                    </p>

                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block mb-1">
                        Interface Live Sample:
                      </span>
                      <p className="text-xs italic text-slate-700 bg-slate-50 p-2.5 border border-slate-200 leading-relaxed">
                        "{opt.samplePhrase}"
                      </p>
                    </div>
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-200">
                    {isCurrent ? (
                      <div className="w-full py-2.5 bg-blue-50 border border-blue-600 text-blue-900 font-bold text-xs uppercase font-mono tracking-wider flex items-center justify-center gap-2">
                        <Check className="w-4 h-4 text-blue-700" />
                        <span>{t('lang_current_active', 'Currently Active')}</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => setLanguage(opt.code)}
                        className="w-full py-2.5 bg-slate-900 hover:bg-blue-600 text-white font-medium text-xs uppercase font-mono tracking-wider transition-colors flex items-center justify-center gap-2"
                      >
                        <span>{t('lang_switch_to', 'Switch to')} {opt.nativeName}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trilingual Phrase & Live Translation Bench */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="bg-white border border-slate-300 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900 tracking-tight uppercase font-mono">
                  Interactive Trilingual Platform Translator
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Compare official translations of standard curriculum instructions and NISR labour metrics.
              </p>
            </div>
            <span className="text-[11px] font-mono text-blue-700 bg-blue-50 px-2.5 py-1 border border-blue-200">
              Deterministic 3-Way Equivalence
            </span>
          </div>

          {/* Quick preset selector buttons */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-slate-500 tracking-wider">
              Common Technical Prompts:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {presetPhrases.map((phrase, idx) => (
                <button
                  key={idx}
                  onClick={() => setCustomText(phrase.en)}
                  className="text-left text-xs p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors flex items-center justify-between group"
                >
                  <span className="truncate text-slate-700 font-medium group-hover:text-blue-700">
                    "{phrase.en}"
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Selected Phrase 3-Column Display */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
            {presetPhrases.map((item, idx) => {
              // Highlight selected or show first by default
              const isSelected = customText === item.en || (!customText && idx === 1);
              if (!isSelected) return null;

              return (
                <React.Fragment key={idx}>
                  <div className="bg-slate-50 border border-slate-300 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold uppercase text-slate-700 tracking-wider">
                        English (EN)
                      </span>
                      <button
                        onClick={() => handleCopy(item.en, `p-en-${idx}`)}
                        className="text-slate-400 hover:text-slate-700 p-1"
                        title="Copy text"
                      >
                        {copiedId === `p-en-${idx}` ? (
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-slate-900 font-medium leading-relaxed">
                      {item.en}
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-300 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold uppercase text-slate-700 tracking-wider">
                        Français (FR)
                      </span>
                      <button
                        onClick={() => handleCopy(item.fr, `p-fr-${idx}`)}
                        className="text-slate-400 hover:text-slate-700 p-1"
                        title="Copy text"
                      >
                        {copiedId === `p-fr-${idx}` ? (
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-slate-900 font-medium leading-relaxed">
                      {item.fr}
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-300 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold uppercase text-slate-700 tracking-wider">
                        Ikinyarwanda (RW)
                      </span>
                      <button
                        onClick={() => handleCopy(item.rw, `p-rw-${idx}`)}
                        className="text-slate-400 hover:text-slate-700 p-1"
                        title="Copy text"
                      >
                        {copiedId === `p-rw-${idx}` ? (
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-slate-900 font-medium leading-relaxed">
                      {item.rw}
                    </p>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* Official Trilingual Technical Glossary */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-base font-mono uppercase tracking-wider text-slate-900 font-bold flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>{t('lang_glossary_title', 'Official Trilingual Technical Glossary')}</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Standardized computing, data science, and Rwandan labour market terminology.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1 font-mono text-xs">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3 py-1.5 border transition-colors ${
                    selectedCategory === c.id
                      ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                      : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search term in English, Français, cyangwa Ikinyarwanda..."
              className="w-full bg-white border border-slate-300 pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-600 transition-colors font-sans"
            />
          </div>

          {/* Terminology Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {filteredGlossary.map((term, index) => (
              <div
                key={index}
                className="bg-white border border-slate-300 p-5 space-y-4 hover:border-blue-600 transition-colors flex flex-col justify-between shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-blue-700 tracking-wider font-semibold">
                        Technical Concept #{index + 1}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 mt-0.5">
                        {term.en}
                      </h4>
                    </div>
                    <button
                      onClick={() => handleCopy(`${term.en} | ${term.fr} | ${term.rw}`, `term-${index}`)}
                      className="text-slate-400 hover:text-slate-700 p-1"
                      title="Copy all translations"
                    >
                      {copiedId === `term-${index}` ? (
                        <CheckCheck className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="space-y-2 bg-slate-50 p-3 border border-slate-200">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-[10px] font-mono uppercase text-slate-500 w-8 shrink-0 font-bold">FR:</span>
                      <span className="text-xs font-semibold text-slate-800">{term.fr}</span>
                    </div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-[10px] font-mono uppercase text-blue-800 w-8 shrink-0 font-bold">RW:</span>
                      <span className="text-xs font-semibold text-blue-900">{term.rw}</span>
                    </div>
                  </div>

                  {term.definition && (
                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      {term.definition}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Accreditation Standard</span>
                  <span>NISR / NIST Aligned</span>
                </div>
              </div>
            ))}
          </div>

          {filteredGlossary.length === 0 && (
            <div className="bg-white border border-slate-300 p-12 text-center space-y-2">
              <p className="text-sm font-semibold text-slate-700">No matching technical terms found</p>
              <p className="text-xs text-slate-500">
                Try searching for 'asynchronous', 'database', 'LFPR', or 'SHA-256'.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
