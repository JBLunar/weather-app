/**
 * Open-Meteo sender en "weather_code" (WMO-kode) – bare et tal.
 * Her oversætter vi tallet til en dansk beskrivelse og et ikon.
 * Ikonerne er emojis, så vi ikke behøver billedfiler.
 *
 * Liste over koder: https://open-meteo.com/en/docs (søg efter "WMO Weather interpretation codes")
 */
const WEATHER_CODES = {
  0: { text: 'Klar himmel', icon: '☀️' },
  1: { text: 'Overvejende klart', icon: '🌤️' },
  2: { text: 'Delvist skyet', icon: '⛅' },
  3: { text: 'Overskyet', icon: '☁️' },
  45: { text: 'Tåge', icon: '🌫️' },
  48: { text: 'Rimtåge', icon: '🌫️' },
  51: { text: 'Let støvregn', icon: '🌦️' },
  53: { text: 'Støvregn', icon: '🌦️' },
  55: { text: 'Tæt støvregn', icon: '🌧️' },
  56: { text: 'Let isslag', icon: '🌧️' },
  57: { text: 'Isslag', icon: '🌧️' },
  61: { text: 'Let regn', icon: '🌦️' },
  63: { text: 'Regn', icon: '🌧️' },
  65: { text: 'Kraftig regn', icon: '🌧️' },
  66: { text: 'Let frostregn', icon: '🌧️' },
  67: { text: 'Kraftig frostregn', icon: '🌧️' },
  71: { text: 'Let sne', icon: '🌨️' },
  73: { text: 'Sne', icon: '🌨️' },
  75: { text: 'Kraftig sne', icon: '❄️' },
  77: { text: 'Snekorn', icon: '🌨️' },
  80: { text: 'Lette regnbyger', icon: '🌦️' },
  81: { text: 'Regnbyger', icon: '🌧️' },
  82: { text: 'Kraftige regnbyger', icon: '⛈️' },
  85: { text: 'Lette snebyger', icon: '🌨️' },
  86: { text: 'Kraftige snebyger', icon: '❄️' },
  95: { text: 'Tordenvejr', icon: '⛈️' },
  96: { text: 'Torden med let hagl', icon: '⛈️' },
  99: { text: 'Torden med kraftig hagl', icon: '⛈️' },
};

// Bruges hvis API'et sender en kode vi ikke kender
const UNKNOWN = { text: 'Ukendt vejr', icon: '❔' };

/** Returnerer { text, icon } for en vejrkode */
export function getWeatherInfo(code) {
  return WEATHER_CODES[code] ?? UNKNOWN;
}
