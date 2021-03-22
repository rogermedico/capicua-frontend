import { createAction, props } from '@ngrx/store';
import { User } from '@models/user.model';
import { Login } from '@models/login.model';
import { Language } from '@models/language.model';
import { Education } from '@models/education.model';
import { ChangePassword } from '@models/change-password.model';
import { Course } from '@models/course.model';
import { SafeResourceUrl } from '@angular/platform-browser';
import { PersonalDocument } from '@models/document.model';

export enum UserActionTypes {
  USER_GET_DATA = '[User] USER_GET_DATA',
  USER_GET_DATA_SUCCESS = '[User] USER_GET_DATA_SUCCESS',

  USER_RESET_DATA = '[User] USER_RESET_DATA',
  USER_RESET_DATA_SUCCESS = '[User] USER_RESET_DATA_SUCCESS',

  USER_PROFILE_UPDATE = '[User] USER_PROFILE_UPDATE',
  USER_PROFILE_UPDATE_SUCCESS = '[User] USER_PROFILE_UPDATE_SUCCESS',

  USER_CREATE_COURSE = '[User] USER_CREATE_COURSE',
  USER_CREATE_COURSE_SUCCESS = '[User] USER_CREATE_COURSE_SUCCESS',

  USER_UPDATE_COURSE = '[User] USER_UPDATE_COURSE',
  USER_UPDATE_COURSE_SUCCESS = '[User] USER_UPDATE_COURSE_SUCCESS',

  USER_DELETE_COURSE = '[User] USER_DELETE_COURSE',
  USER_DELETE_COURSE_SUCCESS = '[User] USER_DELETE_COURSE_SUCCESS',

  USER_CREATE_EDUCATION = '[User] USER_CREATE_EDUCATION',
  USER_CREATE_EDUCATION_SUCCESS = '[User] USER_CREATE_EDUCATION_SUCCESS',

  USER_UPDATE_EDUCATION = '[User] USER_UPDATE_EDUCATION',
  USER_UPDATE_EDUCATION_SUCCESS = '[User] USER_UPDATE_EDUCATION_SUCCESS',

  USER_DELETE_EDUCATION = '[User] USER_DELETE_EDUCATION',
  USER_DELETE_EDUCATION_SUCCESS = '[User] USER_DELETE_EDUCATION_SUCCESS',

  USER_CREATE_LANGUAGE = '[User] USER_CREATE_LANGUAGE',
  USER_CREATE_LANGUAGE_SUCCESS = '[User] USER_CREATE_LANGUAGE_SUCCESS',

  USER_UPDATE_LANGUAGE = '[User] USER_UPDATE_LANGUAGE',
  USER_UPDATE_LANGUAGE_SUCCESS = '[User] USER_UPDATE_LANGUAGE_SUCCESS',

  USER_DELETE_LANGUAGE = '[User] USER_DELETE_LANGUAGE',
  USER_DELETE_LANGUAGE_SUCCESS = '[User] USER_DELETE_LANGUAGE_SUCCESS',

  USER_UPDATE_AVATAR = '[User] USER_UPDATE_AVATAR',
  USER_UPDATE_AVATAR_SUCCESS = '[User] USER_UPDATE_AVATAR_SUCCESS',

  USER_DELETE_AVATAR = '[User] USER_DELETE_AVATAR',
  USER_DELETE_AVATAR_SUCCESS = '[User] USER_DELETE_AVATAR_SUCCESS',

  USER_GET_DNI = '[User] USER_GET_DNI',
  USER_GET_DNI_SUCCESS = '[User] USER_GET_DNI_SUCCESS',

  USER_UPDATE_DNI = '[User] USER_UPDATE_DNI',
  USER_UPDATE_DNI_SUCCESS = '[User] USER_UPDATE_DNI_SUCCESS',

  USER_GET_OFFENSES = '[User] USER_GET_OFFENSES',
  USER_GET_OFFENSES_SUCCESS = '[User] USER_GET_OFFENSES_SUCCESS',

  USER_UPDATE_OFFENSES = '[User] USER_UPDATE_OFFENSES',
  USER_UPDATE_OFFENSES_SUCCESS = '[User] USER_UPDATE_OFFENSES_SUCCESS',

  USER_CHANGE_PASSWORD = '[User] USER_CHANGE_PASSWORD',
  USER_CHANGE_PASSWORD_SUCCESS = '[User] USER_CHANGE_PASSWORD_SUCCESS',

  USER_GET_PERSONAL_DOCUMENTS_INFO = '[User] USER_GET_PERSONAL_DOCUMENTS_INFO',
  USER_GET_PERSONAL_DOCUMENTS_INFO_SUCCESS = '[User] USER_GET_PERSONAL_DOCUMENTS_INFO_SUCCESS',

  USER_GET_PERSONAL_DOCUMENT = '[User] USER_GET_PERSONAL_DOCUMENT',
  USER_GET_PERSONAL_DOCUMENT_SUCCESS = '[User] USER_GET_PERSONAL_DOCUMENT_SUCCESS',

  USER_ERROR = '[User] USER_ERROR',
}

/* get data */
export const UserGetData = createAction(UserActionTypes.USER_GET_DATA);
export const UserGetDataSuccess = createAction(UserActionTypes.USER_GET_DATA_SUCCESS, props<{ user: User }>());

/* reset data */
export const UserResetData = createAction(UserActionTypes.USER_RESET_DATA);
export const UserResetDataSuccess = createAction(UserActionTypes.USER_RESET_DATA_SUCCESS);

/* update user */
export const UserProfileUpdate = createAction(UserActionTypes.USER_PROFILE_UPDATE, props<{ updatedProperties: { [key: string]: any } }>());
export const UserProfileUpdateSuccess = createAction(UserActionTypes.USER_PROFILE_UPDATE_SUCCESS, props<{ updatedUser: User }>());

/* create course */
export const UserCourseCreate = createAction(UserActionTypes.USER_CREATE_COURSE, props<{ course: Course }>());
export const UserCourseCreateSuccess = createAction(UserActionTypes.USER_CREATE_COURSE_SUCCESS, props<{ course: Course }>());

/* update course */
export const UserCourseUpdate = createAction(UserActionTypes.USER_UPDATE_COURSE, props<{ course: Course }>());
export const UserCourseUpdateSuccess = createAction(UserActionTypes.USER_UPDATE_COURSE_SUCCESS, props<{ course: Course }>());

/* delete course */
export const UserCourseDelete = createAction(UserActionTypes.USER_DELETE_COURSE, props<{ courseId: number }>());
export const UserCourseDeleteSuccess = createAction(UserActionTypes.USER_DELETE_COURSE_SUCCESS, props<{ courseId: number }>());

/* create education */
export const UserEducationCreate = createAction(UserActionTypes.USER_CREATE_EDUCATION, props<{ education: Education }>());
export const UserEducationCreateSuccess = createAction(UserActionTypes.USER_CREATE_EDUCATION_SUCCESS, props<{ education: Education }>());

/* update education */
export const UserEducationUpdate = createAction(UserActionTypes.USER_UPDATE_EDUCATION, props<{ education: Education }>());
export const UserEducationUpdateSuccess = createAction(UserActionTypes.USER_UPDATE_EDUCATION_SUCCESS, props<{ education: Education }>());

/* delete education */
export const UserEducationDelete = createAction(UserActionTypes.USER_DELETE_EDUCATION, props<{ educationId: number }>());
export const UserEducationDeleteSuccess = createAction(UserActionTypes.USER_DELETE_EDUCATION_SUCCESS, props<{ educationId: number }>());

/* create language */
export const UserLanguageCreate = createAction(UserActionTypes.USER_CREATE_LANGUAGE, props<{ language: Language }>());
export const UserLanguageCreateSuccess = createAction(UserActionTypes.USER_CREATE_LANGUAGE_SUCCESS, props<{ language: Language }>());

/* update language */
export const UserLanguageUpdate = createAction(UserActionTypes.USER_UPDATE_LANGUAGE, props<{ language: Language }>());
export const UserLanguageUpdateSuccess = createAction(UserActionTypes.USER_UPDATE_LANGUAGE_SUCCESS, props<{ language: Language }>());

/* delete language */
export const UserLanguageDelete = createAction(UserActionTypes.USER_DELETE_LANGUAGE, props<{ languageId: number }>());
export const UserLanguageDeleteSuccess = createAction(UserActionTypes.USER_DELETE_LANGUAGE_SUCCESS, props<{ languageId: number }>());

/* update avatar */
export const UserAvatarUpdate = createAction(UserActionTypes.USER_UPDATE_AVATAR, props<{ avatar: File }>());
export const UserAvatarUpdateSuccess = createAction(UserActionTypes.USER_UPDATE_AVATAR_SUCCESS, props<{ avatar: SafeResourceUrl }>());

/* delete avatar */
export const UserAvatarDelete = createAction(UserActionTypes.USER_DELETE_AVATAR);
export const UserAvatarDeleteSuccess = createAction(UserActionTypes.USER_DELETE_AVATAR_SUCCESS);

/* dni get */
export const UserDniGet = createAction(UserActionTypes.USER_GET_DNI, props<{ userId: number }>());
export const UserDniGetSuccess = createAction(UserActionTypes.USER_GET_DNI_SUCCESS, props<{ dni: string }>());

/* dni update */
export const UserDniUpdate = createAction(UserActionTypes.USER_UPDATE_DNI, props<{ dni: File }>());
export const UserDniUpdateSuccess = createAction(UserActionTypes.USER_UPDATE_DNI_SUCCESS, props<{ dni: string }>());

/* offenses get */
export const UserOffensesGet = createAction(UserActionTypes.USER_GET_OFFENSES, props<{ userId: number }>());
export const UserOffensesGetSuccess = createAction(UserActionTypes.USER_GET_OFFENSES_SUCCESS, props<{ offenses: string }>());

/* offenses update */
export const UserOffensesUpdate = createAction(UserActionTypes.USER_UPDATE_OFFENSES, props<{ offenses: File }>());
export const UserOffensesUpdateSuccess = createAction(UserActionTypes.USER_UPDATE_OFFENSES_SUCCESS, props<{ offenses: string }>());

/* change password */
export const UserChangePassword = createAction(UserActionTypes.USER_CHANGE_PASSWORD, props<{ changePassword: ChangePassword }>());
export const UserChangePasswordSuccess = createAction(UserActionTypes.USER_CHANGE_PASSWORD_SUCCESS);

/* get personal documents info */
export const UserGetPersonalDocumentsInfo = createAction(UserActionTypes.USER_GET_PERSONAL_DOCUMENTS_INFO, props<{ userId: number }>());
export const UserGetPersonalDocumentsInfoSuccess = createAction(UserActionTypes.USER_GET_PERSONAL_DOCUMENTS_INFO_SUCCESS, props<{ personalDocuments: PersonalDocument[] }>());

/* get personal document */
export const UserGetPersonalDocument = createAction(UserActionTypes.USER_GET_PERSONAL_DOCUMENT, props<{ documentId: number }>());
export const UserGetPersonalDocumentSuccess = createAction(UserActionTypes.USER_GET_PERSONAL_DOCUMENT_SUCCESS, props<{ documentId: number, personalDocument: string }>());


/* error */
export const UserError = createAction(UserActionTypes.USER_ERROR, props<{ origin: UserActionTypes, err: Error }>());