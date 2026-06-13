import { useTheme } from '../theme.js';
import FoodBlock from './FoodBlock.jsx';

function CyclingSection({ ciclismo }) {
  const t = useTheme();
  if (!ciclismo) return null;
  return (
    <details style={{ marginTop: 16, background: t.bgCycling, border: `1px solid ${t.bdrCycling}`, borderRadius: 14, overflow: 'hidden' }}>
      <summary style={{ padding: '12px 16px', fontWeight: 700, color: t.txCycHdr, cursor: 'pointer', fontSize: 14, userSelect: 'none' }}>
        🚴 {ciclismo.titolo}
      </summary>
      <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {ciclismo.corpo.map((para, i) => (
          <p key={i} style={{ margin: 0, fontSize: 13, color: t.txCycBody, lineHeight: 1.6 }}>{para}</p>
        ))}
        <p style={{ margin: '8px 0 4px', fontWeight: 700, color: t.txCycHdr, fontSize: 13 }}>Suggerimenti pratici:</p>
        <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {ciclismo.suggerimenti.map((s, i) => (
            <li key={i} style={{ fontSize: 13, color: t.txCycBody, lineHeight: 1.6 }}>{s}</li>
          ))}
        </ul>
      </div>
    </details>
  );
}

export default function MealView({ meal, expandedBlocks, onToggle, onNoteClick, ciclismo }) {
  const t = useTheme();
  return (
    <div style={{ padding: '0 14px 32px' }}>
      <div style={{ padding: '14px 2px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 10.5, fontWeight: 700, color: t.txMuted, letterSpacing: '0.9px', textTransform: 'uppercase' }}>
          {meal.nome} · {meal.blocchi.length} {meal.blocchi.length === 1 ? 'alimento' : 'alimenti'}
        </span>
        <span style={{ fontSize: 10, color: t.txMuted, fontWeight: 500 }}>peso a crudo</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {meal.blocchi.map((blocco, idx) => {
          const key = meal.id + '-' + idx;
          return (
            <FoodBlock key={key} blocco={blocco} blockKey={key} expanded={!!expandedBlocks[key]} onToggle={onToggle} onNoteClick={onNoteClick} />
          );
        })}
      </div>
      <CyclingSection ciclismo={ciclismo} />
    </div>
  );
}
