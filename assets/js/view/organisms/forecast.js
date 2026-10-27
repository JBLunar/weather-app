// Organisme (stor sektion): hele 5-dages udsigten, bygget af dagskort-molekyler.
// Organismen henter molekylet, og molekylet henter atomerne.

// Henter dagskort-molekylet
import { createDayCard } from '../molecules/dayCard.js';

// Modtager listen med 5 dags-pakker. export = controlleren må bruge den
export function createForecast(days) {
  // Den ydre beholder til hele sektionen
  const wrapper = document.createElement('div');
  // Klasse til CSS
  wrapper.className = 'forecast';

  // Sektionens overskrift
  const heading = document.createElement('h2');
  // Overskriftens tekst
  heading.textContent = '5-dages udsigt';

  // Beholder kun til kortene
  const list = document.createElement('div');
  // CSS bruger klassen til at vælge 1, 2 eller 5 kolonner
  list.className = 'forecast-list';

  // forEach kører én gang pr. dag...
  days.forEach(day => {
    // ...og bygger et dagskort, som sættes ind i listen
    list.append(createDayCard(day));
  });

  // Sæt overskrift og liste ind i beholderen
  wrapper.append(heading, list);
  // Giver den færdige sektion tilbage
  return wrapper;
}
