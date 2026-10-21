/**
 * TEMPLATE: WeatherTemplate
 * Sidens skelet/layout – UDEN data. Den laver bare "pladser" (regioner)
 * som viewet senere fylder organisms ind i.
 *
 * I atomic design: Template = layout uden indhold.
 *                  Page = template fyldt med rigtige data (det gør viewet).
 */
import { el } from '../../utils/dom.js';

export function WeatherTemplate() {
  const header = el('header', { className: 'layout__header' });

  const offline = el('p', {
    className: 'layout__offline',
    text: '📡 Du er offline – viser senest gemte data',
  });
  offline.hidden = true;

  // aria-live="polite": skærmlæsere læser nye beskeder op her
  const status = el('div', { className: 'layout__status', attrs: { 'aria-live': 'polite' } });

  const detail = el('section', { className: 'layout__detail', attrs: { 'aria-label': 'Valgt dag' } });
  const forecast = el('section', { className: 'layout__forecast', attrs: { 'aria-label': 'Vejrudsigt' } });

  const main = el('main', { className: 'layout__main' }, [detail, forecast]);
  const root = el('div', { className: 'layout' }, [header, offline, status, main]);

  // Vi returnerer referencer til regionerne, så viewet kan fylde dem
  return { root, header, offline, status, detail, forecast };
}
