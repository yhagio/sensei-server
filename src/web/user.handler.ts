import { Request, Response, NextFunction } from 'express';
import { IJsonFormatter } from './utils/json.formatter';
import UsersReader from '../app/users/users.reader';
import { IUserAccount } from '../app/users/users.interface';

interface IReqWithUser extends Request {
  user?: IUserAccount;
}

class UserHandler {
  constructor(private usersReader: UsersReader) {}

  public async getById(
    req: IReqWithUser,
    res: Response & IJsonFormatter,
    next: NextFunction
  ): Promise<void> {
    try {
      // const { id } = req;
      // const result = await this.usersReader.getById(id);
      res.formattedJson(undefined, req.user);
    } catch (err) {
      next(err);
    }
  }

  public async getCart(
    _: Request,
    res: Response & IJsonFormatter,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await this.usersReader.getCart();
      res.formattedJson(undefined, result);
    } catch (err) {
      next(err);
    }
  }

  public async getPurchased(
    _: Request,
    res: Response & IJsonFormatter,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await this.usersReader.getPurchased();
      res.formattedJson(undefined, result);
    } catch (err) {
      next(err);
    }
  }
}

export default UserHandler;
