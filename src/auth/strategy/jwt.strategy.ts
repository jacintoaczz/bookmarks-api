import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'prisma/prisma.service';

type JwTPayload = {
  sub: number;
  email: string;
  iat: number;
  exp: number;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(_config: ConfigService, private _prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _config.get('JWT_SECRET'),
    });
  }

  async validate({ sub }: JwTPayload) {
    const user = await this._prismaService.user.findUnique({
      where: {
        id: sub,
      },
    });

    delete user.hash;

    return user;
  }
}
