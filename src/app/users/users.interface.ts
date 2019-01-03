export interface IUsersReaderRepo {
  getAccount(id: string): Promise<IUserAccount>;
  getByEmailWithPassword(email: string): Promise<IUserAccountWithPass>;
  getCart(): Promise<IUserAccount>;
  getPurchased(): Promise<IUserAccount>;
}

export interface IUsersWriterRepo {
  create(user: IUserSignUp): Promise<IUserAccount>;
  // update(user: IUserLogin): Promise<IUserAccount>;
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
