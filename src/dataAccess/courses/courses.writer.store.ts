import { Connection, Repository, UpdateResult } from 'typeorm';

import {
  ICoursesWriterRepo,
  ICourse
} from '../../app/courses/courses.interface';
import { Course } from '../../domain/entity/Course';
import { User } from '../../domain/entity/User';
import { ForbiddenError } from '../../shared/error/forbidden.error';

export default class CoursesWriterStore implements ICoursesWriterRepo {
  private coursesConn: Repository<Course>;
  constructor(conn: Connection) {
    this.coursesConn = conn.getRepository(Course);
  }

  public async create(course: ICourse, user: User): Promise<ICourse> {
    const newCourse = new Course();
    newCourse.title = course.title;
    newCourse.shortdesc = course.shortdesc;
    newCourse.longdesc = course.longdesc;
    newCourse.coverurl = course.coverurl;
    newCourse.price = course.price;
    newCourse.author = user;

    const created = await this.coursesConn.save(newCourse);
    return created;
  }

  public async update(
    courseId: string,
    course: ICourse,
    user: User
  ): Promise<void> {
    const { title, shortdesc, longdesc, coverurl, price } = course;

    const found = await this.getByIdAndAuthor(courseId, user.id);

    if (!found) {
      throw new ForbiddenError('Not authorized or course not found');
    }

    await this.coursesConn
      .createQueryBuilder()
      .update(Course)
      .set({ title, shortdesc, longdesc, coverurl, price })
      .where('id = :id AND "authorId" = :authorId', {
        id: courseId,
        authorId: user.id
      })
      .execute();
  }

  public async delete(courseId: string, user: User): Promise<void> {
    const found = await this.getByIdAndAuthor(courseId, user.id);

    if (!found) {
      throw new ForbiddenError('Not authorized or course not found');
    }

    await this.coursesConn
      .createQueryBuilder()
      .delete()
      .where('id = :id AND "authorId" = :authorId', {
        id: courseId,
        authorId: user.id
      })
      .execute();
  }

  private getByIdAndAuthor(id: string, authorId: string): Promise<Course> {
    return this.coursesConn
      .createQueryBuilder('courses')
      .where('courses.id = :id', { id })
      .andWhere('courses."authorId" = :authorId', { authorId })
      .getOne();
  }
}
