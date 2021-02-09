import { User } from '@models/user.model';

export interface UsersState {
  users: User[];
  loading: boolean;
  loaded: boolean;
  error: Error;
}