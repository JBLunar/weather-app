/**
 * ATOM: WeatherIcon
 * Det mindste byggeklods-element: ét vejrikon.
 */
import { el } from '../../utils/dom.js';
import { getWeatherInfo } from '../../utils/weatherCodes.js';

// size kan være 'small', 'medium' eller 'large'
export function WeatherIcon(weatherCode, size = 'medium') {
  const { icon, text } = getWeatherInfo(weatherCode);

  // role="img" + aria-label gør at skærmlæsere læser "Regn" i stedet for emojien
  return el('span', {
    className: `icon icon--${size}`,
    text: icon,
    attrs: { role: 'img', 'aria-label': text },
  });
}
