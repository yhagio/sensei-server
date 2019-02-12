CREATE DATABASE sensei_dev;
CREATE user dev_user with password 'test123';
grant all privileges ON DATABASE sensei_dev TO dev_user;
ALTER USER dev_user with superuser;