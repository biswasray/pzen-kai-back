export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
export type IUserCreate = Omit<IUser, "id" | "createdAt" | "updatedAt">;
export type IUserUpdate = Partial<IUserCreate>;
