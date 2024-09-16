import { DateFormatter } from './../../helpers/date-formatter';
import { Content } from 'pdfmake/interfaces';

interface HeaderOptions {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 10, 0, 20],
};

const currentDate: Content = {
  text: DateFormatter.getDDMMYYYY(new Date()),
  alignment: 'right',
  margin: [20, 20, 20, 20],
  width: 150,
};

export const headerSection = (options: HeaderOptions): Content => {
  const { title, subtitle, showLogo = true, showDate = true } = options;

  const headerLogo: Content = showLogo ? logo : null;
  const headerDate: Content = showDate ? currentDate : null;

  const headerSubtitle: Content = subtitle
    ? {
        text: subtitle,
        alignment: 'center',
        margin: [0, 2, 0, 0],
        style: {
          fontSize: 16,
          bold: true,
        },
      }
    : null;

  const headerTitle: Content = title
    ? {
        stack: [
          {
            text: title,
            alignment: 'center',
            margin: [0, 15, 0, 0],
            style: {
              bold: true,
              fontSize: 22,
            },
          },
          headerSubtitle,
        ],
      }
    : null;

  return {
    columns: [headerLogo, headerTitle, headerDate],
  };
};
