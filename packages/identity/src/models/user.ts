import { DataTypes, Model, Sequelize } from "sequelize";
import { IUser, IUserCreate } from "../interfaces/user";
import { tableNames } from "../schema";
// class User extends Model {
//   /**
//    * Helper method for defining associations.
//    * This method is not a part of Sequelize lifecycle.
//    * The `models/index` file will call this method automatically.
//    */
//   static associate(models: Record<string, Model>) {
//     // define association here
//   }
// }
// const userModelLoader = (sequelize: Sequelize) => {
// User.init(
//   {
//     firstName: DataTypes.STRING,
//     lastName: DataTypes.STRING,
//     email: DataTypes.STRING,
//   },
//   {
//     sequelize,
//     modelName: "User",
//   },
// );
//   return User;
// };

// export default userModelLoader;

export default class UserModel extends Model<IUser, IUserCreate> {
  public static initialize(sequelize: Sequelize) {
    UserModel.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.STRING,
          primaryKey: true,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        userName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: tableNames.user,
        timestamps: true,
      },
    );
  }
  // public static associations: {
  //   [key: string]: Association<UserModel, Model<any, any>>;
  // };
}
