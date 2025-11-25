import { Injectable } from '@nestjs/common';
import { UserTypeOrmEntity } from './user.typeorm.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { User } from '../../app/domain/user';

import { UserRepositoryPort } from '../../app/ports/user-repository.port';

@Injectable()
export class UserTypeOrmRepository extends UserRepositoryPort {
  constructor(
    @InjectRepository(UserTypeOrmEntity)
    private readonly userRepository: Repository<UserTypeOrmEntity>,
  ) {
    super();
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({
      relations: ['posts'],
    });

    return users.map((userEntity) => UserTypeOrmEntity.toDomain(userEntity));
  }

  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.userRepository.findOne({
      where: { email },
    });

    if (!userEntity) {
      return null;
    }

    return UserTypeOrmEntity.toDomain(userEntity);
  }

  async findById(id: string): Promise<User | null> {
    const userEntity = await this.userRepository.findOne({
      where: { id },
    });

    if (!userEntity) {
      return null;
    }

    return UserTypeOrmEntity.toDomain(userEntity);
  }

  async create(userToCreate: User): Promise<User> {
    const userEntity = this.userRepository.create(userToCreate);
    const savedUser = await this.userRepository.save(userEntity);
    return User.create({
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
    });
  }

  async update(userToUpdate: User): Promise<User> {
    const userEntity = this.userRepository.create(userToUpdate);
    const savedUser = await this.userRepository.save(userEntity);
    return UserTypeOrmEntity.toDomain(savedUser);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
