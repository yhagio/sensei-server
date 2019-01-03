import { ICourse, ICourseCreate } from '../../../app/courses/courses.interface';
import { IUserAccount } from '../../../app/users/users.interface';

const getAllCourses = (
  _: { _: any },
  __: { __: any },
  { dataSources }: { dataSources: any }
) => {
  return dataSources.coursesReader.getAll();
};

const getCourseById = async (
  _: { _: any },
  { id }: { id: string },
  { dataSources }: { dataSources: any }
): Promise<ICourse> => {
  return dataSources.coursesReader.getById(id);
};

const createCourse = async (
  _: { _: any },
  {
    title,
    shortdesc,
    longdesc,
    price,
    coverurl
  }: {
    title: string;
    shortdesc: string;
    longdesc: string;
    price: number;
    coverurl: string;
  },
  { dataSources, user }: { dataSources: any; user: IUserAccount }
): Promise<boolean> => {
  const course: ICourseCreate = {
    title,
    shortdesc
  };
  if (longdesc) {
    course.longdesc = longdesc;
  }
  if (price) {
    course.price = price;
  }
  if (coverurl) {
    course.coverurl = coverurl;
  }
  await dataSources.coursesWriter.create(course, user);
  return true;
};

const updateCourse = async (
  _: { _: any },
  {
    id,
    title,
    shortdesc,
    longdesc,
    price,
    coverurl
  }: {
    id: string;
    title: string;
    shortdesc: string;
    longdesc: string;
    price: number;
    coverurl: string;
  },
  { dataSources, user }: { dataSources: any; user: IUserAccount }
): Promise<boolean> => {
  const course: ICourse = {
    id,
    title,
    shortdesc
  };
  if (longdesc) {
    course.longdesc = longdesc;
  }
  if (price) {
    course.price = price;
  }
  if (coverurl) {
    course.coverurl = coverurl;
  }

  await dataSources.coursesWriter.update(id, course, user);
  return true;
};

const deleteCourse = async (
  _: { _: any },
  {
    id
  }: {
    id: string;
  },
  { dataSources, user }: { dataSources: any; user: IUserAccount }
): Promise<boolean> => {
  await dataSources.coursesWriter.delete(id, user);
  return true;
};

const courseResolvers = {
  Query: {
    getAllCourses,
    getCourseById
  },
  Mutation: {
    createCourse,
    updateCourse,
    deleteCourse
  }
};

export default courseResolvers;
