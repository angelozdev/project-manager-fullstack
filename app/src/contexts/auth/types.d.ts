interface IUser {
  accessToken: string;
  name: string;
  email: string;
  _id: string;
  refreshToken: string;
}

interface IUserJWT extends IUser {
  exp: number;
  iat: number;
}

interface IAuthContext {
  user: IUser | null;
  setUser: (user: IUser) => void;
  isLoading?: boolean;
  logout: () => void;
}
