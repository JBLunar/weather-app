/**
 * MOLECULE: WindInfo
 * Pil (atom) + vindstyrke + retning, fx  ↗ 5,2 m/s SV
 */
import { el } from '../../utils/dom.js';
import { WindArrow } from '../atoms/windArrow.js';
import { formatWind, degreesToCompass } from '../../utils/formatters.js';

export function WindInfo(speed, direction) {
  return el('span', { className: 'wind-info' }, [
    WindArrow(direction),
    el('span', { text: `${formatWind(speed)} ${degreesToCompass(direction)}` }),
  ]);
}
