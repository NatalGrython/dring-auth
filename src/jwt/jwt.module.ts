import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule as JwtModuleLib } from '@nestjs/jwt';
import { JwtService } from './jwt.service';

@Module({
  imports: [
    JwtModuleLib.registerAsync({
      useFactory: (configService: ConfigService) => {
        const secret = configService.get('JWT_SECRET');

        return {
          secret,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
