import { Injectable } from '@nestjs/common';
import { UserTypeOrmRepository } from 'src/modules/user/adapters/persistance/user.typeorm.respository';
import { User } from 'src/modules/user/app/domain/user';

interface CreateUserPort {
  name: string;
  email: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserTypeOrmRepository) {}

  async execute(userData: CreateUserPort) {
    const newUser = await this.userRepository.create(User.create(userData));
    return newUser;
  }
}
