import { Dialect } from "sequelize";

export const dbConfig = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "postgres",
    host: "127.0.0.1",
    dialect: "postgres" as Dialect,
  },
  test: {
    username: "root",
    password: undefined,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres" as Dialect,
  },
  production: {
    username: "root",
    password: undefined,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "postgres" as Dialect,
  },
};
