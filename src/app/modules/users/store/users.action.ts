import { createAction, props } from '@ngrx/store';
import { NewUser, User, UserBackend } from '@models/user.model';
import { ChangePassword } from '@models/change-password.model';
import { Course } from '@models/course.model';
import { Education } from '@models/education.model';
import { Language } from '@models/language.model';
import { SafeResourceUrl } from '@angular/platform-browser';


export enum UsersActionTypes {
  USERS_GET_ALL = '[Users] USERS_GET_ALL',
  USERS_GET_ALL_SUCCESS = '[Users] USERS_GET_ALL_SUCCESS',

  USERS_RESET = '[Users] USERS_RESET_DATA',
  USERS_RESET_SUCCESS = '[Users] USERS_RESET_DATA_SUCCESS',

  USERS_CREATE = '[Users] USERS_CREATE',
  USERS_CREATE_SUCCESS = '[Users] USERS_CREATE_SUCCESS',

  USERS_EDIT = '[Users] USERS_EDIT',
  USERS_EDIT_SUCCESS = '[Users] USERS_EDIT_SUCCESS',

  USERS_GET_AVATAR = '[Users] USERS_GET_AVATAR',
  USERS_GET_AVATAR_SUCCESS = '[Users] USERS_GET_AVATAR_SUCCESS',

  USERS_ACTIVATE = '[Users] USERS_ACTIVATE',
  USERS_ACTIVATE_SUCCESS = '[Users] USERS_ACTIVATE_SUCCESS',

  USERS_DEACTIVATE = '[Users] USERS_DEACTIVATE',
  USERS_DEACTIVATE_SUCCESS = '[Users] USERS_DEACTIVATE_SUCCESS',

  USERS_DELETE = '[Users] USERS_DELETE',
  USERS_DELETE_SUCCESS = '[Users] USERS_DELETE_SUCCESS',

  USERS_ERROR = '[Users] USERS_ERROR',
}

/* get all data */
export const UsersGetAll = createAction(UsersActionTypes.USERS_GET_ALL);
export const UsersGetAllSuccess = createAction(UsersActionTypes.USERS_GET_ALL_SUCCESS, props<{ users: User[] }>());

/* reset data */
export const UsersReset = createAction(UsersActionTypes.USERS_RESET);
export const UsersResetSuccess = createAction(UsersActionTypes.USERS_RESET_SUCCESS);

/* create user */
export const UsersCreate = createAction(UsersActionTypes.USERS_CREATE, props<{ newUser: NewUser }>());
export const UsersCreateSuccess = createAction(UsersActionTypes.USERS_CREATE_SUCCESS, props<{ user: User }>());

/* edit user */
export const UsersEdit = createAction(UsersActionTypes.USERS_EDIT, props<{ userId: number, editedProperties: { [key: string]: any } }>());
export const UsersEditSuccess = createAction(UsersActionTypes.USERS_EDIT_SUCCESS, props<{ editedUser: User }>());

/* get avatar */
export const UsersAvatarGet = createAction(UsersActionTypes.USERS_GET_AVATAR, props<{ userId: number }>());
export const UsersAvatarGetSuccess = createAction(UsersActionTypes.USERS_GET_AVATAR_SUCCESS, props<{ userId: number, avatar: SafeResourceUrl }>());

/* activate */
export const UsersActivate = createAction(UsersActionTypes.USERS_ACTIVATE, props<{ userId: number }>());
export const UsersActivateSuccess = createAction(UsersActionTypes.USERS_ACTIVATE_SUCCESS, props<{ userId: number }>());

/* deactivate */
export const UsersDeactivate = createAction(UsersActionTypes.USERS_DEACTIVATE, props<{ userId: number }>());
export const UsersDeactivateSuccess = createAction(UsersActionTypes.USERS_DEACTIVATE_SUCCESS, props<{ userId: number }>());

/* delete */
export const UsersDelete = createAction(UsersActionTypes.USERS_DELETE, props<{ userId: number }>());
export const UsersDeleteSuccess = createAction(UsersActionTypes.USERS_DELETE_SUCCESS, props<{ userId: number }>());

/* error */
export const UsersError = createAction(UsersActionTypes.USERS_ERROR, props<{ origin: UsersActionTypes, err: Error }>());
