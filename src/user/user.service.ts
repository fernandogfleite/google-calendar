import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto, FindOneParam, RetrieveUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async user(params: FindOneParam): Promise<User | null> {
    return this.prisma.user.findUniqueOrThrow({
      where: params,
    });
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany();

    return users.map((user) => new RetrieveUserDto(user));
  }

  async createUser(data: CreateUserDto): Promise<RetrieveUserDto> {
    return new RetrieveUserDto(await this.prisma.user.create({ data }));
  }

  async updateUser(params: {
    where: FindOneParam;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const updateUser = await this.prisma.user.update({
      data: params.data,
      where: params.where,
    });

    return new RetrieveUserDto(updateUser);
  }

  async deleteUser(
    where: Prisma.UserWhereUniqueInput,
  ): Promise<RetrieveUserDto> {
    const user = await this.prisma.user.delete({
      where,
    });

    return new RetrieveUserDto(user);
  }
}
