import { Connection } from 'typeorm';
import { User } from '../domain/entity/User';
import { Course } from '../domain/entity/Course';

const seedUsers: any[] = [
  {
    username: 'alice',
    email: 'alice@test.com',
    password: 'password'
  },
  {
    username: 'bob',
    email: 'bob@test.com',
    password: 'password'
  },
  {
    username: 'chris',
    email: 'chris@test.com',
    password: 'password'
  }
];

const seedCoursesJP: any[] = [
  {
    title: 'Japanese 101',
    shortdesc: 'Intro to Japanese conversation'
  },
  {
    title: 'Japanese 102',
    shortdesc: 'Sequal to Japanese 101'
  }
];

const seedCoursesFR: any[] = [
  {
    title: 'French 101',
    shortdesc: 'Intro to French conversation'
  },
  {
    title: 'French 102',
    shortdesc: 'Sequal to French 101'
  }
];

async function createUser(conn: Connection): Promise<void> {
  const userRepo = conn.getRepository(User);

  for (const user of seedUsers) {
    const u = new User();
    u.username = user.username;
    u.email = user.email;
    u.password = user.password;
    await userRepo.save(u);
  }
}

async function createCourses(conn: Connection): Promise<void> {
  const userConn = await conn.getRepository(User);
  const courseRepo = conn.getRepository(Course);

  const alice: User = await userConn.findOne({ where: { username: 'alice' } });
  const bob: User = await userConn.findOne({ where: { username: 'bob' } });

  for (const course of seedCoursesJP) {
    const c = new Course();
    c.author = alice;
    c.title = course.title;
    c.shortdesc = course.shortdesc;
    await courseRepo.save(c);
  }

  for (const course of seedCoursesFR) {
    const c = new Course();
    c.author = bob;
    c.title = course.title;
    c.shortdesc = course.shortdesc;
    c.students = [alice];
    await courseRepo.save(c);
  }
}

export async function seedData(conn: Connection): Promise<void> {
  await createUser(conn);
  await createCourses(conn);
}

export async function resetData(conn: Connection): Promise<void> {
  await conn.getRepository(Course).delete({});
  await conn.getRepository(User).delete({});
}
