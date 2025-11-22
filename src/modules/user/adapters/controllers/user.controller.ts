import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListAllUsersUseCase } from 'src/modules/user/app/use-cases/list-all-users/list-all-users.use-case';
import { CreateUserUseCase } from '../../app/use-cases/create-user/create-user.use-case';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

class CreateUserDto {
  @IsNotEmpty({
    message: 'Name should not be empty',
  })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  name: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;
}

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly listAllUsersUseCase: ListAllUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @ApiOperation({ summary: 'Get all users' })
  @Get()
  getUsers() {
    return this.listAllUsersUseCase.execute();
  }

  @ApiOperation({ summary: 'Create a new user' })
  @Post()
  createUser(@Body() userData: CreateUserDto) {
    return this.createUserUseCase.execute(userData);
  }
}
