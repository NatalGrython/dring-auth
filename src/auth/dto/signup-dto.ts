import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty()
  login: string;

  @ApiProperty()
  password: string;
}
