import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { getDonutChart } from './charts/donut.chart';
import { headerSection } from './sections/header.section';
import { getLineChart } from './charts/line.chart';
import { getBarChart } from './charts/bar.chat';

export interface TopCountry {
  country: string;
  customers: number;
}

interface ReportOptions {
  title?: string;
  subTitle?: string;
  topCountries: TopCountry[];
}

export const getStatisticsReport = async (options: ReportOptions) => {
  const [donutChart, lineChart, barChart1, barChart2] = await Promise.all([
    getDonutChart({
      entries: options.topCountries.map((c) => ({
        label: c.country,
        value: c.customers,
      })),
      position: 'left',
    }),
    getLineChart(),
    getBarChart(),
    getBarChart(),
  ]);

  const docDefinition: TDocumentDefinitions = {
    pageMargins: [40, 100, 40, 60],
    header: headerSection({
      title: options.title ?? 'Estadísticas de clientes',
      subtitle: options.subTitle ?? 'Top 10 países con más clientes',
    }),
    content: [
      {
        columns: [
          {
            stack: [
              {
                text: '10 países con más clientes',
                alignment: 'center',
                margin: [0, 0, 0, 10],
              },
              { image: donutChart, width: 320 },
            ],
          },
          {
            layout: 'lightHorizontalLines',
            width: 'auto',
            table: {
              headerRows: 1,
              widths: [100, 'auto'],
              body: [
                ['País', 'Clientes'],
                ...options.topCountries.map((c) => [c.country, c.customers]),
              ],
            },
          },
        ],
      },
      { image: lineChart, width: 500, margin: [0, 20] },
      {
        columnGap: 10,
        columns: [
          { image: barChart1, width: 250 },
          { image: barChart2, width: 250 },
        ],
      },
    ],
  };

  return docDefinition;
};
