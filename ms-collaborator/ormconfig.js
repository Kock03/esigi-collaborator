module.exports = {
    "name": "default",
    "type": "mysql",
    "host": "localhost",
    "port": "3306",
    "username": "root",
    "password": "1234",
    "database": "test",
    "entities": [
      __dirname + "entities/**/*.entity.ts"
    ]
  }