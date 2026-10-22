// Model: står for at hente vejrdata fra Open-Meteo API'et
// Modellen ved INTET om HTML – den henter kun data

// Koordinater for byen (København – skift til den by du vil vise)
const LATITUDE = 55.68;
const LONGITUDE = 12.57;

// Grund-adressen til API'et
const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

// Bygger hele URL'en med alle parametre
function buildUrl() {
  // URLSearchParams laver selv "?navn=værdi&navn=værdi" for os
  const params = new URLSearchParams({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    // Vejret lige nu
    current: 'temperature_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m',
    // Én værdi pr. dag til 5-dages udsigten
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant',
    wind_speed_unit: 'ms',          // Vind i meter pr. sekund
    timezone: 'Europe/Copenhagen',  // Dansk tid
    forecast_days: 5                // Kun 5 dage
  });

  return `${BASE_URL}?${params}`;
}

// Henter vejret – "export" gør at andre filer kan importere funktionen
export async function getWeather() {
  // fetch sender forespørgslen. "await" venter på svaret
  const response = await fetch(buildUrl());

  // Hvis serveren svarer med en fejl (fx 404 eller 500), stopper vi her
  if (!response.ok) {
    throw new Error(`Kunne ikke hente vejret (status ${response.status})`);
  }

  // Lav svaret om fra tekst til et JavaScript-objekt
  const data = await response.json();
  return data;
}