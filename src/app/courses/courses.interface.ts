import { User } from '../../domain/entity/User';

export interface ICoursesReaderRepo {
  getAll(): Promise<ICourse[]>;
  getById(id: string): Promise<ICourse>;
}

export interface ICoursesWriterRepo {
  create(course: ICourse, user: User): Promise<ICourse>;
  update(courseId: string, course: ICourse, user: User): Promise<void>;
  delete(courseId: string, user: User): Promise<void>;
}

export interface ICourse {
  id: string;
  title: string;
  shortdesc: string;
  longdesc?: string;
  coverurl?: string;
  price?: number;
  author?: User;
}

export interface ICourseCreate {
  title: string;
  shortdesc: string;
  longdesc?: string;
  coverurl?: string;
  price?: number;
}
