import { User } from "./user.model";

export interface Auth {
  accessToken: string;
  tokenType: string;
  expiersIn: number
  user: User;
}
