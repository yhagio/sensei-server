import { ConnectionOptions } from 'typeorm';

import { IConfig } from '../../shared/config/config';
import { Course } from '../../domain/entity/Course';
import { User } from '../../domain/entity/User';
import { Relationship } from '../../domain/entity/Relationship';

export default class SetTypeORM {
  constructor(private config: IConfig) {}

  public connect(): ConnectionOptions {
    return {
      type: this.config.get<any>('typeorm.type'),
      host: this.config.get<string>('typeorm.host'),
      port: this.config.get<number>('typeorm.port'),
      username: this.config.get<string>('typeorm.user'),
      password: this.config.get<string>('typeorm.password'),
      database: this.config.get<any>('typeorm.db'),
      synchronize: this.config.get<boolean>('typeorm.sync'),
      logging: this.config.get<boolean>('typeorm.logging'),
      entities: [User, Course, Relationship],
      migrations: []
    };
  }
}
