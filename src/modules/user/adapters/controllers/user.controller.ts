import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListAllUsersUseCase } from 'src/modules/user/app/use-cases/list-all-users/list-all-users.use-case';
import { CreateUserUseCase } from '../../app/use-cases/create-user/create-user.use-case';
import { UpdateUserUseCase } from '../../app/use-cases/update-user/update-user.user-case';
import { DeleteUserUseCase } from '../../app/use-cases/delete-user/delete-user.use-case';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly listAllUsersUseCase: ListAllUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
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

  @ApiOperation({ summary: 'Delete a user' })
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.deleteUserUseCase.execute(id);
  }
}
