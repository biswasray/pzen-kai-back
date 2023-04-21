import { Sequelize } from "sequelize";
import process from "process";
import configurations from "../config/config";
import UserModel from "./user";
import { tableNames } from "../schema";
const env: keyof typeof configurations =
  (process.env.NODE_ENV as keyof typeof configurations) || "development";
const config = configurations[env];
export const models = {
  [tableNames.user]: UserModel,
};

const sequelize = process.env.POSTGRES_URL
  ? new Sequelize(process.env.POSTGRES_URL, config)
  : new Sequelize(config.database, config.username, config.password, config);

Object.values(models).map((model) => {
  model.initialize(sequelize);
});

// Object.values(models).forEach((model) => {
//   // if ("associate" in model && typeof model.associate === "function") {
//   //   model.associate(models);
//   // }
// });

sequelize.sync({ force: true });

const AppDatabase = {
  sequelize,
  models,
};

export default AppDatabase;
