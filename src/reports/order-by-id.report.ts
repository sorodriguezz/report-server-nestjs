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

export interface CompleteOrder {
  order_id: number;
  customer_id: number;
  order_date: string;
  customers: Customers;
  order_details: OrderDetail[];
}

export interface Customers {
  customer_id: number;
  customer_name: string;
  contact_name: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
}

export interface OrderDetail {
  order_detail_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  products: Products;
}

export interface Products {
  product_id: number;
  product_name: string;
  category_id: number;
  unit: string;
  price: string;
}

interface ReportValues {
  title?: string;
  subtitle?: string;
  data: CompleteOrder;
}

export const orderByIdReport = (value: ReportValues): TDocumentDefinitions => {
  const { data } = value;
  const { customers, order_details } = data;

  const subTotal = order_details.reduce(
    (acc, orderDetail) =>
      acc + parseFloat(orderDetail.products.price) * orderDetail.quantity,
    0,
  );

  const total = subTotal * 1.15;

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
              { text: `Recibo No. ${data.order_id}\n`, bold: true },
              {
                text: `Fecha del recibo: ${DateFormatter.getDDMMYYYY(
                  new Date(data.order_date),
                )}\n`,
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
          Razón Social: ${customers.customer_name}
          Contact: ${customers.contact_name}
          Dirección: ${customers.address}`,
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
            ...order_details.map((orderDetail) => [
              orderDetail.products.product_id.toString(),
              orderDetail.products.product_name,
              orderDetail.quantity.toString(),
              {
                text: CurrencyFormatter.formatCurrency(
                  parseFloat(orderDetail.products.price),
                ),
                alignment: 'right',
              },
              {
                text: CurrencyFormatter.formatCurrency(
                  parseFloat(orderDetail.products.price) * orderDetail.quantity,
                ),
                alignment: 'right',
              },
            ]),
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
                    text: CurrencyFormatter.formatCurrency(subTotal),
                    alignment: 'right',
                  },
                ],
                [
                  { text: 'Total:', bold: true },
                  {
                    text: CurrencyFormatter.formatCurrency(total),
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
