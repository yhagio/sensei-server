CREATE database sensei_test;
CREATE user sensei_test_user with password 'password';
GRANT all privileges on database sensei_test to sensei_test_user;
ALTER USER sensei_test_user with superuser;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";