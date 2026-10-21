/**
 * ATOM: Button
 * En knap. Vi sætter IKKE klik-events her – det er controllerens job
 * (via viewets bind-metoder).
 */
import { el } from '../../utils/dom.js';

export function Button({ text, type = 'button', variant = 'primary', label, className = '' }) {
  const attrs = { type };
  // label bruges når knappen kun har et ikon, så skærmlæsere ved hvad den gør
  if (label) attrs['aria-label'] = label;

  return el('button', {
    className: `btn btn--${variant} ${className}`.trim(),
    text,
    attrs,
  });
}
