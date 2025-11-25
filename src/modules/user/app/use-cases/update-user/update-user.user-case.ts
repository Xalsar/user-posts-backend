import { UserTypeOrmRepository } from 'src/modules/user/adapters/persistance/user.typeorm.respository';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './inputs/update-user.input';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserTypeOrmRepository) {}

  async execute(id: string, updateData: UpdateUserInput) {
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
