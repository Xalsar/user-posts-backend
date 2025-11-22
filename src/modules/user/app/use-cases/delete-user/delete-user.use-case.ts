import { UserTypeOrmRepository } from 'src/modules/user/adapters/persistance/user.typeorm.respository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserTypeOrmRepository) {}

  async execute(id: string) {
    await this.userRepository.delete(id);
  }
}
