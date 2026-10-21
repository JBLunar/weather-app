/**
 * ORGANISM: ForecastList
 * 5-dages udsigten: en liste af DayCard-molecules.
 */
import { el } from '../../utils/dom.js';
import { Heading } from '../atoms/heading.js';
import { DayCard } from '../molecules/dayCard.js';

export function ForecastList(days, selectedIndex) {
  const items = days.map((day, index) =>
    el('li', {}, [DayCard(day, index, index === selectedIndex)])
  );

  return el('div', { className: 'forecast' }, [
    Heading(2, `${days.length} dages udsigt`, 'forecast__title'),
    el('ol', { className: 'forecast-list' }, items),
  ]);
}
