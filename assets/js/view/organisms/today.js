// Organisme: vejret lige nu (1-dags visningen).
// Genbruger de samme atomer som dagskortene – det er pointen med atomic design.

// Henter de fire atomer
import { createWeatherIcon } from '../atoms/weatherIcon.js';
import { createTemperature } from '../atoms/temperature.js';
import { createWind } from '../atoms/wind.js';
import { createRain } from '../atoms/rain.js';

// Modtager pakken med vejret lige nu. export = controlleren må bruge den
export function createToday(current) {
  // Den ydre beholder – den hvide boks
  const wrapper = document.createElement('div');
  // Klasse til CSS
  wrapper.className = 'today';

  // Boksens overskrift
  const heading = document.createElement('h2');
  // Overskriftens tekst
  heading.textContent = 'Vejret lige nu';

  // Rækken med de store ting øverst
  const main = document.createElement('div');
  // CSS sætter ikon og temperatur ved siden af hinanden
  main.className = 'today-main';
  // Sæt ikon og temperatur ind i rækken
  main.append(
    createWeatherIcon(current.icon, current.text),  // Ikon
    createTemperature(current.temp)                 // Temperatur
  );

  // Afsnit med vejrtypen
  const description = document.createElement('p');
  // Klasse til CSS
  description.className = 'description';
  // Sæt teksten ind, fx "Delvist skyet"
  description.textContent = current.text;

  // Afsnit med detaljer
  const details = document.createElement('p');
  // Klasse til CSS
  details.className = 'today-details';
  // Sæt vind og nedbør ind, adskilt af en prik
  details.append(
    createWind(current.wind, current.windDir),  // Vind
    ' · ',                                      // Skilletegn
    createRain(current.rain)                    // Nedbør
  );

  // Sæt alle delene ind i boksen, fra top til bund
  wrapper.append(heading, main, description, details);
  // Giver den færdige boks tilbage
  return wrapper;
}
