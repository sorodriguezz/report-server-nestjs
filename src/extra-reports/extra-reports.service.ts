import { Injectable } from '@nestjs/common';
import fs from 'fs';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from 'src/printer/printer.service';
import { getCustomReport } from 'src/reports/custom.report';
import { footerSection } from 'src/reports/sections/footer.section';
import { headerSection } from 'src/reports/sections/header.section';
import { getHtmlContent } from './../helpers/html-to-pdfmake';

@Injectable()
export class ExtraReportsService {
  constructor(private readonly printerService: PrinterService) {}

  getHtmlReport() {
    const html = fs.readFileSync('src/reports/html/basic-03.html', 'utf-8');

    const content = getHtmlContent(html, {
      client: 'Sebastian Rodriguez',
      title: 'test',
    });

    const docDefinition: TDocumentDefinitions = {
      pageMargins: [40, 110, 40, 40],
      header: headerSection({
        title: 'HTML to PDFMake',
        subtitle: 'Convertir HTML a PDFMake',
      }),
      footer: footerSection,
      content: content,
    };

    const doc = this.printerService.createPdfKitDocument(docDefinition);
    return doc;
  }

  getCustomReport() {
    const docDefinition = getCustomReport();
    const doc = this.printerService.createPdfKitDocument(docDefinition);
    return doc;
  }

  getCustomSize() {
    const doc = this.printerService.createPdfKitDocument({
      // pageSize: 'TABLOID',
      pageSize: {
        width: 150,
        height: 300,
      },
      content: [
        { qr: 'http://devtalles.com', fit: 100, alignment: 'center' },
        {
          text: 'Reporte con tamaño',
          fontSize: 10,
          alignment: 'center',
          margin: [0, 20],
        },
      ],
    });
    return doc;
  }
}
