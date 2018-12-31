import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from './User';

@Entity('courses')
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar', { length: 255, unique: true })
  public title: string;

  @Column('varchar', { length: 200 })
  public shortdesc: string;

  @Column('text', { nullable: true })
  public longdesc: string;

  @Column('text', { nullable: true })
  public coverurl: string;

  @Column('int', { default: 0 })
  public price: number;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @ManyToOne(() => User, (user: User) => user.teachings)
  public author: User;

  @ManyToMany(() => User, (user: User) => user.learnings)
  public students: User[];
}
