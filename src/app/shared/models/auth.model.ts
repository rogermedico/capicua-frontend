export interface Auth {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  username: string;
  emailVerified: boolean;
}
