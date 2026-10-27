// Atom: viser nedbør i millimeter, fx "💧 8 mm".

// Modtager nedbøren som tal, fx 8
export function createRain(mm) {
  // Laver et nyt tomt <span>
  const span = document.createElement('span');
  // Klasse til CSS
  span.className = 'rain';
  // Dråbe + tallet + enheden. Ingen afrunding, da 0.4 mm og 0 mm er forskellige
  span.textContent = `💧 ${mm} mm`;
  // Giver det færdige element tilbage
  return span;
}
