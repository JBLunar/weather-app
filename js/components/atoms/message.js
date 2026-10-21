/**
 * ATOM: Message
 * En statusbesked, fx "Henter vejrdata…" eller en fejl.
 */
import { el } from '../../utils/dom.js';

// type kan være 'info' eller 'error'
export function Message(text, type = 'info') {
  return el('p', {
    className: `message message--${type}`,
    text,
    // role="alert" gør at skærmlæsere læser fejl op med det samme
    attrs: type === 'error' ? { role: 'alert' } : {},
  });
}
