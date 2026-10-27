// Model ("køkkenet" i MVC): henter vejrdata fra Open-Meteo API'et og gør det nemt at bruge.
// Modellen ved intet om HTML – den laver kun data.

// Henter funktionen der oversætter vejrkoder til tekst og ikon (./ = samme mappe)
import { getWeatherInfo } from './weatherCodes.js';

// Breddegrad for København (nord/syd)
const LATITUDE = 55.68;
// Længdegrad for København (øst/vest)
const LONGITUDE = 12.57;

// API'ets adresse – det der står før "?" i webadressen
const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

// Bygger hele webadressen med vores ønsker (parametre)
function buildUrl() {
  // URLSearchParams sætter selv "=" og "&" ind mellem ønskerne
  const params = new URLSearchParams({
    // Hvor i verden
    latitude: LATITUDE,
    longitude: LONGITUDE,
    // Vejret lige nu: temperatur, nedbør, vejrkode, vindstyrke, vindretning
    current: 'temperature_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m',
    // Én værdi pr. dag: vejrkode, maks/min temp, nedbør, vindstyrke, vindretning
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant',
    // Vind i meter pr. sekund i stedet for km/t
    wind_speed_unit: 'ms',
    // Brug dansk tid
    timezone: 'Europe/Copenhagen',
    // Kun 5 dage
    forecast_days: 5
  });

  // Sætter adressen og ønskerne sammen: adresse + "?" + ønsker
  return `${BASE_URL}?${params}`;
}

// Henter vejret. export = controlleren må bruge den. async = må bruge await
export async function getWeather() {
  // fetch sender forespørgslen. await venter på svaret
  const response = await fetch(buildUrl());

  // Hvis svaret IKKE er ok (fx fejl 404 eller 500)...
  if (!response.ok) {
    // ...så stop og send en fejl videre til controllerens catch
    throw new Error(`Kunne ikke hente vejret (status ${response.status})`);
  }

  // Lav svaret om fra tekst til et JavaScript-objekt og giv det tilbage
  return await response.json();
}

// API'et sender hver slags data som sin egen liste. Her laver vi ét objekt pr. dag
export function getDays(data) {
  // Gem data.daily i en kortere variabel
  const daily = data.daily;

  // map går listen med datoer igennem og laver en ny liste. i = plads 0, 1, 2, 3, 4
  return daily.time.map((date, i) => {
    // Oversæt dagens vejrkode til tekst og ikon
    const info = getWeatherInfo(daily.weather_code[i]);

    // Byg pakken for dagen – samme plads [i] fra hver liste hører til samme dag
    return {
      date: date,                                   // Datoen, fx "2026-10-22"
      code: daily.weather_code[i],                  // Vejrkoden, fx 63
      text: info.text,                              // Vejrtypen som tekst, fx "Regn"
      icon: info.icon,                              // Ikonet, fx 🌧️
      tempMax: daily.temperature_2m_max[i],         // Højeste temperatur
      tempMin: daily.temperature_2m_min[i],         // Laveste temperatur
      rain: daily.precipitation_sum[i],             // Nedbør i mm
      wind: daily.wind_speed_10m_max[i],            // Vindstyrke i m/s
      windDir: daily.wind_direction_10m_dominant[i] // Vindretning i grader
    };
  });
}

// Laver vejret lige nu om til én pakke. Kun én værdi af hver slags, så ingen map
export function getCurrent(data) {
  // Gem data.current i en kortere variabel
  const current = data.current;
  // Oversæt vejrkoden til tekst og ikon
  const info = getWeatherInfo(current.weather_code);

  // Byg og giv pakken tilbage
  return {
    time: current.time,                 // Tidspunktet for målingen
    code: current.weather_code,         // Vejrkoden
    text: info.text,                    // Vejrtypen som tekst
    icon: info.icon,                    // Ikonet
    temp: current.temperature_2m,       // Temperaturen
    rain: current.precipitation,        // Nedbør i mm
    wind: current.wind_speed_10m,       // Vindstyrke i m/s
    windDir: current.wind_direction_10m // Vindretning i grader
  };
}
