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

  public async getById(id: string): Promise<IUserAccount> {
    return this.userConn
      .createQueryBuilder('users')
      .select('users.id')
      .addSelect('users.username')
      .addSelect('users.email')
      .addSelect('teachings.title')
      .addSelect('teachings.shortdesc')
      .addSelect('teachings.id')
      .addSelect('learnings.title')
      .addSelect('learnings.shortdesc')
      .addSelect('learnings.id')
      .where('users.id = :id', { id })
      .leftJoin('users.teachings', 'teachings')
      .leftJoin('users.learnings', 'learnings')
      .getOne();
  }

  public async getByEmailWithPassword(
    email: string
  ): Promise<IUserAccountWithPass> {
    return this.userConn
      .createQueryBuilder('users')
      .select('users.id')
      .addSelect('users.username')
      .addSelect('users.email')
      .addSelect('users.password')
      .addSelect('teachings.title')
      .addSelect('teachings.shortdesc')
      .addSelect('teachings.id')
      .addSelect('learnings.title')
      .addSelect('learnings.shortdesc')
      .addSelect('learnings.id')
      .where('users.email = :email', { email })
      .leftJoin('users.teachings', 'teachings')
      .leftJoin('users.learnings', 'learnings')
      .getOne();
  }

  public async getCart(): Promise<IUserAccount> {
    return this.userConn.findOne();
  }

  public async getPurchased(): Promise<IUserAccount> {
    return this.userConn.findOne();
  }
}
