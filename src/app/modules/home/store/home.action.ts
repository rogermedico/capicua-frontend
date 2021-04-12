import { createAction, props } from '@ngrx/store';
import { NewUser, User, UserBackend } from '@models/user.model';
import { ChangePassword } from '@models/change-password.model';
import { Course } from '@models/course.model';
import { Education } from '@models/education.model';
import { Language } from '@models/language.model';
import { SafeResourceUrl } from '@angular/platform-browser';
import { HomeDocument, PersonalDocument } from '@models/document.model';
import { HomePost, HomePostSend } from '@models/home-post.model';


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

  HOME_MOVE_POST = '[Home] HOME_MOVE_POST',
  HOME_MOVE_POST_SUCCESS = '[Home] HOME_MOVE_POST_SUCCESS',

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
export const HomeCreatePost = createAction(HomeActionTypes.HOME_CREATE_POST, props<{ newHomePost: HomePostSend }>());
export const HomeCreatePostSuccess = createAction(HomeActionTypes.HOME_CREATE_POST_SUCCESS, props<{ homePost: HomePost }>());

/* update post */
export const HomeUpdatePost = createAction(HomeActionTypes.HOME_UPDATE_POST, props<{ homePostId: number, updatedHomePostProperties: { [key: string]: any } }>());
export const HomeUpdatePostSuccess = createAction(HomeActionTypes.HOME_UPDATE_POST_SUCCESS, props<{ updatedHomePost: HomePost }>());

/* delete post */
export const HomeDeletePost = createAction(HomeActionTypes.HOME_DELETE_POST, props<{ homePostId: number }>());
export const HomeDeletePostSuccess = createAction(HomeActionTypes.HOME_DELETE_POST_SUCCESS, props<{ homePostId: number }>());

/* move home post */
export const HomeMovePost = createAction(HomeActionTypes.HOME_MOVE_POST, props<{ homePostOriginId: number, homePostDestinationId: number }>());
export const HomeMovePostSuccess = createAction(HomeActionTypes.HOME_MOVE_POST_SUCCESS, props<{ homePostOriginId: number, homePostDestinationId: number }>());

/* get home document */
export const HomeGetPostDocument = createAction(HomeActionTypes.HOME_GET_POST_DOCUMENT, props<{ documentId: number }>());
export const HomeGetPostDocumentSuccess = createAction(HomeActionTypes.HOME_GET_POST_DOCUMENT_SUCCESS, props<{ homePostDocument: HomeDocument }>());

/* add home document */
export const HomeAddPostDocument = createAction(HomeActionTypes.HOME_ADD_POST_DOCUMENT, props<{ homePostId: number, document: File }>());
export const HomeAddPostDocumentSuccess = createAction(HomeActionTypes.HOME_ADD_POST_DOCUMENT_SUCCESS, props<{ homeDocument: HomeDocument }>());

/* delete home document */
export const HomeDeletePostDocument = createAction(HomeActionTypes.HOME_DELETE_POST_DOCUMENT, props<{ homePostId: number, homePostDocumentId: number }>());
export const HomeDeletePostDocumentSuccess = createAction(HomeActionTypes.HOME_DELETE_POST_DOCUMENT_SUCCESS, props<{ homePostId: number, homePostDocumentId: number }>());

/* error */
export const HomeError = createAction(HomeActionTypes.HOME_ERROR, props<{ origin: HomeActionTypes, err: Error }>());
