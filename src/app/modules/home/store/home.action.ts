import { createAction, props } from '@ngrx/store';
import { NewUser, User, UserBackend } from '@models/user.model';
import { ChangePassword } from '@models/change-password.model';
import { Course } from '@models/course.model';
import { Education } from '@models/education.model';
import { Language } from '@models/language.model';
import { SafeResourceUrl } from '@angular/platform-browser';
import { PersonalDocument } from '@models/document.model';
import { HomePost } from '@models/home-post.model';


export enum HomeActionTypes {
  HOME_GET_ALL = '[Home] HOME_GET_ALL',
  HOME_GET_ALL_SUCCESS = '[Home] HOME_GET_ALL_SUCCESS',

  HOME_RESET = '[Home] HOME_RESET',
  HOME_RESET_SUCCESS = '[Home] HOME_RESET_SUCCESS',

  HOME_CREATE_POST = '[Home] HOME_CREATE_POST',
  HOME_CREATE_POST_SUCCESS = '[Home] HOME_CREATE_POST_SUCCESS',

  HOME_UPDATE_POST = '[Home] HOME_UPDATE_POST',
  HOME_UPDATE_POST_SUCCESS = '[Home] HOME_UPDATE_POST_SUCCESS',

  HOME_DELETE_POST = '[Home] HOME_DELETE_POST',
  HOME_DELETE_POST_SUCCESS = '[Home] HOME_DELETE_POST_SUCCESS',

  HOME_GET_POST_DOCUMENT = '[Home] HOME_GET_POST_DOCUMENT',
  HOME_GET_POST_DOCUMENT_SUCCESS = '[Home] HOME_GET_POST_DOCUMENT_SUCCESS',

  HOME_ADD_POST_DOCUMENT = '[Home] HOME_ADD_POST_DOCUMENT',
  HOME_ADD_POST_DOCUMENT_SUCCESS = '[Home] HOME_ADD_POST_DOCUMENT_SUCCESS',

  HOME_DELETE_POST_DOCUMENT = '[Home] HOME_DELETE_POST_DOCUMENT',
  HOME_DELETE_POST_DOCUMENT_SUCCESS = '[Home] HOME_DELETE_POST_DOCUMENT_SUCCESS',

  HOME_ERROR = '[Home] HOME_ERROR',
}

/* get all data */
export const HomeGetAll = createAction(HomeActionTypes.HOME_GET_ALL);
export const HomeGetAllSuccess = createAction(HomeActionTypes.HOME_GET_ALL_SUCCESS, props<{ homePosts: HomePost[] }>());

/* reset data */
export const HomeReset = createAction(HomeActionTypes.HOME_RESET);
export const HomeResetSuccess = createAction(HomeActionTypes.HOME_RESET_SUCCESS);

/* create post */
export const HomeCreate = createAction(HomeActionTypes.HOME_CREATE_POST, props<{ newHomePost: HomePost }>());
export const HomeCreateSuccess = createAction(HomeActionTypes.HOME_CREATE_POST_SUCCESS, props<{ user: User }>());

/* update post */
export const HomeEdit = createAction(HomeActionTypes.HOME_UPDATE_POST, props<{ userId: number, editedProperties: { [key: string]: any } }>());
export const HomeEditSuccess = createAction(HomeActionTypes.HOME_UPDATE_POST_SUCCESS, props<{ editedUser: User }>());

/* delete post */
export const HomeDelete = createAction(HomeActionTypes.HOME_DELETE_POST, props<{ userId: number }>());
export const HomeDeleteSuccess = createAction(HomeActionTypes.HOME_DELETE_POST_SUCCESS, props<{ userId: number }>());

/* get home document */
export const HomeGetPersonalDocument = createAction(HomeActionTypes.HOME_GET_POST_DOCUMENT, props<{ documentId: number }>());
export const HomeGetPersonalDocumentSuccess = createAction(HomeActionTypes.HOME_GET_POST_DOCUMENT_SUCCESS, props<{ userId: number, documentId: number, personalDocument: string }>());

/* add home document */
export const HomeAddPersonalDocument = createAction(HomeActionTypes.HOME_ADD_POST_DOCUMENT, props<{ userId: number, document: File }>());
export const HomeAddPersonalDocumentSuccess = createAction(HomeActionTypes.HOME_ADD_POST_DOCUMENT_SUCCESS, props<{ personalDocument: PersonalDocument }>());

/* delete home document */
export const HomeDeletePersonalDocument = createAction(HomeActionTypes.HOME_DELETE_POST_DOCUMENT, props<{ userId: number, documentId: number }>());
export const HomeDeletePersonalDocumentSuccess = createAction(HomeActionTypes.HOME_DELETE_POST_DOCUMENT_SUCCESS, props<{ userId: number, documentId: number }>());

/* error */
export const HomeError = createAction(HomeActionTypes.HOME_ERROR, props<{ origin: HomeActionTypes, err: Error }>());
