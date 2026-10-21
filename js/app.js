/**
 * APP.JS – startpunktet
 * ---------------------
 * Her samler vi Model, View og Controller og starter appen.
 * Vi registrerer også service workeren.
 */
import { WeatherModel } from './models/weatherModel.js';
import { WeatherView } from './views/weatherView.js';
import { WeatherController } from './controllers/weatherController.js';

// Lav de tre MVC-dele og giv model + view til controlleren
const model = new WeatherModel();
const view = new WeatherView(document.querySelector('#app'));
const controller = new WeatherController(model, view);

controller.init();

// Registrér service workeren (kun hvis browseren understøtter det)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      // "./sw.js" (relativ sti) så det også virker på GitHub Pages under /repo-navn/
      const registration = await navigator.serviceWorker.register('./sw.js');
      console.log('Service worker registreret:', registration.scope);
    } catch (error) {
      console.error('Service worker fejlede:', error);
    }
  });
}
