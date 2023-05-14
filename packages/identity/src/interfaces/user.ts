import { Modify } from "@pzen/universe";
export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  isActive?: boolean;
  lastActiveAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
export type IUserView = Omit<IUser, "password">;
export type IUserCreate = Omit<IUser, "id" | "createdAt" | "updatedAt">;
export type IUserSignUp = Modify<IUserCreate, { userName?: string }>;
export interface IUserSignIn {
  userName: string;
  password: string;
}
export type IUserUpdate = Partial<IUserCreate>;
