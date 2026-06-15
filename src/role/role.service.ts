import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  public async getByRoleId(roleId: number): Promise<RoleEntity> {
    return await this.roleRepository.findOneBy({
      id: roleId,
    });
  }
}
