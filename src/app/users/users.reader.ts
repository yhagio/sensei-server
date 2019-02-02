import { NotFoundError } from '../../shared/error/not.found.error';
import {
  IUsersReaderRepo,
  IUserAccount,
  IUserAccountWithPass
} from './users.interface';

export default class UsersReader {
  constructor(private repository: IUsersReaderRepo) {}

  public async getAccount(id: string): Promise<IUserAccount> {
    const account: IUserAccount = await this.repository.getAccount(id);
    if (!account) {
      throw new NotFoundError('User not found');
    }
    return account;
  }

  public async getByEmailWithPassword(
    email: string
  ): Promise<IUserAccountWithPass> {
    const account: IUserAccountWithPass = await this.repository.getByEmailWithPassword(
      email
    );
    if (!account) {
      throw new NotFoundError('User not found');
    }
    return account;
  }
}
