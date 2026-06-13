import { useState } from 'react';
import { useTheme } from '../theme.js';
import { IcoX, IcoSave } from '../Icons.jsx';

export function NoteModal({ noteId, noteText, onClose }) {
  const t = useTheme();
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 50, padding: 16 }}
      onClick={onClose}>
      <div style={{ background: t.bgModal, borderRadius: 16, maxWidth: 480, width: '100%', padding: 20, border: `1px solid ${t.bdrModal}` }}
        onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontWeight: 700, color: t.txModalTi, fontSize: 15 }}>Nota {noteId}</span>
          <button onClick={onClose} style={{ padding: 4 }}><IcoX c={t.txMuted} s={18} /></button>
        </div>
        <p style={{ margin: 0, fontSize: 14, color: t.txModal, lineHeight: 1.65 }}>
          {noteText || 'Nota non trovata.'}
        </p>
      </div>
    </div>
  );
}

export function InfoModal({ indicazioni, onClose }) {
  const t = useTheme();
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 50, padding: 16 }}
      onClick={onClose}>
      <div style={{ background: t.bgModal, borderRadius: 16, maxWidth: 480, width: '100%', maxHeight: '80vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: `1px solid ${t.bdrModal}` }}
        onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px 14px', borderBottom: `1px solid ${t.bdrModal}`, flexShrink: 0 }}>
          <span style={{ fontWeight: 700, color: t.txModalTi, fontSize: 16 }}>Indicazioni alimentari generali</span>
          <button onClick={onClose} style={{ padding: 4 }}><IcoX c={t.txMuted} s={18} /></button>
        </div>
        <div style={{ overflowY: 'auto', padding: '16px 20px 20px' }}>
          <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {indicazioni.map((ind, i) => (
              <li key={i} style={{ fontSize: 13.5, color: t.txModal, lineHeight: 1.65 }}>{ind}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function ImportModal({ diet, onImport, onExport, onClose }) {
  const t = useTheme();
  const [text,  setText]  = useState('');
  const [error, setError] = useState('');

  const handleImport = () => {
    try {
      const parsed = JSON.parse(text);
      if (!parsed.pasti || !Array.isArray(parsed.pasti)) {
        setError('Il JSON deve contenere un array "pasti".');
        return;
      }
      onImport(parsed);
    } catch (e) {
      setError('JSON non valido: ' + e.message);
    }
  };

  const canImport = text.trim().length > 0;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 50, padding: 16 }}
      onClick={onClose}>
      <div style={{ background: t.bgModal, borderRadius: 16, maxWidth: 480, width: '100%', maxHeight: '85vh', display: 'flex', flexDirection: 'column', border: `1px solid ${t.bdrModal}`, overflow: 'hidden' }}
        onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px 14px', borderBottom: `1px solid ${t.bdrModal}`, flexShrink: 0 }}>
          <span style={{ fontWeight: 700, color: t.txModalTi, fontSize: 16 }}>Gestione dati dieta</span>
          <button onClick={onClose} style={{ padding: 4 }}><IcoX c={t.txMuted} s={18} /></button>
        </div>
        <div style={{ overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
          <p style={{ margin: 0, fontSize: 13, color: t.txModal, lineHeight: 1.55 }}>
            Per caricare una nuova dieta incolla qui il JSON. Esporta la dieta attuale per usarla come riferimento di formato.
          </p>
          <button onClick={onExport}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: t.bgExport, color: t.txExport, borderRadius: 10, padding: '10px 16px', fontSize: 13, fontWeight: 600, border: `1px solid ${t.bdrExport}`, cursor: 'pointer' }}>
            <IcoSave c={t.txExport} s={14} /> Esporta dieta attuale (JSON)
          </button>
          <textarea value={text} onChange={e => { setText(e.target.value); setError(''); }}
            placeholder="Incolla qui il JSON della nuova dieta..."
            style={{ width: '100%', height: 140, background: t.bgInput, border: `1px solid ${t.bdrInput}`, borderRadius: 10, padding: 12, fontSize: 12, fontFamily: 'monospace', resize: 'none', outline: 'none', color: t.txInput }} />
          {error && <p style={{ margin: 0, fontSize: 12, color: '#EF4444' }}>{error}</p>}
          <button onClick={handleImport} disabled={!canImport}
            style={{ background: canImport ? t.bgImportBtn : (t.dark ? '#1A2438' : '#E5E7EB'), color: canImport ? t.txImportBtn : t.txMuted, borderRadius: 10, padding: '12px 16px', fontSize: 14, fontWeight: 700, cursor: canImport ? 'pointer' : 'default' }}>
            Carica nuova dieta
          </button>
        </div>
      </div>
    </div>
  );
}
