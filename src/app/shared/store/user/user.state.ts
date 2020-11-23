import { User } from '@models/user.model';

export interface UserState {
  user: User;
  loading: boolean;
  edited: boolean;
  error: Error;
}