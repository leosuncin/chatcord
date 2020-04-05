import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '~auth/schemas/user.schema';
import { UserService } from '~auth/services/user.service';
import { JwtPayload } from '~auth/types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async verifyPayload(payload: JwtPayload) {
    try {
      return this.userService.findOne(payload.sub);
    } catch {
      return null;
    }
  }

  signToken(user: User) {
    const payload = {
      sub: user._id,
    };

    return this.jwtService.sign(payload);
  }
}
