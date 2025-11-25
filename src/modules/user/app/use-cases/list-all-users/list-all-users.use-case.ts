import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../../ports/user-repository.port';

@Injectable()
export class ListAllUsersUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}
  async execute() {
    return this.userRepository.findAll();
  }
}
