/**
 * ORGANISM: SiteHeader
 * Sidens top: logo/titel + søgeformularen (molecule).
 */
import { el } from '../../utils/dom.js';
import { Heading } from '../atoms/heading.js';
import { SearchForm } from '../molecules/searchForm.js';

export function SiteHeader() {
  return el('div', { className: 'site-header' }, [
    Heading(1, '🌦️ Vejret', 'site-header__title'),
    SearchForm(),
  ]);
}
