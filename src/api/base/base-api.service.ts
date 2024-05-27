import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { JwtService } from 'src/jwt';

@Injectable()
export class BaseApiService {
  constructor(
    private httpService: HttpService,
    private jwtService: JwtService,
  ) {
    this.onInit();
  }

  async onInit() {
    const token = await this.jwtService.generateServiceToken();
    this.httpService.axiosRef.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }

  async getUserByLogin(login: string) {
    const users = await firstValueFrom(
      this.httpService
        .get(`/user?login=${login}`)
        .pipe(map((value) => value.data)),
    );

    const user = users[0];

    return user;
  }

  async createUser(userDto: any) {
    return firstValueFrom(
      this.httpService.post('/user', userDto).pipe(map((value) => value.data)),
    );
  }
}
