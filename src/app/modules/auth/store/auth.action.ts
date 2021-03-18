import { createAction, props } from '@ngrx/store';
import { User } from '@models/user.model';
import { Login } from '@models/login.model';
import { Auth } from '@models/auth.model';
import { ResetPassword } from '@models/reset-password.model';
import { VerifyEmail } from '@models/verify-email.model';

export enum AuthActionTypes {
  AUTH_LOGIN = '[Auth] AUTH_LOGIN',
  AUTH_LOGIN_SUCCESS = '[Auth] AUTH_LOGIN_SUCCESS',

  AUTH_LOGOUT = '[Auth] AUTH_LOGOUT',
  AUTH_LOGOUT_SUCCESS = '[Auth] AUTH_LOGOUT_SUCCESS',

  AUTH_SEND_RESET_PASSWORD_EMAIL = '[Auth] AUTH_SEND_RESET_PASSWORD_EMAIL',
  AUTH_SEND_RESET_PASSWORD_EMAIL_SUCCESS = '[Auth] AUTH_SEND_RESET_PASSWORD_EMAIL_SUCCESS',

  AUTH_RESET_PASSWORD = '[Auth] AUTH_RESET_PASSWORD',
  AUTH_RESET_PASSWORD_SUCCESS = '[Auth] AUTH_RESET_PASSWORD_SUCCESS',

  AUTH_SEND_VERIFICATION_EMAIL = '[Auth] AUTH_SEND_VERIFICATION_EMAIL',
  AUTH_SEND_VERIFICATION_EMAIL_SUCCESS = '[Auth] AUTH_SEND_VERIFICATION_EMAIL_SUCCESS',

  AUTH_VERIFY_EMAIL = '[Auth] AUTH_VERIFY_EMAIL',
  AUTH_VERIFY_EMAIL_SUCCESS = '[Auth] AUTH_VERIFY_EMAIL_SUCCESS',

  AUTH_RENEW_TOKEN = '[Auth] AUTH_RENEW_TOKEN',
  AUTH_RENEW_TOKEN_SUCCESS = '[Auth] AUTH_RENEW_TOKEN_SUCCESS',

  AUTH_ERROR = '[Auth] AUTH_ERROR',

}

/* auth login */
export const AuthLogin = createAction(AuthActionTypes.AUTH_LOGIN, props<{ loginInfo: Login }>());
export const AuthLoginSuccess = createAction(AuthActionTypes.AUTH_LOGIN_SUCCESS, props<{ authInfo: Auth }>());

/* auth logout */
export const AuthLogout = createAction(AuthActionTypes.AUTH_LOGOUT);
export const AuthLogoutSuccess = createAction(AuthActionTypes.AUTH_LOGOUT_SUCCESS);

/* send reset password email */
export const AuthSendResetPasswordEmail = createAction(AuthActionTypes.AUTH_SEND_RESET_PASSWORD_EMAIL, props<{ email: string }>());
export const AuthSendResetPasswordEmailSuccess = createAction(AuthActionTypes.AUTH_SEND_RESET_PASSWORD_EMAIL_SUCCESS);

/* reset password */
export const AuthResetPassword = createAction(AuthActionTypes.AUTH_RESET_PASSWORD, props<{ resetPassword: ResetPassword }>());
export const AuthResetPasswordSuccess = createAction(AuthActionTypes.AUTH_RESET_PASSWORD_SUCCESS);

/* send verification email */
export const AuthSendVerificationEmail = createAction(AuthActionTypes.AUTH_SEND_VERIFICATION_EMAIL);
export const AuthSendVerificationEmailSuccess = createAction(AuthActionTypes.AUTH_SEND_VERIFICATION_EMAIL_SUCCESS);

/* verify email */
export const AuthVerifyEmail = createAction(AuthActionTypes.AUTH_VERIFY_EMAIL, props<{ verifyEmail: VerifyEmail }>());
export const AuthVerifyEmailSuccess = createAction(AuthActionTypes.AUTH_VERIFY_EMAIL_SUCCESS);

/* renew token */
export const AuthRenewToken = createAction(AuthActionTypes.AUTH_RENEW_TOKEN);
export const AuthRenewTokenSuccess = createAction(AuthActionTypes.AUTH_RENEW_TOKEN_SUCCESS, props<{ authInfo: Auth }>());

/* error */
export const AuthError = createAction(AuthActionTypes.AUTH_ERROR, props<{ origin: AuthActionTypes, err: Error }>());