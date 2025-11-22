import { Injectable } from '@nestjs/common';
import { UserTypeOrmRepository } from 'src/modules/user/adapters/persistance/user.typeorm.respository';

@Injectable()
export class ListAllUsersUseCase {
  constructor(private readonly userRepository: UserTypeOrmRepository) {}

  async execute() {
    return this.userRepository.findAll();
  }
}
