import Sequelize from 'sequelize';
import path from 'path';
import fs from 'fs';
import { IConfig } from '../../shared/config/config';
import { IUserAttributes, IUserInstance } from './models/user';

export interface ISequelizeModels {
  Users: Sequelize.Model<IUserInstance, IUserAttributes>;
}

export default class SetSequelize {
  private db: Sequelize.Sequelize;
  private models: ISequelizeModels;

  constructor(private config: IConfig) {
    this.db = new Sequelize(
      this.config.get<any>('sequelize.database'),
      this.config.get<any>('sequelize.username'),
      this.config.get<any>('sequelize.password'),
      {
        dialect: this.config.get<any>('sequelize.dialect'),
        host: this.config.get<any>('sequelize.host'),
        port: this.config.get<any>('sequelize.port')
      }
    );

    this.models = {} as ISequelizeModels;

    const basename = path.basename(module.filename);
    fs.readdirSync(__dirname + '/models')
      .filter(file => {
        return (
          file.indexOf('.') !== 0 &&
          file !== basename &&
          file.slice(-3) === '.js'
        );
      })
      .forEach((file: string) => {
        const model = this.db.import(path.join(__dirname + '/models', file));
        this.models[model.name] = model;
      });

    Object.keys(this.models).forEach((modelName: string) => {
      if (typeof this.models[modelName].associate === 'function') {
        this.models[modelName].associate(this.models);
      }
    });
  }

  public getDB(): Sequelize.Sequelize {
    return this.db;
  }

  public getModels(): ISequelizeModels {
    return this.models;
  }
}
