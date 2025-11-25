import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './inputs/update-user.input';
import { UserRepositoryPort } from '../../ports/user-repository.port';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

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
