export class DateFormatter {
  static toDateInput(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
      console.warn('Invalid date provided to toDateInput');
      return '';
    }

    return dateObj.toISOString().split('T')[0];
  }

  static toDisplayDate(date: Date | string, locale: string = 'es-ES'): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
      console.warn('Invalid date provided to toDisplayDate');
      return 'Fecha inválida';
    }

    return dateObj.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
