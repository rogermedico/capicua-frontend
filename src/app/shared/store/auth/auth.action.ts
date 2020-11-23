import { createAction, props } from '@ngrx/store';
import { User } from '@models/user.model';
import { Login } from '@models/login.model';

export enum AuthActionTypes {
  AUTH_LOGIN = '[Auth] AUTH_LOGIN',
  AUTH_LOGIN_SUCCESS = '[Auth] AUTH_LOGIN_SUCCESS',
  AUTH_LOGIN_ERROR = '[Auth] AUTH_LOGIN_ERROR',

  AUTH_LOGOUT = '[Auth] AUTH_LOGOUT',
  AUTH_LOGOUT_SUCCESS = '[Auth] AUTH_LOGOUT_SUCCESS',
  AUTH_LOGOUT_ERROR = '[Auth] AUTH_LOGOUT_ERROR',
}

/* auth login */
export const AuthLogin = createAction(AuthActionTypes.AUTH_LOGIN, props<{ loginInfo: Login }>());
export const AuthLoginSuccess = createAction(AuthActionTypes.AUTH_LOGIN_SUCCESS, props<{ loginInfo: Login }>());
export const AuthLoginError = createAction(AuthActionTypes.AUTH_LOGIN_ERROR, props<{ err: String }>());

/* auth logout */
export const AuthLogout = createAction(AuthActionTypes.AUTH_LOGOUT, props<{ user: User }>());
export const AuthLogoutSuccess = createAction(AuthActionTypes.AUTH_LOGOUT_SUCCESS);
export const AuthLogoutError = createAction(AuthActionTypes.AUTH_LOGOUT_ERROR, props<{ err: String }>());
