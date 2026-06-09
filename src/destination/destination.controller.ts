import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DestinationService } from './destination.service';

@Controller('destination')
export class DestinationController {
  private logger = new Logger(DestinationController.name);

  constructor(private readonly destinationService: DestinationService) {}

  @Get()
  list() {
    return this.destinationService.list();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    this.logger.debug({
      message: 'Get by id',
      data: id,
    });
    return this.destinationService.getById(+id);
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
