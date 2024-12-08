import { TDocumentDefinitions } from 'pdfmake/interfaces';

export const getCustomReport = () => {
  const docDefinition: TDocumentDefinitions = {
    defaultStyle: {
      fontSize: 10,
    },
    content: [
      {
        columns: [
          {
            image: 'src/assets/tucan-code-logo.png',
            width: 50,
          },
          {
            alignment: 'center',
            text: `Forest Admin Community SAP\nRUT: 11.111.111-1\nCamino montaña km14\nTeléfono 234234324`,
          },
          {
            alignment: 'right',
            width: 140,
            layout: 'borderBlue',
            table: {
              body: [
                [
                  {
                    layout: 'noBorders',
                    table: {
                      body: [
                        ['No. Fac:', '1234-34'],
                        ['Fecha:', '2021-03-12'],
                        ['Version:', '2024-001'],
                      ],
                    },
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        margin: [0, 5],
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 515,
            y2: 5,
            lineWidth: 2,
            lineColor: '#3A4546',
          },
        ],
      },
      {
        table: {
          widths: ['auto', '*', 'auto', '*'],
          body: [
            [
              {
                text: 'Datos del cliente',
                fillColor: '#5775E1',
                color: 'white',
                colSpan: 4,
                // border: [false, false, false, false],
              },
              {},
              {},
              {},
            ],
            [
              {
                text: 'Razón Social',
                fillColor: '#343a40',
                color: 'white',
                bold: true,
              },
              {
                text: '',
                fillColor: 'white',
              },
              {
                text: 'Dirección',
                fillColor: '#343a40',
                color: 'white',
              },
              {
                text: '',
                fillColor: 'white',
              },
            ],
            [
              {
                text: 'RUT',
                fillColor: '#343a40',
                color: 'white',
                bold: true,
              },
              {
                text: '',
                fillColor: 'white',
              },
              {
                text: 'Teléfono',
                fillColor: '#343a40',
                color: 'white',
              },
              {
                text: '',
                fillColor: 'white',
              },
            ],
            [
              {
                text: 'Giro',
                fillColor: '#343a40',
                color: 'white',
                bold: true,
              },
              {
                text: '',
                fillColor: 'white',
              },
              {
                text: 'Condición de pago',
                fillColor: '#343a40',
                color: 'white',
              },
              {
                text: '',
                fillColor: 'white',
              },
            ],
          ],
        },
      },
    ],
  };
  return docDefinition;
};
