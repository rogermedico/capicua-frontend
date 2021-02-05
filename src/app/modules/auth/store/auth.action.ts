import { createAction, props } from '@ngrx/store';
import { User } from '@models/user.model';
import { Login } from '@models/login.model';
import { Auth } from '@models/auth.model';
import { ResetPassword } from '@models/reset-password.model';
import { VerifyEmail } from '@models/verify-email.model';

export enum AuthActionTypes {
  AUTH_LOGIN = '[Auth] AUTH_LOGIN',
  AUTH_LOGIN_SUCCESS = '[Auth] AUTH_LOGIN_SUCCESS',
  // AUTH_LOGIN_ERROR = '[Auth] AUTH_LOGIN_ERROR',

  AUTH_LOGOUT = '[Auth] AUTH_LOGOUT',
  AUTH_LOGOUT_SUCCESS = '[Auth] AUTH_LOGOUT_SUCCESS',
  // AUTH_LOGOUT_ERROR = '[Auth] AUTH_LOGOUT_ERROR',

  AUTH_SEND_RESET_PASSWORD_EMAIL = '[Auth] AUTH_SEND_RESET_PASSWORD_EMAIL',
  AUTH_SEND_RESET_PASSWORD_EMAIL_SUCCESS = '[Auth] AUTH_SEND_RESET_PASSWORD_EMAIL_SUCCESS',
  // AUTH_SEND_RESET_PASSWORD_EMAIL_ERROR = '[Auth] AUTH_SEND_RESET_PASSWORD_EMAIL_ERROR',

  AUTH_RESET_PASSWORD = '[Auth] AUTH_RESET_PASSWORD',
  AUTH_RESET_PASSWORD_SUCCESS = '[Auth] AUTH_RESET_PASSWORD_SUCCESS',
  // AUTH_RESET_PASSWORD_ERROR = '[Auth] AUTH_RESET_PASSWORD_ERROR',

  AUTH_SEND_VERIFICATION_EMAIL = '[Auth] AUTH_SEND_VERIFICATION_EMAIL',
  AUTH_SEND_VERIFICATION_EMAIL_SUCCESS = '[Auth] AUTH_SEND_VERIFICATION_EMAIL_SUCCESS',
  // AUTH_SEND_VERIFICATION_EMAIL_ERROR = '[Auth] AUTH_SEND_VERIFICATION_EMAIL_ERROR',

  AUTH_VERIFY_EMAIL = '[Auth] AUTH_VERIFY_EMAIL',
  AUTH_VERIFY_EMAIL_SUCCESS = '[Auth] AUTH_VERIFY_EMAIL_SUCCESS',
  // AUTH_VERIFY_EMAIL_ERROR = '[Auth] AUTH_VERIFY_EMAIL_ERROR',

  AUTH_ERROR = '[Auth] AUTH_ERROR',

  // AUTH_REGISTER = '[Auth] AUTH_REGISTER',
  // AUTH_REGISTER_SUCCESS = '[Auth] AUTH_REGISTER_SUCCESS',
  // AUTH_REGISTER_ERROR = '[Auth] AUTH_REGISTER_ERROR',
}

/* auth login */
export const AuthLogin = createAction(AuthActionTypes.AUTH_LOGIN, props<{ loginInfo: Login }>());
export const AuthLoginSuccess = createAction(AuthActionTypes.AUTH_LOGIN_SUCCESS, props<{ authInfo: Auth }>());
// export const AuthLoginError = createAction(AuthActionTypes.AUTH_LOGIN_ERROR, props<{ err: String }>());

/* auth logout */
export const AuthLogout = createAction(AuthActionTypes.AUTH_LOGOUT);
export const AuthLogoutSuccess = createAction(AuthActionTypes.AUTH_LOGOUT_SUCCESS);
// export const AuthLogoutError = createAction(AuthActionTypes.AUTH_LOGOUT_ERROR, props<{ err: String }>());

/* send reset password email */
export const AuthSendResetPasswordEmail = createAction(AuthActionTypes.AUTH_SEND_RESET_PASSWORD_EMAIL, props<{ email: string }>());
export const AuthSendResetPasswordEmailSuccess = createAction(AuthActionTypes.AUTH_SEND_RESET_PASSWORD_EMAIL_SUCCESS);
// export const AuthSendResetPasswordEmailError = createAction(AuthActionTypes.AUTH_SEND_RESET_PASSWORD_EMAIL_ERROR, props<{ err: String }>());

/* reset password */
export const AuthResetPassword = createAction(AuthActionTypes.AUTH_RESET_PASSWORD, props<{ resetPassword: ResetPassword }>());
export const AuthResetPasswordSuccess = createAction(AuthActionTypes.AUTH_RESET_PASSWORD_SUCCESS);
// export const AuthResetPasswordError = createAction(AuthActionTypes.AUTH_RESET_PASSWORD_ERROR, props<{ err: String }>());

/* send verification email */
export const AuthSendVerificationEmail = createAction(AuthActionTypes.AUTH_SEND_VERIFICATION_EMAIL);
export const AuthSendVerificationEmailSuccess = createAction(AuthActionTypes.AUTH_SEND_VERIFICATION_EMAIL_SUCCESS);
// export const AuthSendVerificationEmailError = createAction(AuthActionTypes.AUTH_SEND_VERIFICATION_EMAIL_ERROR, props<{ err: String }>());

/* verify email */
export const AuthVerifyEmail = createAction(AuthActionTypes.AUTH_VERIFY_EMAIL, props<{ verifyEmail: VerifyEmail }>());
export const AuthVerifyEmailSuccess = createAction(AuthActionTypes.AUTH_VERIFY_EMAIL_SUCCESS);
// export const AuthVerifyEmailError = createAction(AuthActionTypes.AUTH_VERIFY_EMAIL_ERROR, props<{ err: String }>());

/* error */
export const AuthError = createAction(AuthActionTypes.AUTH_ERROR, props<{ origin: AuthActionTypes, err: Error }>());

/* auth register */
// export const AuthRegister = createAction(AuthActionTypes.AUTH_REGISTER, props<{ user: User }>());
// export const AuthRegisterSuccess = createAction(AuthActionTypes.AUTH_REGISTER_SUCCESS, props<{ user: User }>());
// export const AuthRegisterError = createAction(AuthActionTypes.AUTH_REGISTER_ERROR, props<{ err: String }>());
