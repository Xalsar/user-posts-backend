import { UserTypeOrmRepository } from 'src/modules/user/adapters/persistance/user.typeorm.respository';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserTypeOrmRepository) {}

  async execute(id: string, updateData: { name?: string; email?: string }) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFoundException(id);
    }

    user.updateEmail(updateData.email ?? user.email);
    user.updateName(updateData.name ?? user.name);

    await this.userRepository.update(user);

    return user;
  }
}
