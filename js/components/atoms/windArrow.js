/**
 * ATOM: WindArrow
 * En pil der viser hvilken vej vinden blæser.
 *
 * OBS: Vindretning angiver hvor vinden kommer FRA.
 * Vestenvind (270°) kommer fra vest og blæser mod øst.
 * Derfor drejer vi pilen 180° ekstra, så den peger den vej vinden blæser hen.
 */
import { el } from '../../utils/dom.js';

export function WindArrow(degrees) {
  const arrow = el('span', {
    className: 'wind-arrow',
    text: '↑',
    attrs: { 'aria-hidden': 'true' }, // pilen er pynt – teksten ved siden af forklarer
  });
  arrow.style.transform = `rotate(${degrees + 180}deg)`;
  return arrow;
}
