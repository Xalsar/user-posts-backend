import { Module, Post } from '@nestjs/common';
import { UserController } from './adapters/controllers/user.controller';
import { ListAllUsersUseCase } from './app/use-cases/list-all-users/list-all-users.use-case';
import { UserTypeOrmRepository } from './adapters/persistance/user.typeorm.respository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeOrmEntity } from './adapters/persistance/user.typeorm.entity';
import { CreateUserUseCase } from './app/use-cases/create-user/create-user.use-case';
import { UpdateUserUseCase } from './app/use-cases/update-user/update-user.user-case';
import { DeleteUserUseCase } from './app/use-cases/delete-user/delete-user.use-case';
import { PostTypeOrmEntity } from '../post/adapters/persistance/post.typeorm.entity';

const useCases = [
  ListAllUsersUseCase,
  CreateUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrmEntity, PostTypeOrmEntity])],
  controllers: [UserController],
  providers: [...useCases, UserTypeOrmRepository],
  exports: [UserTypeOrmRepository],
})
export class UserModule {}
