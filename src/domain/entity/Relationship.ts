import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('relationships')
export class Relationship extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('uuid', { nullable: true })
  public followerId: string;

  @Column('uuid', { nullable: true })
  public followeeId: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;
}
