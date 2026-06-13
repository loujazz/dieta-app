import { createContext, useContext } from 'react';

export const isEvening = () => { const h = new Date().getHours(); return h >= 20 || h < 7; };

export function buildTheme(D) {
  return {
    dark: D,
    font: D ? "'Space Grotesk', sans-serif" : "'Plus Jakarta Sans', sans-serif",

    bgPage:    D ? '#0C1016' : '#F1F5EF',
    bgHeader:  D ? '#0C1016' : '#1B3D2B',
    bgSurf:    D ? '#141B26' : '#FFFFFF',
    bgSurfAlt: D ? '#0F1520' : '#F7FBF7',
    bgHdrBtn:  D ? '#141B26' : 'rgba(255,255,255,0.1)',
    bgTabBar:  D ? '#0C1016' : '#FFFFFF',
    bgTabAct:  D ? '#C8F135' : '#1B3D2B',
    bgFreq:    D ? 'rgba(200,241,53,0.1)' : '#FEF0D6',
    bgNote:    D ? '#C8F135' : '#1B3D2B',
    bgChevAct: D ? 'rgba(200,241,53,0.12)' : 'transparent',
    bgCycling: D ? '#141B26' : '#FFF7ED',
    bgModal:   D ? '#141B26' : '#FFFFFF',
    bgInput:   D ? '#0F1520' : '#FFFFFF',
    bgExport:  D ? 'rgba(200,241,53,0.08)' : '#DCFCE7',
    bgImportBtn: D ? '#C8F135' : '#1B3D2B',

    bdrCard:    D ? '#1C2840' : '#DCE9DF',
    bdrAlt:     D ? '#131C2A' : '#EBF3EC',
    bdrTabBar:  D ? '#1C2840' : '#E0EAE3',
    bdrHdrBtn:  D ? '1px solid #1C2840' : '1px solid transparent',
    bdrChev:    D ? '#1C2840' : 'transparent',
    bdrChevAct: D ? 'rgba(200,241,53,0.25)' : 'transparent',
    bdrCycling: D ? '#1C2840' : '#FED7AA',
    bdrModal:   D ? '#1C2840' : '#E5E7EB',
    bdrInput:   D ? '#1C2840' : '#D1D5DB',
    bdrExport:  D ? 'rgba(200,241,53,0.15)' : 'transparent',

    txHeader:    D ? '#DCE8F4' : '#FFFFFF',
    txHeaderSub: D ? '#354560' : 'rgba(255,255,255,0.42)',
    txHdrIco:    D ? '#354560' : 'rgba(255,255,255,0.65)',
    txPrimary:   D ? '#A8C0D8' : '#19291E',
    txAlt:       D ? '#445870' : '#4B6E53',
    txMuted:     D ? '#2C3E54' : '#9AB4A0',
    txTabAct:    D ? '#0C1016' : '#FFFFFF',
    txTabInact:  D ? '#334460' : '#90AF98',
    txFreq:      D ? '#C8F135' : '#8A5A10',
    txNote:      D ? '#0C1016' : '#FFFFFF',
    txQty:       D ? '#C8F135' : '#1B3D2B',
    txQtyUnit:   D ? 'rgba(200,241,53,0.38)' : '#9ABDA4',
    txQtyAlt:    D ? '#4A6080' : '#2C5C3A',
    txQtyAltU:   D ? '#4A6080' : '#9ABDA4',
    txChev:      D ? '#253548' : '#C0D8C6',
    txChevAct:   D ? '#C8F135' : '#1B3D2B',
    txCycHdr:    D ? '#DCE8F4' : '#7C2D12',
    txCycBody:   D ? '#7A90A8' : '#9A3412',
    txModal:     D ? '#A8C0D8' : '#374151',
    txModalTi:   D ? '#DCE8F4' : '#1B3D2B',
    txExport:    D ? '#C8F135' : '#15803D',
    txImportBtn: D ? '#0C1016' : '#FFFFFF',
    txInput:     D ? '#A8C0D8' : '#1F2937',

    cardR:   D ? 18 : 16,
    cardShd: D ? 'none' : '0 1px 4px rgba(0,0,0,0.04)',
    qtySize: D ? 28 : 24,
    qtyW:    D ? 700 : 800,
    qtyKern: D ? '-1px' : '-0.8px',

    showIcons:    !D,
    showQtyLabel: D,
    showDot:      D,
    showFade:     D,
    headerSep:    D ? '1px solid #1C2840' : 'none',
  };
}

export const ThemeCtx = createContext(buildTheme(false));
export const useTheme = () => useContext(ThemeCtx);
