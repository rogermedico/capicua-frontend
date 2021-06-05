import { createAction, props } from '@ngrx/store';
import { UserType } from '@models/user-type.model';
import { CourseType } from '@models/course.model';

export enum AppConstantsActionTypes {
  USER_TYPES_GET_ALL = '[App Constants] USER_TYPE_GET_ALL',
  USER_TYPES_GET_ALL_SUCCESS = '[App Constants] USER_TYPE_GET_ALL_SUCCESS',

  COURSE_TYPES_GET_ALL = '[App Constants] COURSE_TYPE_GET_ALL',
  COURSE_TYPES_GET_ALL_SUCCESS = '[App Constants] COURSE_TYPE_GET_ALL_SUCCESS',

  APP_CONSTANTS_RESET = '[App Constants] APP_CONSTANTS_RESET',
  APP_CONSTANTS_RESET_SUCCESS = '[App Constants] APP_CONSTANTS_RESET_SUCCESS',

  APP_CONSTANTS_ERROR = '[App Constants] COURSE_TYPE_ERROR',
}

/* get all user types */
export const UserTypesGetAll = createAction(AppConstantsActionTypes.USER_TYPES_GET_ALL);
export const UserTypesGetAllSuccess = createAction(AppConstantsActionTypes.USER_TYPES_GET_ALL_SUCCESS, props<{ userTypes: UserType[] }>());

/* get course types */
export const CourseTypesGetAll = createAction(AppConstantsActionTypes.COURSE_TYPES_GET_ALL);
export const CourseTypesGetAllSuccess = createAction(AppConstantsActionTypes.COURSE_TYPES_GET_ALL_SUCCESS, props<{ courseTypes: CourseType[] }>());

/* reset app constants */
export const AppConstantsReset = createAction(AppConstantsActionTypes.APP_CONSTANTS_RESET);
export const AppConstantsResetSuccess = createAction(AppConstantsActionTypes.APP_CONSTANTS_RESET_SUCCESS);

/* error */
export const UserTypesError = createAction(AppConstantsActionTypes.APP_CONSTANTS_ERROR, props<{ origin: AppConstantsActionTypes, err: Error }>());
