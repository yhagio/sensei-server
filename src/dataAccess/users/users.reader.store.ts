import {
  // IUserAccount,
  // IUserAccountWithPass,
  IUsersReaderRepo
} from '../../app/users/users.interface';
// import { Connection, Repository } from 'typeorm';
// import { User } from '../../domain/entity/User';
import { ISequelizeModels } from '../../infra/sequelize/db';
import { IUserInstance } from '../../infra/sequelize/models/user';

export default class UsersReaderStore implements IUsersReaderRepo {
  // private userConn: Repository<User>;
  constructor(private models: ISequelizeModels) {
    // this.userConn = conn.getRepository(User);
  }

  public async getMany(): Promise<IUserInstance[]> {
    return this.models.Users.findAll();
    // return this.userConn
    //   .createQueryBuilder('users')
    //   .leftJoinAndSelect('users.teachings', 'teachings')
    //   .leftJoinAndSelect('users.learnings', 'learnings')
    //   .getMany();
  }

  public async getAccount(id: string): Promise<IUserInstance> {
    return this.models.Users.findOne({ where: { id } });
    // return this.userConn
    //   .createQueryBuilder('users')
    //   .where('users.id = :id', { id })
    //   .leftJoinAndSelect('users.teachings', 'teachings')
    //   .leftJoinAndSelect('users.learnings', 'learnings')
    //   .getOne();
  }

  public async getByEmailWithPassword(email: string): Promise<IUserInstance> {
    return this.models.Users.findOne({ where: { email } });
    // return this.userConn
    //   .createQueryBuilder('users')
    //   .addSelect('users.password')
    //   .where('users.email = :email', { email })
    //   .leftJoinAndSelect('users.teachings', 'teachings')
    //   .leftJoinAndSelect('users.learnings', 'learnings')
    //   .getOne();
  }
}
