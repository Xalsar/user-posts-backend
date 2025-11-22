import { Module } from '@nestjs/common';
import { UserController } from './adapters/controllers/user.controller';
import { ListAllUsersUseCase } from './app/use-cases/list-all-users/list-all-users.use-case';
import { UserTypeOrmRepository } from './adapters/persistance/user.typeorm.respository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeOrmEntity } from './adapters/persistance/user.typeorm.entity';
import { CreateUserUseCase } from './app/use-cases/create-user/create-user.use-case';
import { UpdateUserUseCase } from './app/use-cases/update-user/update-user.user-case';

const useCases = [ListAllUsersUseCase, CreateUserUseCase, UpdateUserUseCase];

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrmEntity])],
  controllers: [UserController],
  providers: [...useCases, UserTypeOrmRepository],
})
export class UserModule {}
