import { UserRepositoryPort } from '../../ports/user-repository.port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(id: string) {
    await this.userRepository.delete(id);
  }
}
