import { useTheme } from '../theme.js';
import { TAB_ICONS } from '../Icons.jsx';

export default function TabBar({ pasti, activeTab, onTabChange }) {
  const t = useTheme();

  return (
    <div style={{ position: 'sticky', top: 124, zIndex: 10, background: t.bgTabBar, borderBottom: `1px solid ${t.bdrTabBar}`, boxShadow: t.showIcons ? '0 1px 8px rgba(0,0,0,0.05)' : 'none' }}>
      <div style={{ display: 'flex', overflowX: 'auto', padding: t.showIcons ? '8px 10px' : '10px 14px', gap: t.showIcons ? 4 : 7 }}>
        {pasti.map(pasto => {
          const ac  = pasto.id === activeTab;
          const Ico = TAB_ICONS[pasto.icon];

          if (t.showIcons) {
            return (
              <button key={pasto.id} onClick={() => onTabChange(pasto.id)}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '6px 10px', borderRadius: 10, background: ac ? t.bgTabAct : 'transparent', minWidth: 52, flexShrink: 0 }}>
                {Ico && <Ico c={ac ? t.txTabAct : t.txTabInact} />}
                <span style={{ fontSize: 10, fontWeight: ac ? 700 : 500, color: ac ? t.txTabAct : t.txTabInact, whiteSpace: 'nowrap' }}>
                  {pasto.nome}
                </span>
              </button>
            );
          }
          return (
            <button key={pasto.id} onClick={() => onTabChange(pasto.id)}
              style={{ padding: '7px 13px', borderRadius: 20, background: ac ? t.bgTabAct : t.bgSurf, border: ac ? '1px solid transparent' : `1px solid ${t.bdrCard}`, flexShrink: 0 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: ac ? t.txTabAct : t.txTabInact }}>
                {pasto.nome}
              </span>
            </button>
          );
        })}
      </div>
      {t.showFade && (
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 48, background: `linear-gradient(to right, transparent, ${t.bgTabBar})`, pointerEvents: 'none' }} />
      )}
    </div>
  );
}
