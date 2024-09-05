import { PrinterService } from './../printer/printer.service';
import { getEmploymentLetterReport, getHelloWorldReport } from './../reports';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  constructor(private readonly printerService: PrinterService) {
    super();
  }

  hello() {
    const docDefinition = getHelloWorldReport({
      name: 'Sebastian',
    });
    const doc = this.printerService.createPdfKitDocument(docDefinition);
    return doc;
  }

  employmentLetter() {
    const docDefinition = getEmploymentLetterReport({ name: 'Sebastian' });
    const doc = this.printerService.createPdfKitDocument(docDefinition);
    return doc;
  }
}
