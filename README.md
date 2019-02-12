[![codecov](https://codecov.io/gh/yhagio/sensei-server/branch/master/graph/badge.svg)](https://codecov.io/gh/yhagio/sensei-server)
[![Build Status](https://travis-ci.org/yhagio/sensei-server.svg?branch=master)](https://travis-ci.org/yhagio/sensei-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/yhagio/sensei-server/blob/master/LICENSE)
[![dependencies Status](https://david-dm.org/yhagio/sensei-server/status.svg)](https://david-dm.org/yhagio/sensei-server)
[![devDependencies Status](https://david-dm.org/yhagio/sensei-server/dev-status.svg)](https://david-dm.org/yhagio/sensei-server?type=dev)

# Sensei Server

- Sample backend server built with Node.js, Typescript, Express, TypeORM, Postgres stack

## Start 🚀

Start Postgres and set up

```sql
CREATE user dev_user with password '123test';
ALTER USER dev_user with superuser;

CREATE database sensei_dev;
GRANT all privileges on database sensei_dev to dev_user;
```

If you don't have uuid extension in Postgres,
run this when you connect to your database

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

Start Node.js application (Recommend to use nvm and yarn 😊)

```sh
nvm use
yarn
npm run dev
```

You can customize env variables in `./config`

#### Docker way 🐳

```sh
docker-compose -f docker-compose.dev.yml up
```

## TODOs 👷

- [x] Basic Application structure
- [x] Express App + Postgres setup
- [x] TypeORM
- [x] Basic CRUD API for Courses
- [x] User Authentication (JWT)
- [x] Protected routes middleware
- [x] LICENSE
- [x] Circle CI
- [x] Codecov
- [ ] Stripe integration
- [ ] Unit tests
- [ ] Integration tests
- [ ] Deployment (Heroku)

---

## Routes 🚙

Prefix: `/api`

| Route         | Method           | Description |
| ------------- | ---------------- | ----------- |
| /signup       | POST             |             |
| /login        | POST             |             |
| /courses      | GET, POST        |             |
| /courses/:id  | GET, PUT, DELETE |             |
| /user/account | GET, PUT         |             |

**...in progress**

| Route                        | Method         | Description |
| ---------------------------- | -------------- | ----------- |
| /forgot_password             | POST           |             |
| /courses/:id/learn           | GET            |             |
| /user/cart                   | GET, POST, PUT |             |
| /user/purchased              | GET            |             |
| /teaching                    | GET            |             |
| /teaching/courses/:id/manage | GET, POST, PUT |             |

## Migrations

via sequelize

```sh
npm run migrate # Migrate
npm run undo    # Rollback
```
