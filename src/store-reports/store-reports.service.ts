import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from './../printer/printer.service';
import { orderByIdReport } from './../reports/order-by-id.report';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
  constructor(private readonly printerService: PrinterService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async getOrderByIdReport(orderId: string) {
    const docDefinition = orderByIdReport();
    const doc = this.printerService.createPdfKitDocument(docDefinition);
    return doc;
  }
}
