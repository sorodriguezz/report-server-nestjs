import { Controller, Get, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  hello(@Res() res: Response) {
    const pdfDoc = this.basicReportsService.hello();

    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'HelloWorld.pdf';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }
}
