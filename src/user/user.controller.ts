import { Controller, Get } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/list')
  async findAll(): Promise<User[]> {
    const users = await this.userService.findAll();

    return users;
  }
}
