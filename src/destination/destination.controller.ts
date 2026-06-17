import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HandleException } from 'src/exception-filters/http.exception';
import { ResponseException } from 'src/exception-filters/response.exception';
import { RolesGuard } from 'src/guard/authorization';
import { Roles } from 'src/guard/decorators/role.decorator';
import { ResponseInterceptor } from 'src/interceptor/logger.interceptor';
import { DestinationService } from './destination.service';
import { CreateDestinationDto } from './dto/create.dto';

/**
 * @description
 * - Router chỉ áp dụng cho user có roles là ADMIN | USER
 * - UseGuards decorator chạy vào RolesGuard instance nơi thực thi logic
 * - Roles decorator là một custom để set metadata khi request đi vào, context nối các roles để guard có thể biết cần verify trên roles nào
 * - Level controller
 */
// @UseGuards(RolesGuard)
// @Roles(['ADMIN', 'USER'])
@Controller('destination')
@UseFilters(new ResponseException())
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  /**
   * @description
   * - Router chỉ áp dụng cho user có roles là ADMIN | USER
   * - UseGuards decorator chạy vào RolesGuard instance nơi thực thi logic
   * - Roles decorator là một custom để set metadata khi request đi vào, context nối các roles để guard có thể biết cần verify trên roles nào
   */
  @UseGuards(RolesGuard)
  @Roles(['ADMIN', 'USER'])
  // @UseInterceptors(new ResponseInterceptor())
  @Get()
  list() {
    return this.destinationService.list();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.destinationService.getById(+id);
  }

  /**
   * @description
   * - Router chỉ áp dụng cho user có roles là DEVELOPER
   * - UseGuards decorator chạy vào RolesGuard instance nơi thực thi logic
   * - Roles decorator là một custom để set metadata khi request đi vào, context nối các roles để guard có thể biết cần verify trên roles nào
   */
  @UseGuards(RolesGuard)
  @Roles(['ADMIN'])
  // @UseInterceptors(new ResponseInterceptor())
  @Post()
  create(@Body() destinationInfo: CreateDestinationDto) {
    console.log('Controller', destinationInfo);
    return this.destinationService.create(destinationInfo);
  }

  /**
   * @description
   * - Router chỉ áp dụng cho user có roles là ADMIN
   * - UseGuards decorator chạy vào RolesGuard instance nơi thực thi logic
   * - Roles decorator là một custom để set metadata khi request đi vào, context nối các roles để guard có thể biết cần verify trên roles nào
   */
  // @UseGuards(RolesGuard)
  // @Roles(['ADMIN'])
  @Put('/admin:id')
  update(@Param('id') id: string, @Body() destinationInfo: any) {
    return this.destinationService.update(+id, destinationInfo);
  }
}
