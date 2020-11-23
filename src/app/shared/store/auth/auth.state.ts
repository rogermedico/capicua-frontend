import { Login } from '@models/login.model';

export interface AuthState {
  loginInfo: Login;
  wrongCredentials: boolean;
  loading: boolean;
  loaded: boolean;
  error: Error;
}