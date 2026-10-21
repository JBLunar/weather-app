/**
 * CONTROLLER – "C" i MVC
 * -----------------------
 * Controlleren er "limen" mellem Model og View. Den:
 *  - får besked fra viewet når brugeren gør noget
 *  - beder modellen om at hente/ændre data
 *  - beder viewet om at vise det nye resultat
 *
 * Model og View kender ikke hinanden – de taler kun gennem controlleren.
 */
export class WeatherController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Kobl brugerens handlinger til controllerens metoder
    this.view.bindSearch(this.handleSearch);
    this.view.bindLocate(this.handleLocate);
    this.view.bindDaySelect(this.handleDaySelect);

    // Vis/skjul offline-banner når forbindelsen ændrer sig
    window.addEventListener('online', () => this.view.setOffline(false));
    window.addEventListener('offline', () => this.view.setOffline(true));
  }

  /** Starter appen */
  async init() {
    this.view.setOffline(!navigator.onLine);
    await this.#updateWeather();
  }

  /*
   * Handlerne er "arrow functions" (=>), så "this" stadig peger på controlleren,
   * selvom de bliver kaldt inde fra viewets event listeners.
   */

  handleSearch = async (city) => {
    this.view.showLoading(`Søger efter ${city}…`);
    try {
      await this.model.findCity(city);
      this.view.clearSearch();
      await this.#updateWeather();
    } catch (error) {
      this.view.showError(error.message);
    }
  };

  handleLocate = () => {
    if (!('geolocation' in navigator)) {
      this.view.showError('Din browser understøtter ikke placering.');
      return;
    }

    this.view.showLoading('Finder din position…');
    navigator.geolocation.getCurrentPosition(
      // Lykkedes
      async (position) => {
        this.model.setLocation({
          name: 'Din position',
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        await this.#updateWeather();
      },
      // Fejlede (fx brugeren sagde nej)
      () => this.view.showError('Kunne ikke finde din position.'),
    );
  };

  handleDaySelect = (index) => {
    this.model.selectDay(index);
    this.#render();
  };

  /* ---------- Private hjælpe-metoder ---------- */

  async #updateWeather() {
    this.view.showLoading();
    try {
      await this.model.loadForecast();
      this.view.clearStatus();
      this.#render();
    } catch (error) {
      this.view.showError(error.message);
    }
  }

  #render() {
    this.view.render(this.model.state);
  }
}
