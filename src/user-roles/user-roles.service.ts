import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoleEntity } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(UserRoleEntity)
    private readonly userRoleRepository: Repository<UserRoleEntity>,
  ) {}

  public async getByUserId(userId: number): Promise<UserRoleEntity> {
    return await this.userRoleRepository.findOneBy({
      userId,
    });
  }
}
