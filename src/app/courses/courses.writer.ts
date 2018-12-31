import { ICourse, ICoursesWriterRepo } from './courses.interface';
import { User } from '../../domain/entity/User';

export default class CoursesWriter {
  constructor(private repository: ICoursesWriterRepo) {}

  public async create(course: ICourse, user: User): Promise<ICourse> {
    const created = await this.repository.create(course, user);
    return created;
  }

  public async update(
    courseId: string,
    course: ICourse,
    user: User
  ): Promise<void> {
    await this.repository.update(courseId, course, user);
  }

  public async delete(courseId: string, user: User): Promise<void> {
    await this.repository.delete(courseId, user);
  }
}
