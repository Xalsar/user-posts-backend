import { createId } from 'src/shared/utils/create-id';

export class User {
  id: string;
  name: string;
  email: string;

  private constructor(user: Partial<User>) {
    this.id = user.id ?? createId('user')();
    this.name = user.name ?? '';
    this.email = user.email ?? '';
  }

  static create(userData: Partial<User>): User {
    return new User(userData);
  }

  updateName(name: string) {
    this.name = name;
  }

  updateEmail(email: string) {
    this.email = email;
  }
}
