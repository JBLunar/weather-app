# 🌦️ Vejret – vejr-app

En vejr-app bygget med vanilla JavaScript, ES-moduler, MVC og atomic design.
Data kommer fra [Open-Meteo](https://open-meteo.com/) (gratis, ingen API-nøgle).

## Funktioner
- 5 dages udsigt
- 1-dags visning (klik på en dag) med time-for-time
- Data: temperatur, vindstyrke (m/s), vindretning, vejrtype + ikon, nedbør
- Søg efter by + "brug min position"
- Virker offline (service worker)
- Responsivt: mobil, tablet og desktop (+ mørk tilstand)

## Teknisk
| Krav | Hvor |
|---|---|
| Vanilla JS + moduler | `import`/`export` i alle filer under `js/` |
| MVC | `js/models`, `js/views`, `js/controllers` |
| Atomic design | `js/components/atoms → molecules → organisms → templates` (+ samme opdeling i `css/`) |
| Responsiv CSS | Mobile first, breakpoints 640px og 1024px |
| API: network first + cache | `sw.js` → `networkFirst()` |
| Statiske filer: cache first | `sw.js` → `cacheFirst()` |

## Struktur
```
index.html
sw.js                     ← service worker
css/
  main.css                ← importerer resten
  base.css  atoms.css  molecules.css  organisms.css  templates.css
js/
  app.js                  ← starter appen
  models/weatherModel.js
  views/weatherView.js
  controllers/weatherController.js
  utils/                  ← dom.js, formatters.js, weatherCodes.js
  components/
    atoms/                ← button, heading, input, message, temperature, weatherIcon, windArrow
    molecules/            ← dataItem, dayCard, hourItem, searchForm, windInfo
    organisms/            ← dayDetail, forecastList, siteHeader
    templates/            ← weatherTemplate
```

## Kør lokalt
Moduler og service workers virker **ikke** hvis man bare åbner `index.html` direkte.
Brug fx **Live Server** i VS Code (højreklik på `index.html` → *Open with Live Server*).

## GitHub Pages
1. Push til et repo
2. Settings → Pages → Branch: `main` / root → Save

Husk: når du ændrer filer, så hæv `VERSION` i `sw.js` (v1 → v2), så brugerne får de nye filer.
