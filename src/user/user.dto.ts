/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsEmail, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import { User } from '@prisma/client';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class RetrieveUserDto implements User {
  constructor(partial: Partial<RetrieveUserDto>) {
    Object.assign(this, partial);
  }

  id: string;

  createdAt: Date;

  updatedAt: Date;

  name: string;

  email: string;

  @Exclude()
  password: string;
}

export class IdParams {
  @IsNotEmpty()
  id: string;
}

export class EmailParams {
  @IsEmail()
  email: string;
}

export type FindOneParam = IdParams | EmailParams;
