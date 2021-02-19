import { createAction, props } from '@ngrx/store';
import { NewUser, User, UserBackend } from '@models/user.model';
import { ChangePassword } from '@models/change-password.model';
import { Course } from '@models/course.model';
import { Education } from '@models/education.model';
import { Language } from '@models/language.model';


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

  USERS_CREATE_EDUCATION = '[Users] USERS_CREATE_EDUCATION',
  USERS_CREATE_EDUCATION_SUCCESS = '[Users] USERS_CREATE_EDUCATION_SUCCESS',

  USERS_UPDATE_EDUCATION = '[Users] USERS_UPDATE_EDUCATION',
  USERS_UPDATE_EDUCATION_SUCCESS = '[Users] USERS_UPDATE_EDUCATION_SUCCESS',

  USERS_DELETE_EDUCATION = '[Users] USERS_DELETE_EDUCATION',
  USERS_DELETE_EDUCATION_SUCCESS = '[Users] USERS_DELETE_EDUCATION_SUCCESS',

  USERS_CREATE_LANGUAGE = '[Users] USERS_CREATE_LANGUAGE',
  USERS_CREATE_LANGUAGE_SUCCESS = '[Users] USERS_CREATE_LANGUAGE_SUCCESS',

  USERS_UPDATE_LANGUAGE = '[Users] USERS_UPDATE_LANGUAGE',
  USERS_UPDATE_LANGUAGE_SUCCESS = '[Users] USERS_UPDATE_LANGUAGE_SUCCESS',

  USERS_DELETE_LANGUAGE = '[Users] USERS_DELETE_LANGUAGE',
  USERS_DELETE_LANGUAGE_SUCCESS = '[Users] USERS_DELETE_LANGUAGE_SUCCESS',

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

/* create education */
export const UsersEducationCreate = createAction(UsersActionTypes.USERS_CREATE_EDUCATION, props<{ userId: number, education: Education }>());
export const UsersEducationCreateSuccess = createAction(UsersActionTypes.USERS_CREATE_EDUCATION_SUCCESS, props<{ userId: number, education: Education }>());

/* update education */
export const UsersEducationUpdate = createAction(UsersActionTypes.USERS_UPDATE_EDUCATION, props<{ userId: number, education: Education }>());
export const UsersEducationUpdateSuccess = createAction(UsersActionTypes.USERS_UPDATE_EDUCATION_SUCCESS, props<{ userId: number, education: Education }>());

/* delete education */
export const UsersEducationDelete = createAction(UsersActionTypes.USERS_DELETE_EDUCATION, props<{ userId: number, educationId: number }>());
export const UsersEducationDeleteSuccess = createAction(UsersActionTypes.USERS_DELETE_EDUCATION_SUCCESS, props<{ userId: number, educationId: number }>());

/* create language */
export const UsersLanguageCreate = createAction(UsersActionTypes.USERS_CREATE_LANGUAGE, props<{ userId: number, language: Language }>());
export const UsersLanguageCreateSuccess = createAction(UsersActionTypes.USERS_CREATE_LANGUAGE_SUCCESS, props<{ userId: number, language: Language }>());

/* update language */
export const UsersLanguageUpdate = createAction(UsersActionTypes.USERS_UPDATE_LANGUAGE, props<{ userId: number, language: Language }>());
export const UsersLanguageUpdateSuccess = createAction(UsersActionTypes.USERS_UPDATE_LANGUAGE_SUCCESS, props<{ userId: number, language: Language }>());

/* delete language */
export const UsersLanguageDelete = createAction(UsersActionTypes.USERS_DELETE_LANGUAGE, props<{ userId: number, languageId: number }>());
export const UsersLanguageDeleteSuccess = createAction(UsersActionTypes.USERS_DELETE_LANGUAGE_SUCCESS, props<{ userId: number, languageId: number }>());

/* error */
export const UsersError = createAction(UsersActionTypes.USERS_ERROR, props<{ origin: UsersActionTypes, err: Error }>());
