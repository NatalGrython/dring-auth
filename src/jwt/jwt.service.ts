import { Injectable } from '@nestjs/common';
import { JwtService as JwtServiceLib } from '@nestjs/jwt';

interface ServiceTokenPayload {
  type: 'service';
}

interface UserTokenPayload {
  type: 'user';
  id: string;
}

export type TokenPayload = ServiceTokenPayload | UserTokenPayload;

@Injectable()
export class JwtService {
  constructor(private jwtService: JwtServiceLib) {}

  generateServiceToken() {
    return this.jwtService.signAsync({
      type: 'service',
    });
  }

  generateUserToken(id: string) {
    return this.jwtService.signAsync({
      type: 'user',
      id,
    });
  }

  verify(token: string) {
    return this.jwtService.verifyAsync<TokenPayload>(token);
  }
}
