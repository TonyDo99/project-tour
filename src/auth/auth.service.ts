import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from 'src/role/role.service';
import { UserRolesService } from 'src/user-roles/user-roles.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private jwtService: JwtService, // jwt encode
    private readonly userService: UserService, // Get user info
    private readonly userRolesService: UserRolesService, // User to role -> user - role
    private readonly roleService: RoleService, // Get role info
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    this.logger.log('Request of user', {
      user: {
        email,
        password,
      },
    });

    const account = await this.userService.getUser(email, password);

    this.logger.log('Account user', {
      data: account,
    });

    if (!account) {
      throw new UnauthorizedException('This account are not exist');
    }

    const userRoles = await this.userRolesService.getByUserId(account.id);

    this.logger.log('User to role ', {
      data: userRoles,
    });

    if (!userRoles) {
      throw new NotFoundException('This account are not setup role yet');
    }

    const role = await this.roleService.getByRoleId(userRoles.roleId);

    this.logger.log('Role ', {
      data: role,
    });

    const info = {
      id: account.id,
      name: account.fullName,
      email: account.email,
      role: role.name,
    };

    this.logger.log('The info will be encrypt', {
      data: info,
    });
    return {
      access_token: await this.jwtService.signAsync(info), // Encode data -> jwt token
    };
  }
}
