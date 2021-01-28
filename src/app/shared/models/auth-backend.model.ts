import { UserBackend } from "./user-backend.model";

export interface AuthBackend {
  accessToken: string;
  tokenType: string;
  expiresIn: number
  user: UserBackend;
}
