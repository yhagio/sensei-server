CREATE database sensei_dev;
CREATE user sensei_dev_user with password 'password';
GRANT all privileges on database sensei_dev to sensei_dev_user;
ALTER USER sensei_dev_user with superuser;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";