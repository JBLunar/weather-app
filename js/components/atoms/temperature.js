/**
 * ATOM: Temperature
 * Viser en temperatur, fx "13°".
 */
import { el } from '../../utils/dom.js';
import { formatTemp } from '../../utils/formatters.js';

// variant kan være 'large', 'max' eller 'min' (styrer farve/størrelse i CSS)
export function Temperature(value, variant = '') {
  const className = variant ? `temp temp--${variant}` : 'temp';
  return el('span', { className, text: formatTemp(value) });
}
