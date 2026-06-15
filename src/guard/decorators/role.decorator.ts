import { SetMetadata } from '@nestjs/common';

// Decorator này dùng để đánh dấu hàm cần những Role nào (VD: 'ADMIN', 'USER')
export const Roles = (roles: string[]) => SetMetadata('roles', roles); // roles = [ADMIN]
