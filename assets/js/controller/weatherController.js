// Controller ("chefen" i MVC): henter data fra modellen og giver det til view.
// Model og view taler aldrig direkte sammen – alt går gennem controlleren.

// Henter de tre data-funktioner fra modellen (../ = gå én mappe op)
import { getWeather, getDays, getCurrent } from '../model/weatherModel.js';
// Henter funktionen der bygger 5-dages udsigten
import { createForecast } from '../view/organisms/forecast.js';
// Henter funktionen der bygger "Vejret lige nu"
import { createToday } from '../view/organisms/today.js';

// export = app.js må bruge den. async = den venter på internettet, så vi må bruge await
export async function init() {
  // try = prøv koden. Går noget galt, hopper vi ned i catch i stedet for at crashe
  try {
    // Hent vejret fra internettet og vent (await) til det er kommet
    const data = await getWeather();
    // Lav dataen om til én pakke med vejret lige nu
    const current = getCurrent(data);
    // Lav dataen om til en liste med 5 dags-pakker
    const days = getDays(data);

    // Byg HTML'en for "Vejret lige nu" (findes kun i hukommelsen endnu)
    const today = createToday(current);
    // Byg HTML'en for 5-dages udsigten
    const forecast = createForecast(days);

    // Find kassen med id="today" i index.html og sæt HTML'en ind i den
    document.querySelector('#today').append(today);
    // Find kassen med id="forecast" og sæt HTML'en ind i den
    document.querySelector('#forecast').append(forecast);
  } catch (err) {
    // Skriv fejlen med rødt i konsollen (F12)
    console.error('Fejl i controller:', err);
  }
}
