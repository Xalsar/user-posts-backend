import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '@/shared/database/base.entity';
import { PostTypeOrmEntity } from '@/modules/post/adapters/persistance/post.typeorm.entity';
import { User } from '../../app/domain/user';

const tableName = 'users';

@Entity({ name: tableName })
export class UserTypeOrmEntity extends BaseEntity(
  tableName,
)<UserTypeOrmEntity> {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @OneToMany(() => PostTypeOrmEntity, (post) => post.author)
  posts: PostTypeOrmEntity[];

  static toDomain(entity: UserTypeOrmEntity) {
    return User.create({
      ...entity,
      posts: entity.posts?.map(PostTypeOrmEntity.toDomain),
    });
  }
}
