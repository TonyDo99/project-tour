import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RoleModule } from 'src/role/role.module';
import { UserRolesModule } from 'src/user-roles/user-roles.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'MySuperSecretKey', // Secret key, thực tế nên bỏ vào biến môi trường. E.g: .env
      signOptions: { expiresIn: '600s' },
    }),
    UserModule,
    UserRolesModule,
    RoleModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
