/**
 * MODEL – "M" i MVC
 * ------------------
 * Modellen ejer DATA. Den:
 *  - henter data fra Open-Meteo API'et
 *  - laver API'ets rå data om til pæne objekter appen kan bruge
 *  - husker appens tilstand (state): valgt by, dagene og hvilken dag der er valgt
 *
 * Modellen ved INTET om HTML eller knapper. Den kender kun data.
 */

const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const STORAGE_KEY = 'vejr-app:location';

// Standard-by hvis brugeren ikke har valgt en endnu
const DEFAULT_LOCATION = {
  name: 'København, Danmark',
  latitude: 55.6761,
  longitude: 12.5683,
};

export class WeatherModel {
  constructor() {
    // Hele appens tilstand samlet ét sted
    this.state = {
      location: this.#loadSavedLocation(),
      days: [],
      selectedIndex: 0,
    };
  }

  /* ---------- Offentlige metoder (bruges af controlleren) ---------- */

  /** Søger efter en by med Open-Meteos geocoding-API og gemmer den som valgt by */
  async findCity(cityName) {
    const params = new URLSearchParams({
      name: cityName,
      count: 1,
      language: 'da',
      format: 'json',
    });

    const response = await fetch(`${GEOCODING_URL}?${params}`);
    if (!response.ok) throw new Error('Kunne ikke søge efter byen. Prøv igen.');

    const data = await response.json();
    if (!data.results || data.results.length === 0) {
      throw new Error(`Fandt ingen by med navnet "${cityName}".`);
    }

    const city = data.results[0];
    this.setLocation({
      name: city.country ? `${city.name}, ${city.country}` : city.name,
      latitude: city.latitude,
      longitude: city.longitude,
    });
  }

  /** Gemmer en ny placering i state og i localStorage */
  setLocation(location) {
    this.state.location = location;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(location));
    } catch {
      // localStorage kan være slået fra (fx privat vindue) – det er ok
    }
  }

  /** Henter 5 dages vejrudsigt for den valgte by */
  async loadForecast() {
    const { latitude, longitude } = this.state.location;

    // Præcis de felter tavlen kræver: temperatur, vind, vindretning, vejrtype og nedbør
    const params = new URLSearchParams({
      latitude,
      longitude,
      current: 'temperature_2m,weather_code,wind_speed_10m,wind_direction_10m,precipitation',
      hourly: 'temperature_2m,weather_code,precipitation,wind_speed_10m',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant',
      wind_speed_unit: 'ms', // vind i m/s som på DMI
      timezone: 'auto', // tider i byens egen tidszone
      forecast_days: 5,
    });

    const response = await fetch(`${FORECAST_URL}?${params}`);
    if (!response.ok) throw new Error('Kunne ikke hente vejrdata. Tjek din forbindelse.');

    const data = await response.json();
    this.state.days = this.#transform(data);
    this.state.selectedIndex = 0; // start altid på "I dag"
  }

  /** Vælger hvilken dag der vises i 1-dags visningen */
  selectDay(index) {
    if (index >= 0 && index < this.state.days.length) {
      this.state.selectedIndex = index;
    }
  }

  /* ---------- Private metoder (# = kun til brug inde i klassen) ---------- */

  /**
   * API'et sender data som "parallelle arrays":
   *   daily.time = ['2026-10-21', '2026-10-22', ...]
   *   daily.temperature_2m_max = [12.1, 10.4, ...]
   * Det er besværligt at arbejde med, så vi laver det om til én liste af dag-objekter.
   */
  #transform(data) {
    const { daily, hourly, current } = data;

    return daily.time.map((date, i) => ({
      date,
      weatherCode: daily.weather_code[i],
      tempMax: daily.temperature_2m_max[i],
      tempMin: daily.temperature_2m_min[i],
      precipitation: daily.precipitation_sum[i],
      windSpeed: daily.wind_speed_10m_max[i],
      windDirection: daily.wind_direction_10m_dominant[i],
      hours: this.#hoursForDate(hourly, date),
      // Kun i dag har "lige nu"-data
      current: i === 0 ? {
        temperature: current.temperature_2m,
        weatherCode: current.weather_code,
        windSpeed: current.wind_speed_10m,
        windDirection: current.wind_direction_10m,
        precipitation: current.precipitation,
      } : null,
    }));
  }

  /** Finder alle timer der hører til en bestemt dato */
  #hoursForDate(hourly, date) {
    return hourly.time
      .map((time, i) => ({
        time,
        temperature: hourly.temperature_2m[i],
        weatherCode: hourly.weather_code[i],
        precipitation: hourly.precipitation[i],
        windSpeed: hourly.wind_speed_10m[i],
      }))
      .filter((hour) => hour.time.startsWith(date));
  }

  /** Henter sidst valgte by fra localStorage – ellers standard-byen */
  #loadSavedLocation() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_LOCATION;
    } catch {
      return DEFAULT_LOCATION;
    }
  }
}
