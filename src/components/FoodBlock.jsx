import { useTheme } from '../theme.js';
import { IcoChevron } from '../Icons.jsx';

export default function FoodBlock({ blocco, blockKey, expanded, onToggle, onNoteClick }) {
  const t = useTheme();
  const { principale: p, alternative: alts = [] } = blocco;
  const hasAlts = alts.length > 0;

  return (
    <div style={{ background: t.bgSurf, borderRadius: t.cardR, border: `1px solid ${t.bdrCard}`, overflow: 'hidden', boxShadow: t.cardShd }}>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 15px', cursor: hasAlts ? 'pointer' : 'default' }}
        onClick={() => hasAlts && onToggle(blockKey)}>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: t.txPrimary, lineHeight: 1.3 }}>{p.nome}</div>
          {(p.frequenza || p.noteRef !== undefined) && (
            <div style={{ display: 'flex', gap: 5, marginTop: 5, alignItems: 'center', flexWrap: 'wrap' }}>
              {p.frequenza && (
                <span style={{ fontSize: 11, fontWeight: 700, color: t.txFreq, background: t.bgFreq, padding: '2px 8px', borderRadius: 6 }}>
                  {p.frequenza}
                </span>
              )}
              {p.noteRef !== undefined && (
                <button onClick={e => { e.stopPropagation(); onNoteClick(p.noteRef); }}
                  style={{ fontSize: 10, fontWeight: 800, color: t.txNote, background: t.bgNote, width: 19, height: 19, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {p.noteRef}
                </button>
              )}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 12, flexShrink: 0 }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: t.qtySize, fontWeight: t.qtyW, color: t.txQty, letterSpacing: t.qtyKern, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{p.g}</span>
            {t.showQtyLabel
              ? <div style={{ fontSize: 9.5, fontWeight: 600, color: t.txQtyUnit, letterSpacing: '0.8px', textTransform: 'uppercase', marginTop: 1 }}>grammi</div>
              : <span style={{ fontSize: 12, fontWeight: 500, color: t.txQtyUnit, marginLeft: 2 }}>g</span>
            }
          </div>
          {hasAlts && (
            t.dark
              ? <div style={{ width: 28, height: 28, borderRadius: 8, background: expanded ? t.bgChevAct : t.bgSurf, border: `1px solid ${expanded ? t.bdrChevAct : t.bdrChev}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <IcoChevron c={expanded ? t.txChevAct : t.txChev} s={13} up={expanded} />
                </div>
              : <IcoChevron c={expanded ? t.txChevAct : t.txChev} s={15} up={expanded} />
          )}
        </div>
      </div>

      {hasAlts && expanded && (
        <div style={{ borderTop: `1px solid ${t.bdrAlt}`, background: t.bgSurfAlt }}>
          {alts.map((alt, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 15px', borderBottom: i < alts.length - 1 ? `1px solid ${t.bdrAlt}` : 'none' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
                <span style={{ fontSize: 13.5, fontWeight: 500, color: t.txAlt }}>{alt.nome}</span>
                {alt.frequenza && (
                  <span style={{ fontSize: 10, fontWeight: 700, color: t.txFreq, background: t.bgFreq, padding: '1.5px 5px', borderRadius: 5, flexShrink: 0 }}>{alt.frequenza}</span>
                )}
                {alt.noteRef !== undefined && (
                  <button onClick={() => onNoteClick(alt.noteRef)}
                    style={{ fontSize: 9, fontWeight: 800, color: t.txNote, background: t.bgNote, width: 17, height: 17, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {alt.noteRef}
                  </button>
                )}
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: t.txQtyAlt, fontVariantNumeric: 'tabular-nums', marginLeft: 8, flexShrink: 0 }}>
                {alt.g}<span style={{ fontSize: 11, fontWeight: 400, color: t.txQtyAltU }}> g</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
