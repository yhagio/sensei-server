import jwt from 'jsonwebtoken';

import { IConfig } from '../../shared/config/config';

interface IPayload {
  id?: string;
}

export default class AuthService {
  constructor(private config: IConfig) {}

  public issueToken(userId: string): string {
    return jwt.sign({ id: userId }, this.config.get('jwt.secret'), {
      expiresIn: this.config.get('jwt.expiresin')
    });
  }

  public async verifyToken(token: string): Promise<IPayload> {
    return jwt.verify(token, this.config.get<string>('jwt.secret')) as IPayload;
  }
}
