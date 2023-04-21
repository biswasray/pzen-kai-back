export interface IServerResponse<T> {
  // IServerResponse<IUser>
  status: boolean;
  content: {
    data: T; // data: IUser
    token?: string;
  };
}

export interface IQueryResponse<T> {
  status: boolean;
  content: {
    data: T[];
    metadata?: Record<string, unknown>;
  };
}

export interface IServerError {
  status: false;
  errors: {
    message: string;
  }[];
}
