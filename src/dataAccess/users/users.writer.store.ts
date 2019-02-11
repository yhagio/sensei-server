// import { Connection, Repository } from 'typeorm';
// import bcrypt from 'bcrypt';

import {
  // IUserAccount,
  IUsersWriterRepo,
  IUserSignUp,
  IUserAccountWithPass
} from '../../app/users/users.interface';
import { User } from '../../domain/entity/User';
// import { NotFoundError } from '../../shared/error/not.found.error';
import { IUserInstance } from '../../infra/sequelize/models/user';
import { ISequelizeModels } from '../../infra/sequelize/db';

export default class UsersWriterStore implements IUsersWriterRepo {
  // private userConn: Repository<User>;
  constructor(private models: ISequelizeModels) {
    // this.userConn = conn.getRepository(User);
  }

  public async create(user: IUserSignUp): Promise<IUserInstance> {
    const { username, email, password } = user;
    const created = await this.models.Users.create({
      username,
      email,
      password
    });
    return created;
    // const newUser = new User();
    // newUser.username = user.username;
    // newUser.email = user.email;
    // newUser.password = user.password;

    // const { id, username, email } = await this.userConn.save(newUser);
    // return { id, username, email };
  }

  public async update(
    user: IUserAccountWithPass,
    loggedInUser: User
  ): Promise<void> {
    const { id, confirmed, ...rest } = user;
    await this.models.Users.update(rest, { where: { id: loggedInUser.id } });
    // const { id, confirmed, ...rest } = user;
    // const foundUser = await this.userConn.findOne(loggedInUser.id);

    // if (!foundUser) {
    //   throw new NotFoundError('User not found');
    // }

    // if (rest.password) {
    //   rest.password = await bcrypt.hash(rest.password, 10);
    // }

    // await this.userConn
    //   .createQueryBuilder()
    //   .update(User)
    //   .set(rest)
    //   .where('id = :id', { id: loggedInUser.id })
    //   .execute();
  }
}
