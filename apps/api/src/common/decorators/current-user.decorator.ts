import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../../database/entities/user.entity';

interface RequestWithUser {
  user: UserEntity;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): UserEntity => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    return request.user;
  },
);
