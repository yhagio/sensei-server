import { NotFoundError } from '../../shared/error/not.found.error';
import {
  IUsersReaderRepo,
  IUserAccount,
  IUserAccountWithPass
} from './users.interface';

export default class UsersReader {
  constructor(private repository: IUsersReaderRepo) {}

  public async getById(id: string): Promise<IUserAccount> {
    const account: IUserAccount = await this.repository.getById(id);
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

  public async getCart(): Promise<IUserAccount> {
    const account: IUserAccount = await this.repository.getCart();
    if (!account) {
      throw new NotFoundError('Cart not found');
    }
    return account;
  }

  public async getPurchased(): Promise<IUserAccount> {
    const account: IUserAccount = await this.repository.getPurchased();
    if (!account) {
      throw new NotFoundError('Purchased not found');
    }
    return account;
  }
}
