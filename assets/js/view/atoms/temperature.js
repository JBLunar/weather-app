// Atom: viser én temperatur, fx "13°". Bruges til maks, min og "lige nu".

// Modtager temperaturen som tal, fx 12.5
export function createTemperature(value) {
  // Laver et nyt tomt <span>
  const span = document.createElement('span');
  // Giver det en klasse, så det kan styles i CSS
  span.className = 'temperature';

  // Math.round runder af til helt tal (12.5 → 13), og ° sættes bagefter
  span.textContent = `${Math.round(value)}°`;

  // Giver det færdige element tilbage
  return span;
}
