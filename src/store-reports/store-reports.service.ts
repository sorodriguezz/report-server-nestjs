import { getStatisticsReport } from './../reports/statistics.report';
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from './../printer/printer.service';
import { orderByIdReport } from './../reports/order-by-id.report';
import { getBasicChatSvg, getHelloWorldReport } from 'src/reports';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
  constructor(private readonly printerService: PrinterService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async getOrderByIdReport(orderId: number) {
    const order = await this.orders.findUnique({
      where: {
        order_id: orderId,
      },
      include: {
        customers: true, // todos, sino hay que describirlo con un objeto
        order_details: {
          include: {
            products: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }

    const docDefinition = orderByIdReport({
      data: order as any,
    });
    const doc = this.printerService.createPdfKitDocument(docDefinition);
    return doc;
  }

  async getSvgChart() {
    const docDefinition = await getBasicChatSvg();
    const doc = this.printerService.createPdfKitDocument(docDefinition);
    return doc;
  }

  async getStatistics() {
    const topCountries = await this.customers.groupBy({
      by: ['country'],
      _count: true, // se puede especificar la columna con {}
      orderBy: {
        _count: {
          country: 'desc',
        },
      },
      take: 10,
    });

    const topCountryData = topCountries.map(({ country, _count }) => ({
      country,
      customers: _count,
    }));

    const docDefinition = await getStatisticsReport({
      topCountries: topCountryData,
    });

    const doc = this.printerService.createPdfKitDocument(docDefinition);

    return doc;
  }
}
