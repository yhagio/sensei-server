import { User } from '../../domain/entity/User';

export interface IUsersReaderRepo {
  getMany(): Promise<IUserAccount[]>;
  getAccount(id: string): Promise<IUserAccount>;
  getByEmailWithPassword(email: string): Promise<IUserAccountWithPass>;
}

export interface IUsersWriterRepo {
  create(user: IUserSignUp): Promise<IUserAccount>;
  update(user: IUserAccount, loggedInUser: User): Promise<void>;
  // delete(user: IUserLogin): Promise<IUserAccount>;
}

export interface IUserSignUp {
  username: string;
  email: string;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserAccount {
  id: string;
  username: string;
  email: string;
  firstname?: string;
  lastname?: string;
  confirmed?: boolean;
}

export interface IUserWithToken extends IUserAccount {
  token: string;
}

export interface IUserAccountWithPass extends IUserAccount {
  password: string;
}
