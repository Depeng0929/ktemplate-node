import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { get } from 'http';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreateUser } from 'src/modules/user/dto/create-user.dto';
import { User, UserRole } from 'src/modules/user/model/role';
import { UserService } from 'src/modules/user/user.service';

@ApiBearerAuth()
@ApiTags('user')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('mail')
  sendEmail() {
    console.log(32);
    this.userService.sendEmail();
    return 'ok';
  }

  @Get()
  @ApiOperation({ summary: '查找全部用户' })
  @ApiQuery({
    name: 'name',
    required: true,
    description: '用户名',
    example: 'kong',
  })
  @ApiQuery({
    name: 'role',
    enum: UserRole,
    description: '角色',
    example: 'admin',
  })
  @ApiResponse({
    status: 200,
    type: [User],
  })
  fetch() {
    return this.userService.fetch();
  }

  @Get('/:id')
  @ApiParam({ name: 'id', required: true, description: '用户ID' })
  @ApiOperation({ summary: '查找用户' })
  @ApiParam({
    name: 'id',
    required: true,
    example: 1,
    description: '需要查询user的ID',
  })
  @ApiResponse({
    status: 200,
    type: User,
  })
  find(@Param() { id }, @Headers('token') token) {
    if (!token) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: '请求token必传',
          error: 'id is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.userService.find(id);
  }

  @Post()
  @ApiOperation({ summary: '添加用户' })
  @ApiResponse({
    status: 200,
    type: User,
  })
  @HttpCode(201)
  create(@Body() user: CreateUser): User {
    return this.userService.create(user);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新用户信息' })
  @ApiParam({ name: 'id', required: true, description: '用户ID' })
  @ApiBody({ description: '这儿填写备注说明' })
  update(@Param('id', new ParseIntPipe()) id, @Body() { message }) {
    return this.userService.update(id, message);
  }

  @Roles('admin', 'user')
  @UseGuards(RolesGuard)
  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  @ApiParam({ name: 'id', required: true, description: '用户ID' })
  @ApiBody({ description: '这儿填写备注说明' })
  remove(@Param() { id }) {
    return this.userService.remove(id);
  }
}
