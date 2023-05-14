import express from "express";
import { IUserSignUp, IUserView } from "../interfaces/user";
import { IServerResponse } from "@pzen/universe";
import UserService from "../services/user";
export const userRouter = express.Router();

userRouter.post(
  "/signUp",
  async (
    request: express.Request<unknown, unknown, IUserSignUp>,
    response: express.Response<IServerResponse<IUserView>>,
  ) => {
    const result = await UserService.register(request.body);
    response.json({
      status: true,
      content: result,
    });
  },
);
