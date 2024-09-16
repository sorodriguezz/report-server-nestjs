import { countries as Country } from '@prisma/client';
import { headerSection } from './sections/header.section';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { footerSection } from './sections/footer.section';

interface ReportOptions {
  title?: string;
  subtitle?: string;
  countries: Country[];
}

export const getCountriesReport = (
  options: ReportOptions,
): TDocumentDefinitions => {
  const { title, subtitle, countries } = options;

  return {
    pageOrientation: 'landscape', // horizontal
    header: headerSection({
      title: title ?? 'Countries Report',
      subtitle: subtitle ?? 'List of countries',
    }),
    footer: footerSection,
    pageMargins: [40, 110, 40, 60],
    content: [
      {
        layout: 'customLayout01',
        table: {
          headerRows: 1,
          widths: [50, 50, 50, '*', '*', '*'],
          body: [
            ['ID', 'ISO2', 'ISO4', 'NAME', 'CONTINENT', 'LOCAL NAME'],
            ...countries.map((country) => [
              country.id.toString(),
              country.iso2,
              country.iso3,
              { text: country.name, bold: true },
              country.continent,
              country.local_name,
            ]),
          ],
        },
      },
      {
        text: 'Totales',
        style: {
          fontSize: 18,
          bold: true,
          margin: [0, 40, 0, 0],
        },
      },
      {
        layout: 'noBorders',
        table: {
          headerRows: 1,
          widths: [50, 50, 50, '*', '*', '*'],
          body: [
            [
              {
                text: 'Total de países',
                colSpan: 3,
                bold: true,
              },
              {},
              {},
              {
                text: countries.length.toString(),
                bold: true,
              },
              {},
              {},
            ],
          ],
        },
      },
    ],
  };
};
