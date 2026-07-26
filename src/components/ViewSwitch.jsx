import { useTheme } from '../theme.js';
import { IcoZap } from '../Icons.jsx';

const OPTIONS = [
  { id: 'normale', label: 'Dieta' },
  { id: 'sport', label: 'Giorno Sport' },
];

export default function ViewSwitch({ view, onChange }) {
  const t = useTheme();
  return (
    <div style={{ position: 'sticky', top: 71, zIndex: 15, background: t.bgTabBar, borderBottom: `1px solid ${t.bdrTabBar}`, padding: '8px 14px' }}>
      <div style={{ display: 'flex', background: t.bgSurfAlt, borderRadius: 12, padding: 3, gap: 3 }}>
        {OPTIONS.map(o => {
          const active = view === o.id;
          return (
            <button key={o.id} onClick={() => onChange(o.id)}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '8px 10px', borderRadius: 9, background: active ? t.bgTabAct : 'transparent' }}>
              {o.id === 'sport' && <IcoZap c={active ? t.txTabAct : t.txTabInact} s={13} />}
              <span style={{ fontSize: 12.5, fontWeight: active ? 700 : 600, color: active ? t.txTabAct : t.txTabInact }}>
                {o.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
