import { gql } from 'apollo-server-core';

const userSchema = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    firstname: String
    lastname: String
    confirmed: Boolean
  }

  type LoggedInUser {
    id: ID!
    username: String!
    email: String!
    firstname: String
    lastname: String
    confirmed: Boolean
    token: String!
  }

  type Author {
    id: ID
    username: String
    email: String
    firstname: String
    lastname: String
  }

  type UserWithCourses {
    id: ID
    username: String
    email: String
    firstname: String
    lastname: String
    confirmed: Boolean
    teachings: [CourseNoAuthor]
    learnings: [CourseNoAuthor]
  }

  extend type Query {
    getAccount: UserWithCourses!
  }

  extend type Mutation {
    login(email: String!, password: String!): LoggedInUser!
    signup(username: String!, email: String!, password: String!): LoggedInUser!
  }
`;

export default userSchema;
