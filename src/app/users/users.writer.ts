import { IUserAccount, IUserSignUp, IUsersWriterRepo } from './users.interface';

export default class UsersWriter {
  constructor(private repository: IUsersWriterRepo) {}

  public async create(user: IUserSignUp): Promise<IUserAccount> {
    const created = await this.repository.create(user);
    return created;
  }
}
