import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsString } from 'class-validator';
import { UserRole } from 'src/modules/user/model/role';

export class CreateUser {
  @IsString()
  @ApiProperty({ example: 'kong', description: '姓名' })
  readonly name: string;

  @IsInt()
  @ApiProperty({ example: 12, description: '年龄' })
  readonly age: number;

  @IsIn([0, 1])
  @ApiProperty({ enum: UserRole, description: '角色' })
  readonly sex: 0 | 1;
}
