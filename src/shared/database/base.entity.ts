import {
  CreateDateColumn,
  ObjectLiteral,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export function BaseEntity(tableName: string) {
  abstract class BaseEntity<T extends ObjectLiteral> {
    @PrimaryColumn({
      name: `${tableName}_id`,
      primaryKeyConstraintName: `PK_${tableName}_id`,
      nullable: false,
    })
    id: string;

    @CreateDateColumn({ name: 'created_at', nullable: false })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', nullable: false })
    updatedAt: Date;

    constructor(entity: Partial<BaseEntity<T>>) {
      Object.assign(this, entity);
    }
  }
  return BaseEntity;
}
