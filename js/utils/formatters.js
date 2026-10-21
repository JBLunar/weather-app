/**
 * Små funktioner der laver rå tal/datoer om til pæn dansk tekst.
 */

// Laver "2026-10-21" om til en Date i lokal tid (ikke UTC)
function toLocalDate(dateString) {
  return new Date(`${dateString}T00:00`);
}

/** "I dag", "I morgen" eller fx "Fredag" */
export function formatDayName(dateString) {
  const date = toLocalDate(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Forskel i hele dage mellem datoen og i dag
  const diffDays = Math.round((date - today) / 86_400_000);
  if (diffDays === 0) return 'I dag';
  if (diffDays === 1) return 'I morgen';

  const weekday = date.toLocaleDateString('da-DK', { weekday: 'long' });
  // Stort forbogstav: "fredag" -> "Fredag"
  return weekday.charAt(0).toUpperCase() + weekday.slice(1);
}

/** "21. oktober" */
export function formatDate(dateString) {
  return toLocalDate(dateString).toLocaleDateString('da-DK', {
    day: 'numeric',
    month: 'long',
  });
}

/** "2026-10-21T15:00" -> "kl. 15" */
export function formatHour(dateTimeString) {
  const hour = dateTimeString.slice(11, 13);
  return `kl. ${hour}`;
}

/** 12.6 -> "13°" */
export function formatTemp(value) {
  return `${Math.round(value)}°`;
}

/** 4.25 -> "4,3 m/s" (dansk komma) */
export function formatWind(value) {
  return `${value.toLocaleString('da-DK', { maximumFractionDigits: 1 })} m/s`;
}

/** 1.2 -> "1,2 mm" */
export function formatPrecipitation(value) {
  return `${value.toLocaleString('da-DK', { maximumFractionDigits: 1 })} mm`;
}

/**
 * Grader -> kompasretning på dansk.
 * 0° = Nord, 90° = Øst, 180° = Syd, 270° = Vest.
 * Vi deler cirklen i 8 stykker á 45°.
 */
export function degreesToCompass(degrees) {
  const directions = ['N', 'NØ', 'Ø', 'SØ', 'S', 'SV', 'V', 'NV'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}
