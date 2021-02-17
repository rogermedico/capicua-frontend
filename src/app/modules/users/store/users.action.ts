import { createAction, props } from '@ngrx/store';
import { NewUser, User, UserBackend } from '@models/user.model';
import { ChangePassword } from '@models/change-password.model';
import { Course } from '@models/course.model';


export enum UsersActionTypes {
  USERS_GET_ALL = '[Users] USERS_GET_ALL',
  USERS_GET_ALL_SUCCESS = '[Users] USERS_GET_ALL_SUCCESS',

  USERS_RESET = '[Users] USERS_RESET_DATA',
  USERS_RESET_SUCCESS = '[Users] USERS_RESET_DATA_SUCCESS',

  USERS_CREATE = '[Users] USERS_CREATE',
  USERS_CREATE_SUCCESS = '[Users] USERS_CREATE_SUCCESS',

  USERS_PROFILE_UPDATE = '[Users] USERS_PROFILE_UPDATE',
  USERS_PROFILE_UPDATE_SUCCESS = '[Users] USERS_PROFILE_UPDATE_SUCCESS',

  USERS_CREATE_COURSE = '[Users] USERS_CREATE_COURSE',
  USERS_CREATE_COURSE_SUCCESS = '[Users] USERS_CREATE_COURSE_SUCCESS',

  USERS_UPDATE_COURSE = '[Users] USERS_UPDATE_COURSE',
  USERS_UPDATE_COURSE_SUCCESS = '[Users] USERS_UPDATE_COURSE_SUCCESS',

  USERS_DELETE_COURSE = '[Users] USERS_DELETE_COURSE',
  USERS_DELETE_COURSE_SUCCESS = '[Users] USERS_DELETE_COURSE_SUCCESS',

  USERS_ERROR = '[Users] USERS_ERROR',
}

/* get all data */
export const UsersGetAll = createAction(UsersActionTypes.USERS_GET_ALL);
export const UsersGetAllSuccess = createAction(UsersActionTypes.USERS_GET_ALL_SUCCESS, props<{ users: User[] }>());

/* get all data */
export const UsersReset = createAction(UsersActionTypes.USERS_RESET);
export const UsersResetSuccess = createAction(UsersActionTypes.USERS_RESET_SUCCESS);

/* create user */
export const UsersCreate = createAction(UsersActionTypes.USERS_CREATE, props<{ newUser: NewUser }>());
export const UsersCreateSuccess = createAction(UsersActionTypes.USERS_CREATE_SUCCESS, props<{ user: User }>());

/* update user */
export const UsersProfileUpdate = createAction(UsersActionTypes.USERS_PROFILE_UPDATE, props<{ id: number, updatedProperties: { [key: string]: any } }>());
export const UsersProfileUpdateSuccess = createAction(UsersActionTypes.USERS_PROFILE_UPDATE_SUCCESS, props<{ updatedUser: User }>());

/* create course */
export const UsersCourseCreate = createAction(UsersActionTypes.USERS_CREATE_COURSE, props<{ userId: number, course: Course }>());
export const UsersCourseCreateSuccess = createAction(UsersActionTypes.USERS_CREATE_COURSE_SUCCESS, props<{ userId: number, course: Course }>());

/* update course */
export const UsersCourseUpdate = createAction(UsersActionTypes.USERS_UPDATE_COURSE, props<{ userId: number, course: Course }>());
export const UsersCourseUpdateSuccess = createAction(UsersActionTypes.USERS_UPDATE_COURSE_SUCCESS, props<{ userId: number, course: Course }>());

/* delete course */
export const UsersCourseDelete = createAction(UsersActionTypes.USERS_DELETE_COURSE, props<{ userId: number, courseId: number }>());
export const UsersCourseDeleteSuccess = createAction(UsersActionTypes.USERS_DELETE_COURSE_SUCCESS, props<{ userId: number, courseId: number }>());


/* error */
export const UsersError = createAction(UsersActionTypes.USERS_ERROR, props<{ origin: UsersActionTypes, err: Error }>());
