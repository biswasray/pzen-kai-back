import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { IUserCreate, IUserSignIn, IUserSignUp } from "../interfaces/user";
import { models } from "../models";
import { Op } from "sequelize";
import PlatformError from "platform-error";
import { slug } from "@pzen/universe";
import { excludeProp } from "@pzen/universe/src/utils";

export default class UserService {
  static create(data: IUserCreate) {
    return models.User.create(data);
  }
  static async register(data: IUserSignUp) {
    const existingUser = await models.User.findOne({
      where: {
        [Op.or]: [
          {
            userName: data.userName,
          },
          {
            email: data.email,
          },
        ],
      },
    });
    if (existingUser) {
      throw new PlatformError("Bad Request", {
        messages: ["User Already Exist. Please Login"],
      });
    }
    const {
      firstName,
      lastName,
      userName = slug(firstName, lastName),
      email,
      password,
    } = data;
    const enPassword = await hash(password, 10);
    const document = {
      firstName,
      lastName,
      userName,
      email,
      password: enPassword,
    };
    const user = (await this.create(document)).toJSON();
    const userDto = excludeProp(user, "password");
    const token = sign(userDto, process.env.TOKEN_KEY as string, {
      expiresIn: "5h",
    });
    return {
      data: userDto,
      token,
    };
  }
  static async login(data: IUserSignIn) {
    const existingUser = (
      await models.User.findOne({
        where: {
          [Op.or]: [
            {
              userName: data.userName,
            },
            {
              email: data.userName,
            },
          ],
        },
      })
    )?.toJSON();
    if (!existingUser) {
      throw new PlatformError("Not Found", {
        messages: ["Username or Email not found"],
      });
    }
    if (!(await compare(data.password, existingUser.password))) {
      throw new PlatformError("Unauthorized", {
        messages: ["Incorrect password"],
      });
    }
  }
}
