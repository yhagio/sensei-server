import { ICourse, ICoursesReaderRepo } from './courses.interface';

export default class CoursesReader {
  constructor(private repository: ICoursesReaderRepo) {}

  public async getAll(): Promise<ICourse[]> {
    const courses = await this.repository.getAll();
    return courses;
  }

  public async getById(id: string): Promise<ICourse> {
    const course = await this.repository.getById(id);
    return course;
  }
}
