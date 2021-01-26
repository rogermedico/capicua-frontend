import { Auth } from '@models/auth.model';

export interface AuthState {
  authInfo: Auth;
  loading: boolean;
  loaded: boolean;
  error: Error;
}