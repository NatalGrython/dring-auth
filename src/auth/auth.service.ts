import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { SignUpDto } from './dto/signup-dto';
import { JwtService } from 'src/jwt';
import { BaseApiService } from 'src/api';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private baseApiService: BaseApiService,
  ) {}

  async authorization(token: string) {
    try {
      const payload = await this.jwtService.verify(token);

      return payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async login(login: string, password: string) {
    try {
      const user = await this.baseApiService.getUserByLogin(login);

      const result = await compare(password, user.password);

      if (!result) {
        throw new BadRequestException();
      }

      const token = await this.jwtService.generateUserToken(user._id);

      return {
        token: token,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async signup(userDto: SignUpDto) {
    try {
      const candidate = await this.baseApiService.getUserByLogin(userDto.login);

      if (candidate) {
        throw new BadRequestException();
      }

      const passwordHash = await hash(userDto.password, 10);

      const user = await this.baseApiService.createUser({
        ...userDto,
        password: passwordHash,
      });

      const token = await this.jwtService.generateUserToken(user._id);

      return {
        token,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async generateServiceToken() {
    try {
      const token = await this.jwtService.generateServiceToken();

      return { token };
    } catch (error) {
      new BadRequestException();
    }
  }
}
