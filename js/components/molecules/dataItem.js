/**
 * MOLECULE: DataItem
 * Et lille "label + værdi" par, fx  Nedbør / 2,4 mm
 * value kan være tekst ELLER et element (fx WindInfo).
 */
import { el } from '../../utils/dom.js';

export function DataItem(label, value) {
  const valueElement = typeof value === 'string'
    ? el('dd', { className: 'data-item__value', text: value })
    : el('dd', { className: 'data-item__value' }, [value]);

  return el('div', { className: 'data-item' }, [
    el('dt', { className: 'data-item__label', text: label }),
    valueElement,
  ]);
}
