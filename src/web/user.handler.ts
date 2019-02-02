import { Request, Response, NextFunction } from 'express';
import { IJsonFormatter } from './utils/json.formatter';
import UsersWriter from '../app/users/users.writer';
import { User } from '../domain/entity/User';

interface IReqWithUser extends Request {
  user?: User;
}

class UserHandler {
  constructor(private usersWriter: UsersWriter) {}

  public async getAccount(
    req: IReqWithUser,
    res: Response & IJsonFormatter,
    next: NextFunction
  ): Promise<void> {
    try {
      res.formattedJson(undefined, req.user);
    } catch (err) {
      next(err);
    }
  }

  public async update(
    req: IReqWithUser,
    res: Response & IJsonFormatter,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req.body;
      const result = await this.usersWriter.update(user, req.user);
      res.formattedJson(undefined, result);
    } catch (err) {
      next(err);
    }
  }
}

export default UserHandler;
