/**
 * ORGANISM: DayDetail
 * 1-dags visningen: stort ikon, temperatur, alle data og time-for-time.
 * Bygget af atoms (ikon, temperatur, overskrift) og molecules (DataItem, WindInfo, HourItem).
 */
import { el } from '../../utils/dom.js';
import { Heading } from '../atoms/heading.js';
import { WeatherIcon } from '../atoms/weatherIcon.js';
import { Temperature } from '../atoms/temperature.js';
import { DataItem } from '../molecules/dataItem.js';
import { WindInfo } from '../molecules/windInfo.js';
import { HourItem } from '../molecules/hourItem.js';
import { getWeatherInfo } from '../../utils/weatherCodes.js';
import {
  formatDayName, formatDate, formatTemp, formatPrecipitation, degreesToCompass,
} from '../../utils/formatters.js';

export function DayDetail(day, locationName) {
  // I dag viser vi "lige nu"-data. Andre dage viser vi dagens maks.
  const isToday = day.current !== null;
  const mainTemp = isToday ? day.current.temperature : day.tempMax;
  const mainCode = isToday ? day.current.weatherCode : day.weatherCode;
  const windSpeed = isToday ? day.current.windSpeed : day.windSpeed;
  const windDirection = isToday ? day.current.windDirection : day.windDirection;

  // Vis kun hver 3. time, så listen ikke bliver for lang
  const hours = day.hours.filter((hour) => Number(hour.time.slice(11, 13)) % 3 === 0);

  return el('article', { className: 'day-detail' }, [
    // Top: by og dato
    el('header', { className: 'day-detail__header' }, [
      Heading(2, locationName, 'day-detail__location'),
      el('p', { className: 'day-detail__date', text: `${formatDayName(day.date)} · ${formatDate(day.date)}` }),
    ]),

    // Hovedvisning: ikon + stor temperatur + beskrivelse
    el('div', { className: 'day-detail__main' }, [
      WeatherIcon(mainCode, 'large'),
      el('div', {}, [
        Temperature(mainTemp, 'large'),
        el('p', { className: 'day-detail__desc', text: getWeatherInfo(mainCode).text }),
        el('p', { className: 'day-detail__note', text: isToday ? 'Lige nu' : 'Dagens højeste' }),
      ]),
    ]),

    // Alle datapunkter fra tavlen
    el('dl', { className: 'day-detail__grid' }, [
      DataItem('Maks. / min.', `${formatTemp(day.tempMax)} / ${formatTemp(day.tempMin)}`),
      DataItem(isToday ? 'Vind nu' : 'Vind (maks.)', WindInfo(windSpeed, windDirection)),
      DataItem('Vindretning', `${degreesToCompass(windDirection)} (${Math.round(windDirection)}°)`),
      DataItem('Nedbør i alt', formatPrecipitation(day.precipitation)),
    ]),

    // Time for time
    Heading(3, 'Time for time', 'day-detail__subtitle'),
    el('ul', { className: 'hour-list' }, hours.map(HourItem)),
  ]);
}
