import express, { Router } from 'express';
import bodyParser from 'body-parser';
import config from 'config';
import compression from 'compression';
import helmet from 'helmet';
import winston from 'winston';
import { createConnection, Connection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';

import { Logger } from './shared/logger/logger';
import { IConfig } from './shared/config/config';
import errorHandler from './web/utils/error.handler';
import { jsonFormatter } from './web/utils/json.formatter';

import UserHandler from './web/user.handler';
import UsersReader from './app/users/users.reader';
import SetTypeORM from './infra/typeorm/db';
import { seedData, resetData } from './seed/seed.dev';
import AuthHandler from './web/auth.handler';
import UsersWriter from './app/users/users.writer';
import UsersReaderStore from './dataAccess/users/users.reader.store';
import UsersWriterStore from './dataAccess/users/users.writer.store';
import AuthService from './app/auth/auth.service';
import CourseReadHandler from './web/course.read.handler';
import CourseWriteHandler from './web/course.write.handler';
import CoursesWriter from './app/courses/courses.writer';
import CoursesWriterStore from './dataAccess/courses/courses.writer.store';
import CoursesReader from './app/courses/courses.reader';
import CoursesReaderStore from './dataAccess/courses/courses.reader.store';

import { typeDefs, resolvers } from './domain/graphql/schema.creator';
import RelationshipsWriter from './app/relationships/relationships.writer';
import RelationshipsWriterStore from './dataAccess/relationships/relationships.writer.store';

const appConfig: IConfig = config;
const typeORMConn = new SetTypeORM(appConfig).connect();

createConnection(typeORMConn)
  .then(async (conn: Connection) => {
    // Seed data
    if (appConfig.get('seed') && appConfig.get('nodeEnv') === 'development') {
      await resetData(conn);
      await seedData(conn);
    }

    // Initialize singletons
    const logger = new Logger(
      winston.createLogger({
        level: appConfig.get<string>('logger.level'),
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
        transports: [new winston.transports.Console()]
      })
    );

    const resJSON = jsonFormatter(appConfig.get<any>('web.errorStatus'));
    const errHandler = errorHandler(logger);
    const authService = new AuthService(appConfig);

    const usersReader = new UsersReader(new UsersReaderStore(conn));
    const usersWriter = new UsersWriter(new UsersWriterStore(conn));
    const relationshipsWriter = new RelationshipsWriter(
      new RelationshipsWriterStore(conn)
    );
    const coursesReader = new CoursesReader(new CoursesReaderStore(conn));
    const coursesWriter = new CoursesWriter(new CoursesWriterStore(conn));

    const userHandler = new UserHandler(
      usersReader,
      usersWriter,
      relationshipsWriter
    );
    const authHandler = new AuthHandler(
      usersWriter,
      usersReader,
      authService,
      logger
    );
    const courseWriteHandler = new CourseWriteHandler(coursesWriter);
    const courseReadHandler = new CourseReadHandler(coursesReader);

    // Application middleware setup
    const app = express();

    app.use(compression());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    ///////////////////////////////////////////
    //             REST API
    ///////////////////////////////////////////
    const restRouter = Router();

    app.use(resJSON);

    app.use('/api', restRouter);

    restRouter.route('/signup').post(authHandler.signUp.bind(authHandler));
    restRouter.route('/login').post(authHandler.login.bind(authHandler));

    const isLoggedIn = authHandler.isLoggedIn.bind(authHandler);

    restRouter
      .route('/account')
      .get(isLoggedIn, userHandler.getAccount.bind(userHandler))
      .put(isLoggedIn, userHandler.update.bind(userHandler));

    restRouter
      .route('/courses')
      .get(courseReadHandler.getAll.bind(courseReadHandler))
      .post(isLoggedIn, courseWriteHandler.create.bind(courseWriteHandler));

    restRouter
      .route('/courses/:id')
      .get(courseReadHandler.getById.bind(courseReadHandler))
      .put(isLoggedIn, courseWriteHandler.update.bind(courseWriteHandler))
      .delete(isLoggedIn, courseWriteHandler.delete.bind(courseWriteHandler));

    restRouter
      .route('/users')
      .get(isLoggedIn, userHandler.getMany.bind(userHandler));

    restRouter
      .route('/users/:followeeId/relationships')
      .post(isLoggedIn, userHandler.follow.bind(userHandler))
      .delete(isLoggedIn, userHandler.unfollow.bind(userHandler));

    // Error handling
    app.use(errHandler);

    ///////////////////////////////////////////
    //             GraphQL API
    ///////////////////////////////////////////
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: authHandler.isLoggedInContext.bind(authHandler),
      dataSources: () =>
        ({
          coursesReader,
          coursesWriter,
          usersReader,
          usersWriter,
          authService
        } as any)
    });

    server.applyMiddleware({ app });

    // Start Application
    app.listen(appConfig.get('app_port'), () =>
      console.log(
        `🚀App is running at: ${appConfig.get('app_host')}:${appConfig.get(
          'app_port'
        )}`
      )
    );
  })
  .catch(console.error);
