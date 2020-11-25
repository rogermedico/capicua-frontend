import { User } from '@models/user.model';

export interface UserState {
  user: User;
  loginErrors: number;
  loading: boolean;
  loaded: boolean;
  edited: boolean;
  error: Error;
}