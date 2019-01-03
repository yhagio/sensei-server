import { gql } from 'apollo-server-core';

const courseSchema = gql`
  type Course {
    id: ID!
    title: String!
    shortdesc: String!
    longdesc: String
    coverurl: String
    price: Int
    createdAt: String
    updatedAt: String
    author: Author
  }

  type CourseNoAuthor {
    id: ID
    title: String
    shortdesc: String
    longdesc: String
    coverurl: String
    createdAt: String
    updatedAt: String
    price: Int
  }

  extend type Query {
    getAllCourses: [Course]
    getCourseById(id: String!): Course
  }

  extend type Mutation {
    createCourse(
      title: String!
      shortdesc: String!
      longdesc: String
      price: Int
      coverurl: String
    ): Boolean
    updateCourse(
      id: String!
      title: String!
      shortdesc: String!
      longdesc: String
      price: Int
      coverurl: String
    ): Boolean
    deleteCourse(id: String!): Boolean
  }
`;

export default courseSchema;
