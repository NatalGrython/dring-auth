import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseApiService } from './base-api.service';
import { JwtModule } from 'src/jwt';

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const authHost = configService.get('BASE_HOST');
        const authPort = configService.get('BASE_PORT');
        const authProtocol = configService.get('BASE_PROTOCOL');

        return { baseURL: `${authProtocol}://${authHost}:${authPort}` };
      },
      inject: [ConfigService],
    }),
    JwtModule,
  ],
  controllers: [],
  providers: [BaseApiService],
  exports: [BaseApiService],
})
export class BaseApiModule {}
