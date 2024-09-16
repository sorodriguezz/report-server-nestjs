import { CurrencyFormatter } from './../helpers/currency-formatter';
import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';
import { footerSection } from './sections/footer.section';

const logo: Content = {
  image: 'src/assets/tucan-banner.png',
  width: 100,
  height: 30,
  margin: [10, 30],
};

const styles: StyleDictionary = {
  header: {
    fontSize: 20,
    bold: true,
    margin: [0, 30, 0, 0],
  },
  subHeader: {
    fontSize: 16,
    bold: true,
    margin: [0, 20, 0, 0],
  },
};

export const orderByIdReport = (): TDocumentDefinitions => {
  return {
    styles: styles,
    header: logo,
    pageMargins: [40, 60, 40, 60],
    footer: footerSection,
    content: [
      {
        text: 'Tucan Code',
        style: 'header',
      },
      {
        columns: [
          {
            text: '15 Montgomery Str, Suite 100, \nOttawa ON K2Y 9X1, CAMADA\nBN:12783671823\nhttps://devtalles.com',
          },
          {
            text: [
              { text: 'Recibo No. 123456\n', bold: true },
              {
                text: `Fecha del recibo: ${DateFormatter.getDDMMYYYY(
                  new Date(),
                )}`,
              },
              {
                text: `Pagar antes de: ${DateFormatter.getDDMMYYYY(
                  new Date(),
                )}`,
              },
            ],
            alignment: 'right',
          },
        ],
      },
      {
        qr: 'https://devtalles.com',
        fit: 75,
        alignment: 'right',
      },
      {
        text: [
          { text: 'Cobrar a: \n', style: 'subHeader' },
          `
          Razón Social: Richter Supermarkt
          Michael Holz
          Grenzacherweg 237`,
        ],
      },
      {
        layout: 'headerLineOnly',
        margin: [0, 20],
        table: {
          headerRows: 1,
          widths: [50, '*', 'auto', 'auto', 'auto'],
          body: [
            ['ID', 'Descripción', 'Cantidad', 'Precio', 'Total'],
            [
              '1',
              'Producto 1',
              '1',
              CurrencyFormatter.formatCurrency(100),
              CurrencyFormatter.formatCurrency(1100),
            ],
            [
              '2',
              'Producto 2',
              '2',
              CurrencyFormatter.formatCurrency(150),
              {
                text: CurrencyFormatter.formatCurrency(500),
                alignment: 'right',
              },
            ],
          ],
        },
      },
      '\n\n',
      {
        columns: [
          {
            width: '*',
            text: '',
          },
          {
            width: 'auto',
            layout: 'noBorders',
            table: {
              widths: ['auto', 'auto'],
              body: [
                [
                  'Subtotal:',
                  {
                    text: CurrencyFormatter.formatCurrency(1600),
                    alignment: 'right',
                  },
                ],
                [
                  { text: 'Total:', bold: true },
                  {
                    text: CurrencyFormatter.formatCurrency(1920),
                    alignment: 'right',
                    bold: true,
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  };
};
