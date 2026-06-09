import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TourService } from './tour.service';

@Controller('tour')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Get()
  list() {
    return this.tourService.list();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.tourService.getById(+id);
  }

  @Post()
  create(@Body() tourInfo: any) {
    return this.tourService.create(tourInfo);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() tourInfo: any) {
    return this.tourService.update(+id, tourInfo);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tourService.delete(+id);
  }
}
