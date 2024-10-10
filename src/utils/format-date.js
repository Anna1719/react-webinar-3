export function formatDate(str, locale = 'ru-RU') {
  const date = new Date(str);
  const dateOptions = {day: 'numeric', month: 'long', year: 'numeric'};
  const timeOptions = {hour: '2-digit', minute: '2-digit'};
  const dateFormat = date.toLocaleDateString(locale, dateOptions).slice(0, -3);
  const timeFormat = date.toLocaleTimeString(locale, timeOptions);
  return `${dateFormat} в ${timeFormat}`;
};
