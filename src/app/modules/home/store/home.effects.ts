import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as HomeActions from './home.action';
import { HomeService } from '@modules/home/services/home.service';
import { NotificationService } from '@services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HomeDocument } from '@models/document.model';
import { HomePost, HomePostSend } from '@models/home-post.model';

@Injectable()
export class HomeEffects {

  constructor(
    private actions$: Actions,
    private hs: HomeService,
    private notificationService: NotificationService
  ) { }

  /* get all posts */
  getAll$ = createEffect(() => this.actions$.pipe(
    ofType(HomeActions.HomeActionTypes.HOME_GET_ALL),
    mergeMap(() => this.hs.getPosts().pipe(
      map((homePosts: HomePost[]) => {
        return { type: HomeActions.HomeActionTypes.HOME_GET_ALL_SUCCESS, homePosts: homePosts };
      }),
      catchError(err => of({
        type: HomeActions.HomeActionTypes.HOME_ERROR,
        origin: HomeActions.HomeActionTypes.HOME_GET_ALL,
        err: err
      }))
    ))
  ));

  /* reset data */
  resetData$ = createEffect(() => this.actions$.pipe(
    ofType(HomeActions.HomeActionTypes.HOME_RESET),
    map(() => {
      return { type: HomeActions.HomeActionTypes.HOME_RESET_SUCCESS };
    }),
    catchError(err => of({
      type: HomeActions.HomeActionTypes.HOME_ERROR,
      origin: HomeActions.HomeActionTypes.HOME_RESET,
      err: err
    }))
  ));

  /* new home post */
  newHomePost$ = createEffect(() => this.actions$.pipe(
    ofType(HomeActions.HomeActionTypes.HOME_CREATE_POST),
    mergeMap((action: { type: string, newHomePost: HomePostSend }) => this.hs.newHomePost(action.newHomePost).pipe(
      map((homePost: HomePost) => {
        return { type: HomeActions.HomeActionTypes.HOME_CREATE_POST_SUCCESS, homePost: homePost };
      }),
      catchError(err => of({
        type: HomeActions.HomeActionTypes.HOME_ERROR,
        origin: HomeActions.HomeActionTypes.HOME_CREATE_POST,
        err: err
      }))
    ))
  ));

  /* update home post */
  updateHomePost$ = createEffect(() => this.actions$.pipe(
    ofType(HomeActions.HomeActionTypes.HOME_UPDATE_POST),
    mergeMap((action: { type: string, homePostId: number, updatedHomePostProperties: { [key: string]: any } }) => this.hs.updateHomePost(action.homePostId, action.updatedHomePostProperties).pipe(
      map((updatedHomePost: HomePost) => {
        return { type: HomeActions.HomeActionTypes.HOME_UPDATE_POST_SUCCESS, updatedHomePost: updatedHomePost };
      }),
      catchError(err => of({
        type: HomeActions.HomeActionTypes.HOME_ERROR,
        origin: HomeActions.HomeActionTypes.HOME_UPDATE_POST,
        err: err
      }))
    ))
  ));

  /* delete home post */
  deleteHomePost$ = createEffect(() => this.actions$.pipe(
    ofType(HomeActions.HomeActionTypes.HOME_DELETE_POST),
    mergeMap((action: { type: string, homePostId: number }) => this.hs.deleteHomePost(action.homePostId).pipe(
      map((data: { homePostId: number }) => {
        return { type: HomeActions.HomeActionTypes.HOME_DELETE_POST_SUCCESS, homePostId: data.homePostId };
      }),
      catchError(err => of({
        type: HomeActions.HomeActionTypes.HOME_ERROR,
        origin: HomeActions.HomeActionTypes.HOME_DELETE_POST,
        err: err
      }))
    )
    )
  ));

  /* move home post */
  moveHomePost$ = createEffect(() => this.actions$.pipe(
    ofType(HomeActions.HomeActionTypes.HOME_MOVE_POST),
    mergeMap((action: { type: string, homePostOriginId: number, homePostDestinationId: number }) => this.hs.moveHomePost(action.homePostOriginId, action.homePostDestinationId).pipe(
      map((response: { homePostOriginId: number, homePostDestinationId: number }) => {
        return { type: HomeActions.HomeActionTypes.HOME_MOVE_POST_SUCCESS, homePostOriginId: response.homePostOriginId, homePostDestinationId: response.homePostDestinationId };
      }),
      catchError(err => of({
        type: HomeActions.HomeActionTypes.HOME_ERROR,
        origin: HomeActions.HomeActionTypes.HOME_MOVE_POST,
        err: err
      }))
    ))
  ));

  /* get home post document  */
  getHomePostDocument$ = createEffect(() => this.actions$.pipe(
    ofType(HomeActions.HomeActionTypes.HOME_GET_POST_DOCUMENT),
    mergeMap((action: { type: string, documentId: number }) => this.hs.getHomePostDocument(action.documentId).pipe(
      map((homePostDocument: HomeDocument) => {
        return { type: HomeActions.HomeActionTypes.HOME_GET_POST_DOCUMENT_SUCCESS, homePostDocument: homePostDocument };
      }),
      catchError(err => of({
        type: HomeActions.HomeActionTypes.HOME_ERROR,
        origin: HomeActions.HomeActionTypes.HOME_GET_POST_DOCUMENT,
        err: err
      }))
    ))
  ));

  /* add home post document  */
  addHomePostDocument$ = createEffect(() => this.actions$.pipe(
    ofType(HomeActions.HomeActionTypes.HOME_ADD_POST_DOCUMENT),
    mergeMap((action: { type: string, homePostId: number, document: File }) => this.hs.addHomePostDocument(action.homePostId, action.document).pipe(
      map((homeDocument: HomeDocument) => {
        return { type: HomeActions.HomeActionTypes.HOME_ADD_POST_DOCUMENT_SUCCESS, homeDocument: homeDocument };
      }),
      catchError(err => of({
        type: HomeActions.HomeActionTypes.HOME_ERROR,
        origin: HomeActions.HomeActionTypes.HOME_ADD_POST_DOCUMENT,
        err: err
      }))
    ))
  ));

  /* delete home post document  */
  deleteHomePostDocument$ = createEffect(() => this.actions$.pipe(
    ofType(HomeActions.HomeActionTypes.HOME_DELETE_POST_DOCUMENT),
    mergeMap((action: { type: string, homePostId: number, homePostDocumentId: number }) => this.hs.deleteHomePostDocument(action.homePostId, action.homePostDocumentId).pipe(
      map(response => {
        return { type: HomeActions.HomeActionTypes.HOME_DELETE_POST_DOCUMENT_SUCCESS, homePostId: response.homePostId, homePostDocumentId: response.homePostDocumentId };
      }),
      catchError(err => of({
        type: HomeActions.HomeActionTypes.HOME_ERROR,
        origin: HomeActions.HomeActionTypes.HOME_DELETE_POST_DOCUMENT,
        err: err
      }))
    ))
  ));

  /* error */
  error$ = createEffect(() => this.actions$.pipe(
    ofType(HomeActions.HomeActionTypes.HOME_ERROR),
    tap((action: { type: string, origin: HomeActions.HomeActionTypes, err: HttpErrorResponse }) => {
      switch (action.err.status) {
        case 400:
          this.notificationService.showError('Email address already in use', 'OK');
          break;
        case 401:
          this.notificationService.showError('Unauthorized', 'OK');
          break;
        case 404:
          this.notificationService.showError('Server not found', 'OK');
          break;
        case 422:
          this.notificationService.showError('Unprocessable entity', 'OK');
          break;
        default:
          this.notificationService.showError('Undefined error', 'OK');
      }
      console.log('HOME ERROR: ', {
        origin: action.origin,
        error: action.err
      });
    })
  ),
    { dispatch: false }
  );

}