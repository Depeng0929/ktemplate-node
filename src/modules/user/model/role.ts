import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

export class User {
  @ApiProperty({ example: 'kong', description: '姓名' })
  readonly name: string;

  @ApiProperty({ example: 18, description: '年龄' })
  readonly age: number;

  @ApiProperty({ enum: UserRole })
  readonly role: string;

  @ApiProperty({ example: 0 })
  readonly sex: 0 | 1;
}
