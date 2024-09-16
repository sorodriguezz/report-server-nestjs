import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
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

  @Get('employment-letter')
  employmentLetter(@Res() res: Response) {
    const pdfDoc = this.basicReportsService.employmentLetter();

    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment-Letter';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  @Get('employment-letter/:employeeId')
  async employmentLetterById(
    @Res() res: Response,
    @Param('employeeId', ParseIntPipe) employeeId: number,
  ) {
    const pdfDoc = await this.basicReportsService.employmentLetterById(employeeId);

    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment-Letter';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }
}
