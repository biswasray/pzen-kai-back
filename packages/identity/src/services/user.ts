import { IUserCreate } from "../interfaces/user";
import { models } from "../models";

export default class UserService {
  static create(data: IUserCreate) {
    models.User.create(data);
  }
}
