// Atom: viser vindstyrke og vindretning, fx "↗ 5 m/s SV".
// API'et giver retningen i grader: 0 = fra nord, 90 = fra øst, 180 = fra syd, 270 = fra vest.

// De 8 verdenshjørner rundt med uret fra nord (plads 0 til 7)
const DIRECTIONS = ['N', 'NØ', 'Ø', 'SØ', 'S', 'SV', 'V', 'NV'];

// Modtager vindstyrken (fx 5.3) og retningen i grader (fx 209)
export function createWind(speed, degrees) {
  // Den ydre beholder til pil og tekst
  const span = document.createElement('span');
  // Klasse til CSS
  span.className = 'wind';

  // Et element til pilen
  const arrow = document.createElement('span');
  // Klasse til CSS
  arrow.className = 'wind-arrow';
  // Pilen starter med at pege ned (vind fra nord blæser mod syd)
  arrow.textContent = '↓';
  // Et span kan kun drejes, når det er inline-block
  arrow.style.display = 'inline-block';
  // Drej pilen, så den viser hvilken vej vinden blæser hen
  arrow.style.transform = `rotate(${degrees}deg)`;

  // 360° / 8 retninger = 45° hver. Fx 209 / 45 = 4.6 → rundes til 5 → 'SV'.
  // % 8 gør at plads 8 (som ikke findes) bliver til plads 0 = 'N'
  const direction = DIRECTIONS[Math.round(degrees / 45) % 8];

  // Et element til teksten
  const text = document.createElement('span');
  // Afrundet vindstyrke + enhed + verdenshjørne, fx " 5 m/s SV"
  text.textContent = ` ${Math.round(speed)} m/s ${direction}`;

  // Sæt pil og tekst ind i beholderen
  span.append(arrow, text);
  // Giver det færdige element tilbage
  return span;
}
