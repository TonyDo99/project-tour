import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async getUser(email: string, password: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({
      email,
      password,
    });
  }

  /**
   * Option 1: Xử lý thông qua logic trên UserService - Tự control và manual thủ công trong code
   * Option 2: Thông qua SQL - Tuơng tự cách 1 nhưng thông qua ORM
   * Option 3: Thông qua Interceptor của Nestjs - Chuẩn trong application
   */
  async getUserById(id: number): Promise<Omit<UserEntity, 'password'>> {
    try {
      return await this.userRepository.findOneBy({
        id,
      });
    } catch (error) {
      console.error('error', error);
    }
  }
}
