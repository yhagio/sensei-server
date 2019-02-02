import bcrypt from 'bcrypt';
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate
} from 'typeorm';
import { Course } from './Course';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar', { length: 255, unique: true })
  public username: string;

  @Column('varchar', { length: 255, nullable: true })
  public firstname: string;

  @Column('varchar', { length: 255, nullable: true })
  public lastname: string;

  @Column('varchar', { length: 255, unique: true })
  public email: string;

  @Column('boolean', { default: false })
  public confirmed: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @OneToMany(() => Course, (course: Course) => course.author)
  public teachings: Course[];

  @ManyToMany(() => Course, (course: Course) => course.students, {
    cascade: true
  })
  @JoinTable({ name: 'users_courses' })
  public learnings: Course[];

  @Column('text', { select: false })
  public password: string;

  @BeforeInsert()
  @BeforeUpdate()
  public async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
