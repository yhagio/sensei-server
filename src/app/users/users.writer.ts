import {
  IUserAccount,
  IUserSignUp,
  IUsersWriterRepo,
  IUserAccountWithPass
} from './users.interface';
import { User } from '../../domain/entity/User';

export default class UsersWriter {
  constructor(private repository: IUsersWriterRepo) {}

  public async create(user: IUserSignUp): Promise<IUserAccount> {
    const created = await this.repository.create(user);
    return created;
  }

  public async update(
    user: IUserAccountWithPass,
    loggedInUser: User
  ): Promise<void> {
    await this.repository.update(user, loggedInUser);
  }
}
