import {
  IUserAccount,
  IUserAccountWithPass,
  IUsersReaderRepo
} from '../../app/users/users.interface';
import { Connection, Repository } from 'typeorm';
import { User } from '../../domain/entity/User';

export default class UsersReaderStore implements IUsersReaderRepo {
  private userConn: Repository<User>;
  constructor(conn: Connection) {
    this.userConn = conn.getRepository(User);
  }

  public async getAccount(id: string): Promise<IUserAccount> {
    return this.userConn
      .createQueryBuilder('users')
      .where('users.id = :id', { id })
      .leftJoinAndSelect('users.teachings', 'teachings')
      .leftJoinAndSelect('users.learnings', 'learnings')
      .getOne();
  }

  public async getByEmailWithPassword(
    email: string
  ): Promise<IUserAccountWithPass> {
    return this.userConn
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email = :email', { email })
      .leftJoinAndSelect('users.teachings', 'teachings')
      .leftJoinAndSelect('users.learnings', 'learnings')
      .getOne();
  }

  public async getCart(): Promise<IUserAccount> {
    return this.userConn.findOne();
  }

  public async getPurchased(): Promise<IUserAccount> {
    return this.userConn.findOne();
  }
}
