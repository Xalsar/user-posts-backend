import { User } from '../domain/user';

export abstract class UserRepositoryPort {
  abstract findAll(): Promise<User[]>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract create(userToCreate: User): Promise<User>;
  abstract update(userToUpdate: User): Promise<User>;
  abstract delete(id: string): Promise<void>;
}
