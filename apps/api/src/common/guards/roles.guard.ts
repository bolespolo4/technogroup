import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '@technobit/shared';

interface RequestWithUser {
  user?: { role: UserRole };
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;
    if (!user) return false;

    const roleHierarchy: Record<UserRole, number> = {
      [UserRole.PUBLIC]: 0,
      [UserRole.REGISTERED]: 1,
      [UserRole.PARTNER]: 2,
      [UserRole.ADMIN]: 3,
    };

    const userLevel = roleHierarchy[user.role] ?? 0;
    return requiredRoles.some((role) => userLevel >= (roleHierarchy[role] ?? 0));
  }
}
