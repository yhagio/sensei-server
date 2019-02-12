import {
  IUserSignUp,
  IUsersWriterRepo,
  IUserAccountWithPass
} from './users.interface';
import { User } from '../../domain/entity/User';
import { IUserInstance } from '../../infra/sequelize/models/user';

export default class UsersWriter {
  constructor(private repository: IUsersWriterRepo) {}

  public async create(user: IUserSignUp): Promise<IUserInstance> {
    return this.repository.create(user);
  }

  public async update(
    user: IUserAccountWithPass,
    loggedInUser: User
  ): Promise<void> {
    return this.repository.update(user, loggedInUser);
  }
}
