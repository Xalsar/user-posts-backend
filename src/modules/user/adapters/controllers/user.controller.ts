import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ListAllUsersUseCase } from 'src/modules/user/app/use-cases/list-all-users/list-all-users.use-case';
import { CreateUserUseCase } from '../../app/use-cases/create-user/create-user.use-case';
import { UpdateUserUseCase } from '../../app/use-cases/update-user/update-user.user-case';
import { DeleteUserUseCase } from '../../app/use-cases/delete-user/delete-user.use-case';

import { CreateUserRequestDto } from './dtos/request/create-user.request.dto';
import { UpdateUserRequestDto } from './dtos/request/update-user.request.dto';
import { GetUsersResponseDto } from './dtos/response/get-users.response.dto';
import { CreateUserResponseDto } from './dtos/response/create-user.response.dto';
import { UpdateUserResponseDto } from './dtos/response/update-user.response.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly listAllUsersUseCase: ListAllUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @ApiOperation({ summary: 'Get all users. And its posts' })
  @ApiOkResponse({
    type: [GetUsersResponseDto],
    description: 'List of users and their posts listed successfully',
  })
  @Get()
  async getUsers(): Promise<GetUsersResponseDto[]> {
    const users = await this.listAllUsersUseCase.execute();
    return users.map((user) => GetUsersResponseDto.create(user));
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiOkResponse({
    type: CreateUserResponseDto,
    description: 'User created successfully',
  })
  @ApiConflictResponse({
    description: 'User with the given email already exists',
  })
  @Post()
  async createUser(
    @Body() userData: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    const user = await this.createUserUseCase.execute(userData);
    return CreateUserResponseDto.create(user);
  }

  @ApiOperation({ summary: 'Update an existing user' })
  @ApiOkResponse({
    type: UpdateUserResponseDto,
    description: 'User updated successfully',
  })
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateData: UpdateUserRequestDto,
  ): Promise<UpdateUserResponseDto> {
    const user = await this.updateUserUseCase.execute(id, updateData);
    return UpdateUserResponseDto.create(user);
  }

  @ApiOperation({ summary: 'Delete a user' })
  @ApiOkResponse({
    description: 'User deleted successfully',
  })
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.deleteUserUseCase.execute(id);
  }
}
