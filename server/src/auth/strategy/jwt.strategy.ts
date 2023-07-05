import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { TokenData } from 'models/tokenData';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "process.env.JWT_SECRET",
    });
  }

  async validate(payload: TokenData) {
    return {
      id: payload.id,
      username: payload.username,
      email: payload.email,
      ban: payload.ban,
      ban_reason: payload.ban_reason
    };
  }
}
