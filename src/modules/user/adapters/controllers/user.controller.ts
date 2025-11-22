import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListAllUsersUseCase } from 'src/modules/user/app/use-cases/list-all-users/list-all-users.use-case';
import { CreateUserUseCase } from '../../app/use-cases/create-user/create-user.use-case';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { UpdateUserUseCase } from '../../app/use-cases/update-user/update-user.user-case';

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

class UpdateUserDto {
  @IsNotEmpty({
    message: 'Name should not be empty',
  })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @IsOptional()
  name?: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsOptional()
  email?: string;
}

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly listAllUsersUseCase: ListAllUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
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

  @ApiOperation({ summary: 'Update an existing user' })
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateData: UpdateUserDto) {
    return this.updateUserUseCase.execute(id, updateData);
  }
}
