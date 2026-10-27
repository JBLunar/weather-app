// Molekyle: ét dagskort, sat sammen af atomerne.
// Kortet ved ikke hvordan atomerne er bygget – det beder dem bare om et element.

// Henter de fire atomer (../ = gå én mappe op, fra molecules til view)
import { createWeatherIcon } from '../atoms/weatherIcon.js';
import { createTemperature } from '../atoms/temperature.js';
import { createWind } from '../atoms/wind.js';
import { createRain } from '../atoms/rain.js';

// Laver "2026-10-22" om til "torsdag 22. okt." (ingen export = kun til denne fil)
function formatDate(dateString) {
  // Laver en dato. "T00:00" = dansk midnat, så den ikke viser den forkerte dag
  const date = new Date(dateString + 'T00:00');
  // Laver datoen om til dansk tekst
  return date.toLocaleDateString('da-DK', {
    weekday: 'long',  // Hele ugedagen, fx "torsdag"
    day: 'numeric',   // Dagen som tal, fx "22."
    month: 'short'    // Kort måned, fx "okt."
  });
}

// Modtager én dags-pakke fra modellen. export = forecast.js må bruge den
export function createDayCard(day) {
  // <article> = en selvstændig boks – selve kortet
  const card = document.createElement('article');
  // Klasse til CSS
  card.className = 'day-card';

  // Overskrift med datoen
  const title = document.createElement('h3');
  // Sæt den pæne dato ind
  title.textContent = formatDate(day.date);

  // Afsnit med vejrtypen
  const description = document.createElement('p');
  // Klasse til CSS
  description.className = 'description';
  // Sæt teksten ind, fx "Regn"
  description.textContent = day.text;

  // Afsnit med temperaturerne
  const temps = document.createElement('p');
  // Klasse til CSS
  temps.className = 'temps';
  // Samme atom bruges to gange: maks / min, fx "13° / 10°"
  temps.append(createTemperature(day.tempMax), ' / ', createTemperature(day.tempMin));

  // Sæt alle delene ind i kortet, fra top til bund
  card.append(
    title,                                  // Dato
    createWeatherIcon(day.icon, day.text),  // Ikon
    description,                            // Vejrtype
    temps,                                  // Temperaturer
    createWind(day.wind, day.windDir),      // Vind
    createRain(day.rain)                    // Nedbør
  );

  // Giver det færdige kort tilbage
  return card;
}
