// Atom (mindste byggeklods i atomic design): viser ét vejr-ikon.
// Bruges både i dagskortene og i "Vejret lige nu".

// Modtager ikonet (fx 🌧️) og teksten (fx "Regn")
export function createWeatherIcon(icon, text) {
  // Laver et nyt tomt <span> (findes kun i hukommelsen, til nogen .append()'er det)
  const span = document.createElement('span');
  // Giver det en klasse, så det kan styles i CSS
  span.className = 'weather-icon';
  // Sætter ikonet ind som indhold
  span.textContent = icon;

  // Fortæller skærmlæsere (for blinde) at det er et billede...
  span.setAttribute('role', 'img');
  // ...og at billedet hedder fx "Regn"
  span.setAttribute('aria-label', text);

  // Giver det færdige element tilbage
  return span;
}
