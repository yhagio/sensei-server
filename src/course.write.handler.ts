import { Request, NextFunction } from 'express';
import { IJsonFormatter } from './web/utils/json.formatter';
import CoursesWriter from './app/courses/courses.writer';
import { User } from './domain/entity/User';

export interface IWithUser extends Request {
  user?: User;
}

export default class CourseHandler {
  constructor(private coursesWriter: CoursesWriter) {}

  public async create(
    req: IWithUser,
    res: Response & IJsonFormatter,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req.user;
      const course = req.body;
      const { author, ...courseInfo } = await this.coursesWriter.create(
        course,
        user
      );
      res.formattedJson(undefined, courseInfo);
    } catch (err) {
      next(err);
    }
  }

  public async update(
    req: IWithUser,
    res: Response & IJsonFormatter,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req.user;
      const course = req.body;
      const courseId = req.params.id;
      await this.coursesWriter.update(courseId, course, user);
      res.formattedJson(undefined, { ...course, id: courseId });
    } catch (err) {
      next(err);
    }
  }

  public async delete(
    req: IWithUser,
    res: Response & IJsonFormatter,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req.user;
      const course = req.body;
      const courseId = req.params.id;
      await this.coursesWriter.delete(courseId, user);
      res.formattedJson(undefined, { ...course, id: courseId });
    } catch (err) {
      next(err);
    }
  }
}
