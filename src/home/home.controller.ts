import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from 'src/home/dto/create-user.dto';
import { ListAllUser } from 'src/home/dto/list-all-user.dto';
import { UserService } from 'src/home/home.service';

@Controller('home')
export class HomeController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(@Req() request: Request, @Query() query: ListAllUser) {
    return this.userService.findAll();
  }

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    this.userService.create(createUserDto);
  }

  @Get(':id')
  finOne(@Param('id') id: string): string {
    return `Hello finOne ${id}`;
  }
}
