# Dieta App - PWA

App per consultare rapidamente le indicazioni alimentari da telefono.

## Setup locale

npm install
npm run dev

## Build per produzione

npm run build

## Deploy

1. Push su GitHub
2. Importa il repo su Vercel (vercel.com -> Add New Project)
3. Vercel rileva Vite automaticamente, deploy con impostazioni default

## Icone PWA mancanti

Prima del deploy, aggiungi in public/:
- icon-192.png (192x192px)
- icon-512.png (512x512px)

## Aggiornare i dati della dieta

I dati sono in src/dietData.js. Per un nuovo PDF, modifica questo file mantenendo la stessa struttura.
