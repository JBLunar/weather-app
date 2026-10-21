/**
 * MOLECULE: HourItem
 * Én time i "time for time"-listen.
 */
import { el } from '../../utils/dom.js';
import { WeatherIcon } from '../atoms/weatherIcon.js';
import { Temperature } from '../atoms/temperature.js';
import { formatHour, formatPrecipitation } from '../../utils/formatters.js';

export function HourItem(hour) {
  return el('li', { className: 'hour-item' }, [
    el('span', { className: 'hour-item__time', text: formatHour(hour.time) }),
    WeatherIcon(hour.weatherCode, 'small'),
    Temperature(hour.temperature),
    el('span', { className: 'hour-item__rain', text: formatPrecipitation(hour.precipitation) }),
  ]);
}
