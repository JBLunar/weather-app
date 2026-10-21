/**
 * ATOM: Heading
 * En overskrift på et valgfrit niveau (h1-h6).
 */
import { el } from '../../utils/dom.js';

export function Heading(level, text, className = '') {
  return el(`h${level}`, { className: `heading heading--h${level} ${className}`.trim(), text });
}
