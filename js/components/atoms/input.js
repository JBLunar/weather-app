/**
 * ATOM: Input
 * Et tekstfelt.
 */
import { el } from '../../utils/dom.js';

export function Input({ name, placeholder = '', label, type = 'text' }) {
  return el('input', {
    className: 'input',
    attrs: {
      type,
      name,
      placeholder,
      'aria-label': label ?? placeholder,
      autocomplete: 'off',
    },
  });
}
