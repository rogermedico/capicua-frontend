import { createAction, props } from '@ngrx/store';
import { User } from '@models/user.model';
import { Login } from '@models/login.model';
import { Language } from '@models/language.model';
import { Education } from '@models/education.model';
import { ChangePassword } from '@models/change-password.model';

export enum UserActionTypes {
  USER_GET_DATA = '[User] USER_GET_DATA',
  USER_GET_DATA_SUCCESS = '[User] USER_GET_DATA_SUCCESS',
  // USER_GET_DATA_ERROR = '[User] USER_GET_DATA_ERROR',

  USER_RESET_DATA = '[User] USER_RESET_DATA',
  USER_RESET_DATA_SUCCESS = '[User] USER_RESET_DATA_SUCCESS',
  // USER_RESET_DATA_ERROR = '[User] USER_RESET_DATA_ERROR',

  USER_CHANGE_PASSWORD = '[User] USER_CHANGE_PASSWORD',
  USER_CHANGE_PASSWORD_SUCCESS = '[User] USER_CHANGE_PASSWORD_SUCCESS',
  // USER_CHANGE_PASSWORD_ERROR = '[User] USER_CHANGE_PASSWORD_ERROR',

  USER_ERROR = '[User] USER_ERROR',
}

/* get data */
export const UserGetData = createAction(UserActionTypes.USER_GET_DATA);
export const UserGetDataSuccess = createAction(UserActionTypes.USER_GET_DATA_SUCCESS, props<{ user: User }>());

/* reset data */
export const UserResetData = createAction(UserActionTypes.USER_RESET_DATA);
export const UserResetDataSuccess = createAction(UserActionTypes.USER_RESET_DATA_SUCCESS);

/* reset data */
export const UserChangePassword = createAction(UserActionTypes.USER_CHANGE_PASSWORD, props<{ changePassword: ChangePassword }>());
export const UserChangePasswordSuccess = createAction(UserActionTypes.USER_CHANGE_PASSWORD_SUCCESS);

/* error */
export const UserError = createAction(UserActionTypes.USER_ERROR, props<{ origin: UserActionTypes, err: Error }>());