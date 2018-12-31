import { Request, Response, NextFunction, RequestHandler } from 'express';
import bcrypt from 'bcrypt';

import { IJsonFormatter } from './utils/json.formatter';
import UsersWriter from '../app/users/users.writer';
import AuthService from '../app/auth/auth.service';
import { IUserAccount } from '../app/users/users.interface';
import UsersReader from '../app/users/users.reader';
import { UnauthorizedError } from '../shared/error/auth.error';
import { NotFoundError } from '../shared/error/not.found.error';
import { Logger } from '../shared/logger/logger';

export interface IWithUser extends Request {
  user?: IUserAccount;
}

export default class AuthHandler {
  constructor(
    private usersWriter: UsersWriter,
    private usersReader: UsersReader,
    private authService: AuthService,
    private logger: Logger
  ) {}

  public async signUp(
    req: Request,
    res: Response & IJsonFormatter,
    next: NextFunction
  ): Promise<void> {
    try {
      const newUser = await this.usersWriter.create(req.body);
      const token = await this.authService.issueToken(newUser.id);
      res.formattedJson(undefined, { ...newUser, token });
    } catch (err) {
      next(err);
    }
  }

  public async login(
    req: Request,
    res: Response & IJsonFormatter,
    next: NextFunction
  ): Promise<void> {
    try {
      const { password, email } = req.body;
      const {
        password: pass,
        ...user
      } = await this.usersReader.getByEmailWithPassword(email);
      const isValid = await bcrypt.compare(password, pass);
      if (!isValid) {
        throw new UnauthorizedError('Not Authorized');
      }
      const token = await this.authService.issueToken(user.id);
      res.formattedJson(undefined, { ...user, token });
    } catch (err) {
      next(err);
    }
  }

  public async isLoggedIn(
    req: IWithUser,
    _: Response & IJsonFormatter,
    next: NextFunction
  ): Promise<void> {
    try {
      const bearer = req.headers.authorization;

      if (!bearer || !bearer.startsWith('Bearer ')) {
        throw new UnauthorizedError('Not Authorized');
      }

      const token = bearer.split('Bearer ')[1].trim();

      let payload;
      let user;
      try {
        payload = await this.authService.verifyToken(token);
        user = await this.usersReader.getById(payload.id);
      } catch (e) {
        this.logger.error(e);
        throw new UnauthorizedError('Not Authorized');
      }

      if (!user) {
        throw new NotFoundError('User account not found');
      }

      req.user = user;
      next();
    } catch (err) {
      next(err);
    }
  }
}
