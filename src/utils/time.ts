/** Converts a 24-hour "HH:mm" string (as stored in the data) to 12-hour display, e.g. "13:00" -> "1:00 PM". */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}

/** "08:00", "11:00" -> "8:00 AM – 11:00 AM" */
export function formatTimeRange(start: string, end: string): string {
  return `${formatTime(start)} – ${formatTime(end)}`;
}
