import { createAction, props } from '@ngrx/store';
import { User } from '@models/user.model';
import { ChangePassword } from '@models/change-password.model';
import { UserType } from '@models/user-type.model';


export enum UserTypesActionTypes {
  USER_TYPES_GET_ALL = '[Users Type] USER_TYPE_GET_ALL',
  USER_TYPES_GET_ALL_SUCCESS = '[Users Type] USER_TYPE_GET_ALL_SUCCESS',

  USER_TYPES_RESET = '[Users Type] USER_TYPE_RESET_DATA',
  USER_TYPES_RESET_SUCCESS = '[Users Type] USER_TYPE_RESET_DATA_SUCCESS',

  USER_TYPES_ERROR = '[Users Type] USER_TYPE_ERROR',
}

/* get all data */
export const UserTypesGetAll = createAction(UserTypesActionTypes.USER_TYPES_GET_ALL);
export const UserTypesGetAllSuccess = createAction(UserTypesActionTypes.USER_TYPES_GET_ALL_SUCCESS, props<{ userTypes: UserType[] }>());

//* get all data */
export const UserTypesReset = createAction(UserTypesActionTypes.USER_TYPES_RESET);
export const UserTypesResetSuccess = createAction(UserTypesActionTypes.USER_TYPES_RESET_SUCCESS);

/* error */
export const UserTypesError = createAction(UserTypesActionTypes.USER_TYPES_ERROR, props<{ origin: UserTypesActionTypes, err: Error }>());
