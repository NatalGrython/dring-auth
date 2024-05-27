import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoidXNlciIsImlhdCI6MTcxNjIxMjMzNH0._Nkz0Qax5z4Uttei6qaYUMVajzkrdlJ6RZrfMPRcRq0',
  })
  token: string;
}
