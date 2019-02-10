import { Connection, Repository } from 'typeorm';

import { ICoursesReader, ICourse } from '../../app/courses/courses.interface';
import { Course } from '../../domain/entity/Course';

export default class CoursesReaderStore implements ICoursesReader {
  private coursesConn: Repository<Course>;
  constructor(conn: Connection) {
    this.coursesConn = conn.getRepository(Course);
  }

  public async getAll(): Promise<ICourse[]> {
    return this.coursesConn
      .createQueryBuilder('courses')
      .leftJoinAndSelect('courses.author', 'author')
      .getMany();
  }

  public async getById(id: string): Promise<ICourse> {
    return this.coursesConn
      .createQueryBuilder('courses')
      .leftJoinAndSelect('courses.author', 'author')
      .where('courses.id = :id', { id })
      .getOne();
  }
}
