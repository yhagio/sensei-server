import { NotFoundError } from '../../shared/error/not.found.error';
import {
  IUsersReaderRepo
  // IUserAccount,
  // IUserAccountWithPass
} from './users.interface';
import { IUserInstance } from '../../infra/sequelize/models/user';

export default class UsersReader {
  constructor(private repository: IUsersReaderRepo) {}

  public async getMany(): Promise<IUserInstance[]> {
    const accounts: IUserInstance[] = await this.repository.getMany();
    if (!accounts || !accounts.length) {
      throw new NotFoundError('User not found');
    }
    return accounts;
  }

  public async getAccount(id: string): Promise<IUserInstance> {
    const account: IUserInstance = await this.repository.getAccount(id);
    if (!account) {
      throw new NotFoundError('User not found');
    }
    return account;
  }

  public async getByEmailWithPassword(email: string): Promise<IUserInstance> {
    const account: IUserInstance = await this.repository.getByEmailWithPassword(
      email
    );
    if (!account) {
      throw new NotFoundError('User not found');
    }
    return account;
  }
}
