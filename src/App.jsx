import { useState, useEffect } from 'react';
import { isEvening, buildTheme, ThemeCtx } from './theme.js';
import { defaultDiet, sportDiet } from './dietData.js';
import Header from './components/Header.jsx';
import ViewSwitch from './components/ViewSwitch.jsx';
import TabBar from './components/TabBar.jsx';
import MealView from './components/MealView.jsx';
import { NoteModal, InfoModal, ImportModal } from './components/Modals.jsx';

const STORAGE = {
  normale: { key: 'dieta-data', fallback: defaultDiet, label: 'Dieta normale', file: 'dieta.json' },
  sport:   { key: 'dieta-data-sport', fallback: sportDiet, label: 'Giorno Sport', file: 'dieta-sport.json' },
};

function loadDiet(view) {
  try {
    const saved = localStorage.getItem(STORAGE[view].key);
    return saved ? JSON.parse(saved) : STORAGE[view].fallback;
  } catch { return STORAGE[view].fallback; }
}

export default function App() {
  /* ── Tema ── */
  const [mode, setMode] = useState(() => localStorage.getItem('dieta-tm') || 'auto');
  const [dark, setDark] = useState(() => {
    const m = localStorage.getItem('dieta-tm') || 'auto';
    return m === 'dark' || (m === 'auto' && isEvening());
  });

  /* Aggiorna auto ogni minuto */
  useEffect(() => {
    if (mode !== 'auto') return;
    const tick = () => setDark(isEvening());
    tick();
    const iv = setInterval(tick, 60000);
    return () => clearInterval(iv);
  }, [mode]);

  /* Ciclo: auto → forza-opposto → altro → auto */
  const cycleMode = () => {
    setMode(prev => {
      let next;
      if (prev === 'auto')  next = dark ? 'light' : 'dark';
      else if (prev === 'light') next = 'dark';
      else next = 'auto';
      localStorage.setItem('dieta-tm', next);
      if (next === 'dark')       setDark(true);
      else if (next === 'light') setDark(false);
      else                       setDark(isEvening());
      return next;
    });
  };

  /* ── Vista: dieta normale vs giorno sport (affiancate, non sostitutive) ── */
  const [view, setView] = useState(() => localStorage.getItem('dieta-view') || 'normale');

  /* ── Dati dieta: uno stato indipendente per ciascuna vista ── */
  const [dietNormale, setDietNormale] = useState(() => loadDiet('normale'));
  const [dietSport,   setDietSport]   = useState(() => loadDiet('sport'));

  const diet    = view === 'sport' ? dietSport : dietNormale;
  const setDiet = view === 'sport' ? setDietSport : setDietNormale;

  const [activeTab, setActiveTab] = useState(
    () => localStorage.getItem('dieta-tab') || diet.pasti[0].id
  );
  const [expandedBlocks, setExpandedBlocks] = useState({});
  const [activeNote,  setActiveNote]  = useState(null);
  const [showInfo,    setShowInfo]    = useState(false);
  const [showImport,  setShowImport]  = useState(false);

  const handleTabChange = id => {
    setActiveTab(id);
    localStorage.setItem('dieta-tab', id);
  };

  const handleViewChange = id => {
    if (id === view) return;
    setView(id);
    localStorage.setItem('dieta-view', id);
    setExpandedBlocks({});
    const nextDiet = id === 'sport' ? dietSport : dietNormale;
    if (!nextDiet.pasti.find(p => p.id === activeTab)) {
      handleTabChange(nextDiet.pasti[0].id);
    }
  };

  const toggleBlock = key =>
    setExpandedBlocks(prev => ({ ...prev, [key]: !prev[key] }));

  const handleImport = newDiet => {
    setDiet(newDiet);
    setActiveTab(newDiet.pasti[0].id);
    setExpandedBlocks({});
    localStorage.setItem(STORAGE[view].key, JSON.stringify(newDiet));
    localStorage.setItem('dieta-tab', newDiet.pasti[0].id);
    setShowImport(false);
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(diet, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = STORAGE[view].file;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  const theme        = buildTheme(dark);
  const currentMeal  = diet.pasti.find(p => p.id === activeTab);
  const activeNoteObj = activeNote !== null ? diet.note.find(n => n.id === activeNote) : null;

  return (
    <ThemeCtx.Provider value={theme}>
      <div style={{ fontFamily: theme.font, background: theme.bgPage, minHeight: '100dvh', maxWidth: 600, margin: '0 auto', transition: 'background-color 0.25s ease' }}>
        <Header
          diet={diet} mode={mode} dark={dark}
          onThemeToggle={cycleMode}
          onInfoClick={() => setShowInfo(true)}
          onImportClick={() => setShowImport(true)}
        />
        <ViewSwitch view={view} onChange={handleViewChange} />
        <TabBar pasti={diet.pasti} activeTab={activeTab} onTabChange={handleTabChange} />
        {currentMeal && (
          <MealView
            meal={currentMeal}
            expandedBlocks={expandedBlocks}
            onToggle={toggleBlock}
            onNoteClick={ref => setActiveNote(ref)}
            ciclismo={diet.ciclismo}
          />
        )}
      </div>

      {activeNote !== null && (
        <NoteModal noteId={activeNote} noteText={activeNoteObj?.testo} onClose={() => setActiveNote(null)} />
      )}
      {showInfo   && <InfoModal indicazioni={diet.indicazioniGenerali || defaultDiet.indicazioniGenerali} onClose={() => setShowInfo(false)} />}
      {showImport && (
        <ImportModal
          diet={diet}
          viewLabel={STORAGE[view].label}
          onImport={handleImport}
          onExport={handleExport}
          onClose={() => setShowImport(false)}
        />
      )}
    </ThemeCtx.Provider>
  );
}
