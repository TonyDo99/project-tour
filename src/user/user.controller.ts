import { Controller, Get } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/list')
  async findAll(): Promise<UserEntity[]> {
    const users = await this.userService.findAll();

    return users;
  }
}
