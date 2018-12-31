import { Request, NextFunction } from 'express';
import { IJsonFormatter } from './utils/json.formatter';
import CoursesReader from '../app/courses/courses.reader';

export default class CourseHandler {
  constructor(private coursesReader: CoursesReader) {}

  public async getAll(
    _: Request,
    res: Response & IJsonFormatter,
    next: NextFunction
  ): Promise<void> {
    try {
      const courses = await this.coursesReader.getAll();
      res.formattedJson(undefined, courses);
    } catch (err) {
      next(err);
    }
  }

  public async getById(
    req: Request,
    res: Response & IJsonFormatter,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const courseInfo = await this.coursesReader.getById(id);
      res.formattedJson(undefined, courseInfo);
    } catch (err) {
      next(err);
    }
  }
}
