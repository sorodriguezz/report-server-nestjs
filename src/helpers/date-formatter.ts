export class DateFormatter {
  static getDDMMYYYY(date: Date): string {
    const formatter = new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    });

    return formatter.format(date);
  }
}
