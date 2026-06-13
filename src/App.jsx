import { useState, useEffect } from 'react';
import { isEvening, buildTheme, ThemeCtx } from './theme.js';
import { defaultDiet } from './dietData.js';
import Header from './components/Header.jsx';
import TabBar from './components/TabBar.jsx';
import MealView from './components/MealView.jsx';
import { NoteModal, InfoModal, ImportModal } from './components/Modals.jsx';

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

  /* ── Dati dieta ── */
  const [diet, setDiet] = useState(() => {
    try {
      const saved = localStorage.getItem('dieta-data');
      return saved ? JSON.parse(saved) : defaultDiet;
    } catch { return defaultDiet; }
  });

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

  const toggleBlock = key =>
    setExpandedBlocks(prev => ({ ...prev, [key]: !prev[key] }));

  const handleImport = newDiet => {
    setDiet(newDiet);
    setActiveTab(newDiet.pasti[0].id);
    setExpandedBlocks({});
    localStorage.setItem('dieta-data', JSON.stringify(newDiet));
    localStorage.setItem('dieta-tab', newDiet.pasti[0].id);
    setShowImport(false);
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(diet, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'dieta.json';
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
      {showInfo   && <InfoModal indicazioni={diet.indicazioniGenerali} onClose={() => setShowInfo(false)} />}
      {showImport && <ImportModal diet={diet} onImport={handleImport} onExport={handleExport} onClose={() => setShowImport(false)} />}
    </ThemeCtx.Provider>
  );
}
