import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { HandleException } from 'src/exception-filters/http.exception';

import { DestinationService } from './destination.service';
@Controller('destination')
@UseFilters(new HandleException())
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  @Get()
  list() {
    return this.destinationService.list();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.destinationService.getById(+id);
  }

  @Post()
  create(@Body() destinationInfo: any) {
    return this.destinationService.create(destinationInfo);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() destinationInfo: any) {
    return this.destinationService.update(+id, destinationInfo);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.destinationService.delete(+id);
  }
}
