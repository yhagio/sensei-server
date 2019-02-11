import { Request, Response, NextFunction } from 'express';
import { IJsonFormatter } from './utils/json.formatter';
import UsersWriter from '../app/users/users.writer';
import { User } from '../domain/entity/User';
// import RelationshipsWriter from '../app/relationships/relationships.writer';
import UsersReader from '../app/users/users.reader';

interface IReqWithUser extends Request {
  user?: User;
}

class UserHandler {
  constructor(
    private usersReader: UsersReader,
    private usersWriter: UsersWriter // private relationshipWriter: RelationshipsWriter
  ) {}

  public async getMany(
    _: IReqWithUser,
    res: Response & IJsonFormatter,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await this.usersReader.getMany();
      res.formattedJson(undefined, result);
    } catch (err) {
      next(err);
    }
  }

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

  // public async follow(
  //   req: IReqWithUser,
  //   res: Response & IJsonFormatter,
  //   next: NextFunction
  // ): Promise<void> {
  //   try {
  //     const followerId = req.user.id;
  //     const { followeeId } = req.params;
  //     const result = await this.relationshipWriter.create(
  //       followeeId,
  //       followerId
  //     );
  //     res.formattedJson(undefined, result);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  // public async unfollow(
  //   req: IReqWithUser,
  //   res: Response & IJsonFormatter,
  //   next: NextFunction
  // ): Promise<void> {
  //   try {
  //     const followerId = req.user.id;
  //     const { followeeId } = req.params;
  //     const result = await this.relationshipWriter.delete(
  //       followeeId,
  //       followerId
  //     );
  //     res.formattedJson(undefined, result);
  //   } catch (err) {
  //     next(err);
  //   }
  // }
}

export default UserHandler;
