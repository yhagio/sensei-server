import { IUsersReaderRepo } from '../../app/users/users.interface';
import { ISequelizeModels } from '../../infra/sequelize/db';
import { IUserInstance } from '../../infra/sequelize/models/user';

export default class UsersReaderStore implements IUsersReaderRepo {
  constructor(private models: ISequelizeModels) {}

  public async getMany(): Promise<IUserInstance[]> {
    return this.models.Users.findAll({
      attributes: {
        exclude: ['password', 'confirmed', 'createdAt', 'updatedAt']
      },
      raw: true
    });
  }

  public async getAccount(id: string): Promise<IUserInstance> {
    return this.models.Users.findOne({
      where: { id },
      attributes: {
        exclude: ['password', 'confirmed', 'createdAt', 'updatedAt']
      },
      raw: true
    });
  }

  public async getByEmailWithPassword(email: string): Promise<IUserInstance> {
    return this.models.Users.findOne({
      where: { email },
      attributes: {
        exclude: ['confirmed', 'createdAt', 'updatedAt']
      },
      raw: true
    });
  }
}
