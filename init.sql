CREATE user dev_user with password '123test';
ALTER USER dev_user with superuser;

CREATE DATABASE sensei_dev;
GRANT all privileges ON DATABASE sensei_dev TO dev_user;