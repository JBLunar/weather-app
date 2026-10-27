// "Ordbog" der oversætter Open-Meteo's vejrkoder (WMO-standard) til dansk tekst og et ikon.
// Tallet til venstre er koden API'et sender. Til højre står hvad den betyder.
const WEATHER_CODES = {
  // Klart og skyet
  0:  { text: 'Klart vejr',          icon: '☀️' },
  1:  { text: 'Overvejende klart',   icon: '🌤️' },
  2:  { text: 'Delvist skyet',       icon: '⛅' },
  3:  { text: 'Overskyet',           icon: '☁️' },
  // Tåge
  45: { text: 'Tåge',                icon: '🌫️' },
  48: { text: 'Rimtåge',             icon: '🌫️' },
  // Støvregn (meget fine dråber)
  51: { text: 'Let støvregn',        icon: '🌦️' },
  53: { text: 'Støvregn',            icon: '🌦️' },
  55: { text: 'Kraftig støvregn',    icon: '🌧️' },
  56: { text: 'Isslag',              icon: '🌧️' },
  57: { text: 'Kraftigt isslag',     icon: '🌧️' },
  // Regn
  61: { text: 'Let regn',            icon: '🌧️' },
  63: { text: 'Regn',                icon: '🌧️' },
  65: { text: 'Kraftig regn',        icon: '🌧️' },
  66: { text: 'Isregn',              icon: '🌧️' },
  67: { text: 'Kraftig isregn',      icon: '🌧️' },
  // Sne
  71: { text: 'Let sne',             icon: '🌨️' },
  73: { text: 'Sne',                 icon: '🌨️' },
  75: { text: 'Kraftig sne',         icon: '❄️' },
  77: { text: 'Snekorn',             icon: '🌨️' },
  // Byger (korte omgange regn eller sne)
  80: { text: 'Lette regnbyger',     icon: '🌦️' },
  81: { text: 'Regnbyger',           icon: '🌦️' },
  82: { text: 'Kraftige regnbyger',  icon: '⛈️' },
  85: { text: 'Snebyger',            icon: '🌨️' },
  86: { text: 'Kraftige snebyger',   icon: '❄️' },
  // Torden
  95: { text: 'Tordenvejr',          icon: '⛈️' },
  96: { text: 'Torden med hagl',     icon: '⛈️' },
  99: { text: 'Kraftig torden med hagl', icon: '⛈️' }
};

// Slår en kode op i ordbogen. export = modellen må bruge den
export function getWeatherInfo(code) {
  // ?? = findes koden ikke, så giv "Ukendt" tilbage i stedet
  return WEATHER_CODES[code] ?? { text: 'Ukendt', icon: '❓' };
}
