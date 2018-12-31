import { Connection, Repository } from 'typeorm';

import {
  IUserAccount,
  IUsersWriterRepo,
  IUserSignUp
} from '../../app/users/users.interface';
import { User } from '../../domain/entity/User';

export default class UsersWriterStore implements IUsersWriterRepo {
  private userConn: Repository<User>;
  constructor(conn: Connection) {
    this.userConn = conn.getRepository(User);
  }

  public async create(user: IUserSignUp): Promise<IUserAccount> {
    const newUser = new User();
    newUser.username = user.username;
    newUser.email = user.email;
    newUser.password = user.password;

    const { id, username, email } = await this.userConn.save(newUser);
    return { id, username, email };
  }
}
