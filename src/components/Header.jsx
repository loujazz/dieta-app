import { useTheme } from '../theme.js';
import { IcoInfo, IcoSettings, IcoSun, IcoMoon, IcoAuto } from '../Icons.jsx';

export default function Header({ diet, mode, dark, onThemeToggle, onInfoClick, onImportClick }) {
  const t = useTheme();
  const ThemeIco  = mode === 'auto' ? IcoAuto : dark ? IcoSun : IcoMoon;
  const themeTitle = mode === 'auto'
    ? `Automatico (${dark ? 'scuro' : 'chiaro'} ora)`
    : dark ? 'Passa a chiaro' : 'Passa a scuro';

  const btn = {
    width: 34, height: 34, borderRadius: 10,
    background: t.bgHdrBtn, border: t.bdrHdrBtn,
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  };

  return (
    <div style={{
      background: t.bgHeader, padding: '18px 20px 16px',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
      borderBottom: t.headerSep, position: 'sticky', top: 0, zIndex: 20,
    }}>
      <div>
        <div style={{ color: t.txHeader, fontSize: 17, fontWeight: 700, letterSpacing: '-0.3px', lineHeight: 1.25 }}>
          {diet.titolo}
        </div>
        <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
          {t.showDot && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#C8F135', flexShrink: 0 }} />}
          <span style={{ color: t.txHeaderSub, fontSize: 11 }}>
            {t.showDot ? `Aggiornata · ${diet.dataStampa}` : `Aggiornato: ${diet.dataStampa}`}
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={onThemeToggle} title={themeTitle} style={btn}>
          <ThemeIco c={t.txHdrIco} s={15} />
        </button>
        <button onClick={onInfoClick} style={btn}>
          <IcoInfo c={t.txHdrIco} s={15} />
        </button>
        <button onClick={onImportClick} style={btn}>
          <IcoSettings c={t.txHdrIco} s={15} />
        </button>
      </div>
    </div>
  );
}
