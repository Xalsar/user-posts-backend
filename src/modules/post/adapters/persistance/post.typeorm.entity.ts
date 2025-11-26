import { BaseEntity } from 'src/shared/database/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserTypeOrmEntity } from '@/modules/user/adapters/persistance/user.typeorm.entity';
import { Post } from '../../app/domain/post';

const tableName = 'posts';

@Entity({ name: tableName })
export class PostTypeOrmEntity extends BaseEntity(
  tableName,
)<PostTypeOrmEntity> {
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: false })
  authorId: string;

  @ManyToOne(() => UserTypeOrmEntity, (user) => user.posts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'authorId' })
  author: UserTypeOrmEntity;

  static toDomain(entity: PostTypeOrmEntity) {
    const post = Post.create({
      id: entity.id,
      title: entity.title,
      content: entity.content,
      authorId: entity.authorId,
    });

    if (entity.author) {
      post.setAuthor(UserTypeOrmEntity.toDomain(entity.author));
    }

    return post;
  }
}
