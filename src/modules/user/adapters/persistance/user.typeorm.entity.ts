import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from 'src/shared/database/base.entity';

const tableName = 'users';

@Entity({ name: tableName })
export class UserTypeOrmEntity extends BaseEntity(
  tableName,
)<UserTypeOrmEntity> {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;
}
