import { Injectable } from '@nestjs/common';
import { UserTypeOrmEntity } from './user.typeorm.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { User } from '../../app/domain/user';

@Injectable()
export class UserTypeOrmRepository {
  constructor(
    @InjectRepository(UserTypeOrmEntity)
    private readonly userRepository: Repository<UserTypeOrmEntity>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();

    return users.map((userEntity) =>
      User.create({
        id: userEntity.id,
        name: userEntity.name,
        email: userEntity.email,
      }),
    );
  }

  async create(userToCreate: User): Promise<User> {
    const userEntity = this.userRepository.create(userToCreate);
    return this.userRepository.save(userEntity);
  }
}
