import merge from 'lodash.merge';
import { gql } from 'apollo-server-core';

import userResolvers from './user/user.resolver';
import courseResolvers from './course/course.resolver';
import userSchema from './user/user.graphql';
import courseSchema from './course/course.graphql';

const baseSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

export const typeDefs = [baseSchema, userSchema, courseSchema];
export const resolvers = merge({}, userResolvers, courseResolvers);
