/**
 * Lille hjælpefunktion til at lave HTML-elementer.
 * Vi bruger textContent i stedet for innerHTML, så data fra API'et
 * (fx bynavne) aldrig kan blive tolket som HTML.
 *
 * Eksempel:
 *   el('p', { className: 'tekst', text: 'Hej' })
 *   el('div', { className: 'boks' }, [barn1, barn2])
 */
export function el(tag, options = {}, children = []) {
  const element = document.createElement(tag);
  const { className, text, attrs } = options;

  // Sæt CSS-klasse hvis den er givet
  if (className) element.className = className;

  // Sæt tekstindhold (sikkert – ingen HTML)
  if (text !== undefined && text !== null) element.textContent = text;

  // Sæt ekstra attributter, fx aria-label eller data-index
  if (attrs) {
    for (const [name, value] of Object.entries(attrs)) {
      element.setAttribute(name, value);
    }
  }

  // Tilføj børne-elementer (spring tomme værdier over)
  for (const child of [].concat(children)) {
    if (child) element.append(child);
  }

  return element;
}
