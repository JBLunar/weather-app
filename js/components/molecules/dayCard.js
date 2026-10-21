/**
 * MOLECULE: DayCard
 * Et kort for én dag i 5-dages udsigten.
 * Det er en <button>, så man kan vælge dagen med både mus og tastatur.
 */
import { el } from '../../utils/dom.js';
import { WeatherIcon } from '../atoms/weatherIcon.js';
import { Temperature } from '../atoms/temperature.js';
import { formatDayName, formatPrecipitation } from '../../utils/formatters.js';

export function DayCard(day, index, isActive) {
  return el('button', {
    className: isActive ? 'day-card day-card--active' : 'day-card',
    attrs: {
      type: 'button',
      'data-index': index, // controlleren bruger dette til at vide hvilken dag der er klikket
      'aria-pressed': String(isActive),
    },
  }, [
    el('span', { className: 'day-card__name', text: formatDayName(day.date) }),
    WeatherIcon(day.weatherCode, 'medium'),
    el('span', { className: 'day-card__temps' }, [
      Temperature(day.tempMax, 'max'),
      Temperature(day.tempMin, 'min'),
    ]),
    el('span', { className: 'day-card__rain', text: `💧 ${formatPrecipitation(day.precipitation)}` }),
  ]);
}
