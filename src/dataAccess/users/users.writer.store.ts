import bcrypt from 'bcrypt';

import {
  IUsersWriterRepo,
  IUserSignUp,
  IUserAccountWithPass
} from '../../app/users/users.interface';
import { User } from '../../domain/entity/User';
import { IUserInstance } from '../../infra/sequelize/models/user';
import { ISequelizeModels } from '../../infra/sequelize/db';

export default class UsersWriterStore implements IUsersWriterRepo {
  constructor(private models: ISequelizeModels) {}

  public async create(user: IUserSignUp): Promise<IUserInstance> {
    const { username, email, password } = user;
    return this.models.Users.create({
      username,
      email,
      password
    });
  }

  public async update(
    user: IUserAccountWithPass,
    loggedInUser: User
  ): Promise<void> {
    const { id, confirmed, ...rest } = user;
    if (rest.password) {
      rest.password = await bcrypt.hash(rest.password, 10);
    }

    await this.models.Users.update(rest, { where: { id: loggedInUser.id } });
  }
}
