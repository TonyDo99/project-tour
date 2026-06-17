import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  // Funtion get token from header
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    console.log('Guard');

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    const decode = await this.jwtService.verifyAsync(token); // Decode jwt -> data

    // const requiredRoles = ['ADMIN'];
    // 1. Dùng Reflector để lấy danh sách roles yêu cầu từ Decorator

    // context.getHandler() - On level Route
    // context.getClass() - On level Route
    const roles = this.reflector.get('roles', context.getHandler());

    console.log('required roles', roles);

    // Nếu API không yêu cầu role nào -> cho qua luôn
    if (!roles.length) {
      return true;
    }

    // 2. Lấy thông tin user từ Request (thường được set bởi AuthGuard chạy trước đó)

    if (!decode.role) {
      throw new ForbiddenException('Bạn chưa đăng nhập hoặc không có quyền!');
    }

    // 3. Kiểm tra xem role của user có nằm trong danh sách yêu cầu không
    const hasRole = roles.includes(decode.role);
    if (!hasRole) {
      throw new ForbiddenException(
        'Chỉ ADMIN mới được thực hiện hành động này!',
      );
    }

    return true; // Cho phép đi tiếp vào Controller
  }
}
