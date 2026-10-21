/**
 * MOLECULE: SearchForm
 * Sat sammen af atomerne Input + Button + Button.
 */
import { el } from '../../utils/dom.js';
import { Input } from '../atoms/input.js';
import { Button } from '../atoms/button.js';

export function SearchForm() {
  return el('form', { className: 'search-form', attrs: { role: 'search' } }, [
    Input({ name: 'city', type: 'search', placeholder: 'Søg efter by…', label: 'Søg efter by' }),
    Button({ text: 'Søg', type: 'submit' }),
    Button({
      text: '📍',
      variant: 'icon',
      label: 'Brug min position',
      className: 'search-form__locate',
    }),
  ]);
}
