import { getHtmlContent } from './../helpers/html-to-pdfmake';
import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import fs from 'fs';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from 'src/reports/sections/header.section';
import { footerSection } from 'src/reports/sections/footer.section';

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
}
