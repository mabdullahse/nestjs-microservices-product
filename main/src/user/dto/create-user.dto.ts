// src/user/dto/create-user.dto.ts
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsNumber()
  @Transform(({ value }) => value ?? 0)
  readonly like: number;
}
