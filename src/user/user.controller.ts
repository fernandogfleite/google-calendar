import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { CreateUserDto, IdParams } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async listAll() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUser(@Param() params: IdParams): Promise<UserModel> {
    return this.userService.user(params);
  }

  @Post()
  async createUser(@Body() data: CreateUserDto): Promise<UserModel> {
    return this.userService.createUser(data);
  }
}
