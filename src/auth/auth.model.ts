import { ApiProperty } from '@nestjs/swagger';

export interface TokenPayloadType {
  type: 'user' | 'service';
}

export class TokenPayload implements TokenPayloadType {
  @ApiProperty({
    enum: ['user', 'service'],
  })
  type: 'user' | 'service';

  @ApiProperty()
  iat: number;
}

export class Token {
  @ApiProperty()
  token: string;
}
