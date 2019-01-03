import bcrypt from 'bcrypt';

import { NotFoundError } from '../../../shared/error/not.found.error';
import { UnauthorizedError } from '../../../shared/error/auth.error';
import {
  IUserAccount,
  IUserWithToken
} from '../../../app/users/users.interface';

const getAccount = (
  _: { _: any },
  __: { __: any },
  { user }: { user: IUserAccount }
): IUserAccount => {
  if (!user || !user.id) {
    throw new NotFoundError('User not found');
  }
  return user;
};

const signup = async (
  _: { _: any },
  {
    username,
    email,
    password
  }: { username: string; email: string; password: string },
  { dataSources }: { dataSources: any }
): Promise<IUserWithToken> => {
  const newUser = await dataSources.usersWriter.create({
    username,
    email,
    password
  });
  const token = await dataSources.authService.issueToken(newUser.id);
  return { ...newUser, token };
};

const login = async (
  _: { _: any },
  { email, password }: { email: string; password: string },
  { dataSources }: { dataSources: any }
): Promise<IUserWithToken> => {
  const found = await dataSources.usersReader.getByEmailWithPassword(email);
  if (!found) {
    throw new NotFoundError('User not found');
  }
  const { password: pass, ...user } = found;

  const isValid = await bcrypt.compare(password, pass);
  if (!isValid) {
    throw new UnauthorizedError('Not Authorized');
  }
  const token = await dataSources.authService.issueToken(user.id);
  return { ...user, token };
};

const userResolvers = {
  Query: {
    getAccount
  },
  Mutation: {
    signup,
    login
  }
};

export default userResolvers;
