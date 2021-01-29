import { UserBackend } from "./user.model";

export interface Auth {
  accessToken: string;
  tokenType: string;
  expiresIn: number
  username: string;
}

export interface AuthBackend {
  accessToken: string;
  tokenType: string;
  expiresIn: number
  user: UserBackend;
}