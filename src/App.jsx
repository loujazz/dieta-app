import { useState } from "react";
import { Coffee, Apple, Sun, Cookie, Moon, Star, ChevronDown, ChevronUp, Info, X, Settings, Save } from "lucide-react";
import { defaultDiet } from "./dietData.js";

const ICONS = { Coffee, Apple, Sun, Cookie, Moon, Star };

export default function App() {
  const [diet, setDiet] = useState(defaultDiet);
  const [activeTab, setActiveTab] = useState(diet.pasti[0].id);
  const [activeNote, setActiveNote] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [expandedBlocks, setExpandedBlocks] = useState({});
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState("");

  const currentMeal = diet.pasti.find(p => p.id === activeTab);

  const toggleBlock = (mealId, idx) => {
    const key = mealId + "-" + idx;
    setExpandedBlocks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importText);
      if (!parsed.pasti || !Array.isArray(parsed.pasti)) {
        setImportError("Il JSON deve contenere un array 'pasti'.");
        return;
      }
      setDiet(parsed);
      setActiveTab(parsed.pasti[0].id);
      setShowImport(false);
      setImportError("");
      setImportText("");
    } catch (e) {
      setImportError("JSON non valido: " + e.message);
    }
  };

  const exportCurrent = () => {
    const blob = new Blob([JSON.stringify(diet, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dieta.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex flex-col">
      <div className="bg-emerald-600 text-white px-4 py-3 shadow-md sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold leading-tight">{diet.titolo}</h1>
            <p className="text-emerald-100 text-xs">Aggiornato: {diet.dataStampa}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowInfo(true)}
              className="p-2 bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors"
              aria-label="Indicazioni generali"
            >
              <Info size={20} />
            </button>
            <button
              onClick={() => setShowImport(true)}
              className="p-2 bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors"
              aria-label="Importa nuova dieta"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex overflow-x-auto bg-white shadow-sm sticky top-[64px] z-10 border-b border-emerald-100">
        {diet.pasti.map(pasto => {
          const Icon = ICONS[pasto.icon] || Coffee;
          const isActive = activeTab === pasto.id;
          return (
            <button
              key={pasto.id}
              onClick={() => setActiveTab(pasto.id)}
              className={"flex flex-col items-center gap-1 px-4 py-3 min-w-[80px] flex-shrink-0 transition-colors border-b-2 " + (
                isActive
                  ? "border-emerald-600 text-emerald-700 bg-emerald-50"
                  : "border-transparent text-gray-500 hover:text-emerald-600 hover:bg-emerald-50/50"
              )}
            >
              <Icon size={20} />
              <span className="text-xs font-medium whitespace-nowrap">{pasto.nome}</span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 px-4 py-4 pb-8">
        {currentMeal && (
          <div className="space-y-3">
            {currentMeal.blocchi.map((blocco, idx) => {
              const key = currentMeal.id + "-" + idx;
              const isExpanded = expandedBlocks[key];
              const hasAlt = blocco.alternative && blocco.alternative.length > 0;

              return (
                <div key={idx} className="bg-white rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
                  <div
                    className={"flex items-center justify-between p-3 " + (hasAlt ? "cursor-pointer active:bg-emerald-50" : "")}
                    onClick={() => hasAlt && toggleBlock(currentMeal.id, idx)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-gray-800">{blocco.principale.nome}</span>
                        {blocco.principale.frequenza && (
                          <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-medium">
                            {blocco.principale.frequenza}
                          </span>
                        )}
                        {blocco.principale.noteRef && (
                          <button
                            onClick={(e) => { e.stopPropagation(); setActiveNote(blocco.principale.noteRef); }}
                            className="text-xs bg-emerald-100 text-emerald-700 w-5 h-5 rounded-full flex items-center justify-center font-bold hover:bg-emerald-200"
                          >
                            {blocco.principale.noteRef}
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      <span className="text-lg font-bold text-emerald-700 tabular-nums">{blocco.principale.g} g</span>
                      {hasAlt && (isExpanded ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />)}
                    </div>
                  </div>

                  {hasAlt && isExpanded && (
                    <div className="border-t border-emerald-50 bg-gray-50">
                      {blocco.alternative.map((alt, aIdx) => (
                        <div key={aIdx} className="flex items-center justify-between px-3 py-2 border-b border-emerald-50 last:border-b-0">
                          <div className="flex items-center gap-2 flex-wrap min-w-0 flex-1">
                            <span className="text-sm text-gray-600">{alt.nome}</span>
                            {alt.frequenza && (
                              <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-medium">
                                {alt.frequenza}
                              </span>
                            )}
                            {alt.noteRef && (
                              <button
                                onClick={() => setActiveNote(alt.noteRef)}
                                className="text-xs bg-emerald-100 text-emerald-700 w-5 h-5 rounded-full flex items-center justify-center font-bold hover:bg-emerald-200"
                              >
                                {alt.noteRef}
                              </button>
                            )}
                          </div>
                          <span className="text-sm font-semibold text-gray-700 tabular-nums ml-2 flex-shrink-0">{alt.g} g</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {diet.ciclismo && (
          <details className="mt-6 bg-orange-50 border border-orange-200 rounded-xl overflow-hidden">
            <summary className="px-3 py-3 font-semibold text-orange-800 cursor-pointer select-none">
              🚴 Indicazioni giorno di ciclismo (&gt;2h)
            </summary>
            <div className="px-3 pb-3 space-y-2 text-sm text-gray-700">
              {diet.ciclismo.corpo.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p className="font-semibold mt-2">Suggerimenti pratici:</p>
              <ul className="list-disc pl-5 space-y-1">
                {diet.ciclismo.suggerimenti.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </details>
        )}
      </div>

      {activeNote !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-30 p-4" onClick={() => setActiveNote(null)}>
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-emerald-700">Nota {activeNote}</h3>
              <button onClick={() => setActiveNote(null)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <p className="text-gray-700 text-sm">
              {diet.note.find(n => n.id === activeNote)?.testo || "Nota non trovata."}
            </p>
          </div>
        </div>
      )}

      {showInfo && (
        <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-30 p-4" onClick={() => setShowInfo(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-4 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-3 sticky top-0 bg-white">
              <h3 className="font-bold text-emerald-700 text-lg">Indicazioni alimentari generali</h3>
              <button onClick={() => setShowInfo(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <ul className="space-y-2 text-sm text-gray-700 list-disc pl-5">
              {diet.indicazioniGenerali.map((ind, i) => (
                <li key={i}>{ind}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {showImport && (
        <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-30 p-4" onClick={() => setShowImport(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-4 max-h-[85vh] overflow-y-auto flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-emerald-700 text-lg">Gestione dati dieta</h3>
              <button onClick={() => setShowImport(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-3">
              Per caricare una nuova dieta (es. da un nuovo PDF), incolla qui sotto il JSON con la stessa struttura.
              Puoi esportare la dieta attuale come riferimento per il formato.
            </p>

            <button
              onClick={exportCurrent}
              className="flex items-center justify-center gap-2 bg-emerald-100 text-emerald-700 rounded-lg px-3 py-2 text-sm font-medium mb-3 hover:bg-emerald-200"
            >
              <Save size={16} /> Esporta dieta attuale come JSON (modello)
            </button>

            <textarea
              value={importText}
              onChange={e => setImportText(e.target.value)}
              placeholder="Incolla qui il JSON della nuova dieta..."
              className="w-full h-40 border border-gray-300 rounded-lg p-2 text-xs font-mono resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />

            {importError && <p className="text-red-600 text-xs mt-2">{importError}</p>}

            <button
              onClick={handleImport}
              disabled={!importText.trim()}
              className="mt-3 bg-emerald-600 text-white rounded-lg px-3 py-2 text-sm font-semibold hover:bg-emerald-700 disabled:bg-gray-300"
            >
              Carica nuova dieta
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
