export const defaultDiet = {
  titolo: "Dieta Luigi Parisi",
  dataStampa: "03/06/2026",
  pasti: [
    {
      id: "colazione", nome: "Colazione", icon: "Coffee",
      blocchi: [
        { principale: { nome: "Latte di mucca parzialmente scremato", g: 250 },
          alternative: [
            { nome: "Yogurt greco 0% grassi, bianco", g: 200 },
            { nome: "Yogurt greco 2% di grassi", g: 150 }
          ]},
        { principale: { nome: "Fiocchi di mais – Cornflakes", g: 60 },
          alternative: [
            { nome: "Muesli", g: 60, noteRef: 1 },
            { nome: "Pane integrale", g: 60, noteRef: 2 },
            { nome: "Pane multicereali", g: 60 },
            { nome: "Pane in cassetta integrale", g: 50, noteRef: 3 },
            { nome: "Pane in cassetta ai cereali misti", g: 50 }
          ]},
        { principale: { nome: "Mandorle", g: 20, noteRef: 4 },
          alternative: [
            { nome: "Noci", g: 20, noteRef: 5 },
            { nome: "Nocciole", g: 20, noteRef: 6 },
            { nome: "Cioccolato fondente (>70% cacao)", g: 20 },
            { nome: "Crema 100% frutta secca", g: 20, noteRef: 7 },
            { nome: "Burro d'arachidi 100%", g: 20 },
            { nome: "Ricotta di mucca", g: 80 },
            { nome: "Philadelphia protein", g: 100 }
          ]}
      ]
    },
    {
      id: "spuntino-matt", nome: "Spuntino", icon: "Apple",
      blocchi: [
        { principale: { nome: "Crackers integrali", g: 40, noteRef: 8 },
          alternative: [{ nome: "Crackers non salati in superficie", g: 40 }]},
        { principale: { nome: "Mandorle", g: 20 },
          alternative: [{ nome: "Noci", g: 20 }, { nome: "Nocciole", g: 20 }]}
      ]
    },
    {
      id: "pranzo", nome: "Pranzo", icon: "Sun",
      blocchi: [
        { principale: { nome: "Pasta integrale", g: 90 },
          alternative: [
            { nome: "Pasta di semola", g: 80 }, { nome: "Riso integrale", g: 90 },
            { nome: "Riso Basmati", g: 80 }, { nome: "Riso Venere", g: 80 },
            { nome: "Riso", g: 80 }, { nome: "Cous cous", g: 80 },
            { nome: "Cereali (media)", g: 90 },
            { nome: "Pane integrale", g: 120, noteRef: 9 }, { nome: "Pane multicereali", g: 120 }
          ]},
        { principale: { nome: "Pomodori – passata", g: 80 },
          alternative: [{ nome: "Sugo alle verdure", g: 80 }]},
        { principale: { nome: "Legumi secchi", g: 60, frequenza: "3/7" },
          alternative: [
            { nome: "Legumi in scatola", g: 220 }, { nome: "Tofu", g: 125 },
            { nome: "Seitan", g: 100 },
            { nome: "Formaggi freschi (media)", g: 60, frequenza: "1/7" },
            { nome: "Mozzarella di mucca", g: 60 }, { nome: "Mozzarelle light", g: 100 },
            { nome: "Stracchino", g: 50 }, { nome: "Ricotta di mucca", g: 100 },
            { nome: "Fiocchi di formaggio magro", g: 150 }, { nome: "Philadelphia protein", g: 180 },
            { nome: "Formaggi stagionati (media)", g: 40 }, { nome: "Parmigiano", g: 40 },
            { nome: "Pollo – petto", g: 150, frequenza: "1/7" }, { nome: "Tacchino – petto", g: 150 },
            { nome: "Vitello – filetto", g: 150 }, { nome: "Manzo magro", g: 120 },
            { nome: "Prosciutto cotto", g: 70 }, { nome: "Prosciutto crudo", g: 70 },
            { nome: "Bresaola", g: 100 }, { nome: "Petto di pollo affettato", g: 120 },
            { nome: "Uovo di gallina – intero", g: 120, frequenza: "1/7", noteRef: 10 },
            { nome: "Tonno sott'olio sgocciolato", g: 70, frequenza: "1/7" }
          ]},
        { principale: { nome: "Pane integrale", g: 60, noteRef: 11 },
          alternative: [{ nome: "Pane multicereali", g: 60 }]},
        { principale: { nome: "Verdure (media)", g: 150 }, alternative: []},
        { principale: { nome: "Olio extravergine d'oliva", g: 20, noteRef: 12 }, alternative: []}
      ]
    },
    {
      id: "merenda", nome: "Merenda", icon: "Cookie",
      blocchi: [
        { principale: { nome: "Crackers integrali", g: 40, noteRef: 13 },
          alternative: [
            { nome: "Crackers non salati in superficie", g: 40 },
            { nome: "Pane integrale", g: 60 }, { nome: "Pane multicereali", g: 60 },
            { nome: "Pane in cassetta integrale", g: 50 }, { nome: "Pane in cassetta ai cereali misti", g: 50 }
          ]},
        { principale: { nome: "Parmigiano", g: 30 },
          alternative: [
            { nome: "Philadelphia protein", g: 100 }, { nome: "Hummus di ceci", g: 80 },
            { nome: "Bresaola", g: 60 }, { nome: "Petto di pollo affettato", g: 80 }
          ]},
        { principale: { nome: "Yogurt greco 0% grassi, bianco", g: 150, noteRef: 14 },
          alternative: [
            { nome: "Parmigiano", g: 30 }, { nome: "Proteine Whey 100%", g: 30, noteRef: 15 }
          ]},
        { principale: { nome: "Frutta fresca (media)", g: 150 },
          alternative: [{ nome: "Succo 100% frutta", g: 150 }]}
      ]
    },
    {
      id: "cena", nome: "Cena", icon: "Moon",
      blocchi: [
        { principale: { nome: "Formaggi freschi (media)", g: 100, frequenza: "2/7" },
          alternative: [
            { nome: "Mozzarella di mucca", g: 100 }, { nome: "Mozzarelle light", g: 120 },
            { nome: "Stracchino", g: 100 }, { nome: "Ricotta di mucca", g: 200 },
            { nome: "Fiocchi di formaggio magro", g: 200 }, { nome: "Philadelphia protein", g: 250 },
            { nome: "Legumi secchi", g: 80, frequenza: "2/7" }, { nome: "Legumi in scatola", g: 300 },
            { nome: "Tofu", g: 200 }, { nome: "Seitan", g: 150 },
            { nome: "Pollo – petto", g: 200, frequenza: "2/7" }, { nome: "Tacchino – petto", g: 200 },
            { nome: "Vitello – filetto", g: 200 },
            { nome: "Uovo di gallina – intero", g: 180, frequenza: "1/7", noteRef: 16 }
          ]},
        { principale: { nome: "Pane integrale", g: 90, noteRef: 17 },
          alternative: [{ nome: "Pane multicereali", g: 90 }, { nome: "Patate", g: 250 }]},
        { principale: { nome: "Verdure (media)", g: 150 }, alternative: []},
        { principale: { nome: "Olio extravergine d'oliva", g: 10, noteRef: 18 }, alternative: []}
      ]
    },
    {
      id: "spuntino-serale", nome: "Serale", icon: "Star",
      blocchi: [{ principale: { nome: "Frutta fresca (media)", g: 150 }, alternative: []}]
    }
  ],
  note: [
    { id: 1,  testo: "Per esempio: Muesli alla frutta Vitalis Cameo; Muesli frutta e fibra Grancereale Mulino Bianco." },
    { id: 2,  testo: "2 fette con 2 cucchiaini di marmellata." },
    { id: 3,  testo: "2 fette con 2 cucchiaini di marmellata." },
    { id: 4,  testo: "16-18 mandorle." },
    { id: 5,  testo: "4 noci." },
    { id: 6,  testo: "16-18 nocciole." },
    { id: 7,  testo: "Le creme e i formaggi si intendono da spalmare sul pane con la marmellata in superficie." },
    { id: 8,  testo: "1 pacchetto." },
    { id: 9,  testo: "4 fette." },
    { id: 10, testo: "2 uova." },
    { id: 11, testo: "2 fette." },
    { id: 12, testo: "2 cucchiai o 4 cucchiaini." },
    { id: 13, testo: "Pre-workout." },
    { id: 14, testo: "Post-workout. È possibile aggiungere un cucchiaino di miele allo yogurt." },
    { id: 15, testo: "1 misurino. Per esempio: Star Whey Named Sport, Hydrogold 90 Keforma." },
    { id: 16, testo: "3 uova oppure 2 uova + 150g di albume / 20g di parmigiano grattugiato." },
    { id: 17, testo: "3 fette." },
    { id: 18, testo: "1 cucchiaio o 2 cucchiaini." }
  ],
  indicazioniGenerali: [
    "Gli alimenti sulla colonna di destra rappresentano le alternative rispetto alle prime scelte. Ogni gruppo alimentare è indicato da una figura; scegliere un alimento per ogni figura.",
    "Il peso degli alimenti è da considerarsi a crudo e al netto degli scarti.",
    "Si consiglia di consumare 5-6 pasti al giorno: tre pasti principali (colazione, pranzo e cena) e gli spuntini.",
    "Dedicare ai pasti una regolarità e il tempo necessario per consumarli.",
    "Per facilitare il pasto e la successiva digestione è opportuno consumare i pasti seduto.",
    "I pasti dovrebbero essere leggeri e facilmente digeribili; si sconsigliano i condimenti eccessivi.",
    "La cottura dovrà essere preferibilmente al vapore, al forno o alla griglia; si sconsiglia la frittura.",
    "Nell'ambito di una dieta mediterranea, è essenziale variare la scelta di frutta e verdura rispettandone la stagionalità.",
    "Ridurre il consumo di sale aggiunto e di alimenti conservati per salagione.",
    "Consumare acqua ai pasti, tuttavia senza eccedere nella quantità.",
    "Il consumo di acqua giornaliero consigliato è non meno di 2,5 litri al giorno.",
    "È possibile aggiungere aceto, succo di limone, spezie e erbe aromatiche, caffè, tè e tisane senza zucchero."
  ],
  ciclismo: {
    titolo: "Indicazioni per la giornata di ciclismo (>2h)",
    corpo: [
      "I cibi e le bevande da consumare nelle ore precedenti l'attività dovrebbero contribuire alle scorte glucidiche, garantire un adeguato stato di idratazione e mantenere il benessere gastrointestinale.",
      "Il tipo, i tempi e la quantità di alimenti dovrebbero essere testati e personalizzati a seconda delle preferenze e della tollerabilità di ogni atleta.",
      "La disidratazione può far aumentare la sensazione di fatica. Dopo la gara, ripristinare il bilancio idrico bevendo un volume pari a ~125–150% della perdita avvenuta."
    ],
    suggerimenti: [
      "Consumare la colazione o la merenda prevista almeno 1 ora prima dell'inizio dell'attività.",
      "Carbo plus Energy, proAction: 53g (2 misurini) in 500ml di acqua. Iniziare circa 1h prima dell'attività.",
      "Carbo Sprint Ultra Race, proAction; Total Energy Carbo Gel, Named Sport: 1 stick/barretta ogni 40–45 min. In alternativa: banana, toast con miele, 40g di albicocche secche.",
      "Bevanda post-gara: succo d'arancia + integratore Magnesio e Potassio, oppure Sport Drink ProAction."
    ]
  }
};
