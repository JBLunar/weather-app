/**
 * VIEW – "V" i MVC
 * -----------------
 * Viewet styrer hvad brugeren SER. Det:
 *  - bygger siden med vores atomic design-komponenter
 *  - opdaterer skærmen når controlleren giver det nye data
 *  - lytter efter klik/søgning og sender dem videre til controlleren (bind-metoderne)
 *
 * Viewet henter ALDRIG data selv og bestemmer ikke hvad der skal ske.
 * Det siger bare "brugeren klikkede på dag 2" – controlleren bestemmer resten.
 */
import { WeatherTemplate } from '../components/templates/weatherTemplate.js';
import { SiteHeader } from '../components/organisms/siteHeader.js';
import { DayDetail } from '../components/organisms/dayDetail.js';
import { ForecastList } from '../components/organisms/forecastList.js';
import { Message } from '../components/atoms/message.js';

export class WeatherView {
  constructor(rootElement) {
    // 1. Byg skelettet (template) og sæt det ind på siden
    this.layout = WeatherTemplate();
    this.layout.header.append(SiteHeader());
    rootElement.replaceChildren(this.layout.root);

    // 2. Gem referencer til elementer vi skal bruge igen
    this.form = this.layout.header.querySelector('.search-form');
    this.input = this.form.querySelector('input');
    this.locateButton = this.form.querySelector('.search-form__locate');
  }

  /* ---------- Vis ting på skærmen ---------- */

  /** Tegner hele vejr-delen ud fra modellens state */
  render({ location, days, selectedIndex }) {
    const selectedDay = days[selectedIndex];
    this.layout.detail.replaceChildren(DayDetail(selectedDay, location.name));
    this.layout.forecast.replaceChildren(ForecastList(days, selectedIndex));
  }

  showLoading(text = 'Henter vejrdata…') {
    this.layout.status.replaceChildren(Message(text, 'info'));
  }

  showError(text) {
    this.layout.status.replaceChildren(Message(text, 'error'));
  }

  clearStatus() {
    this.layout.status.replaceChildren();
  }

  setOffline(isOffline) {
    this.layout.offline.hidden = !isOffline;
  }

  clearSearch() {
    this.input.value = '';
    this.input.blur(); // lukker tastaturet på mobil
  }

  /* ---------- Bind-metoder: kobler brugerens handlinger til controlleren ---------- */

  /** Kalder handler(bynavn) når formularen sendes */
  bindSearch(handler) {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault(); // stop siden i at genindlæse
      const city = this.input.value.trim();
      if (city) handler(city);
    });
  }

  /** Kalder handler() når 📍-knappen klikkes */
  bindLocate(handler) {
    this.locateButton.addEventListener('click', () => handler());
  }

  /**
   * Kalder handler(index) når et dagskort klikkes.
   * Vi bruger "event delegation": ÉN lytter på hele sektionen i stedet for én pr. kort.
   * Det virker selvom kortene bliver tegnet forfra hver gang.
   */
  bindDaySelect(handler) {
    this.layout.forecast.addEventListener('click', (event) => {
      const card = event.target.closest('.day-card');
      if (card) handler(Number(card.dataset.index));
    });
  }
}
