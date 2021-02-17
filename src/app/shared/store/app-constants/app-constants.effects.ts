import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as AppConstantsAction from './app-constants.action';
import { NotificationService } from '@services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AppConstantsService } from '@services/app-constants.service';

@Injectable()
export class AppConstantsEffects {

  constructor(private actions$: Actions, private appConstantsService: AppConstantsService, private notificationService: NotificationService) { }

  /* get all user types */
  getAllUserTypes$ = createEffect(() => this.actions$.pipe(
    ofType(AppConstantsAction.AppConstantsActionTypes.USER_TYPES_GET_ALL),
    mergeMap(() => this.appConstantsService.getUserTypes().pipe(
      map(userTypes => {
        return { type: AppConstantsAction.AppConstantsActionTypes.USER_TYPES_GET_ALL_SUCCESS, userTypes: userTypes };
      }),
      catchError(err => of({
        type: AppConstantsAction.AppConstantsActionTypes.APP_CONSTANTS_ERROR,
        origin: AppConstantsAction.AppConstantsActionTypes.USER_TYPES_GET_ALL,
        err: err
      }))
    ))
  ));

  /* get all course types */
  getAllCourseTypes$ = createEffect(() => this.actions$.pipe(
    ofType(AppConstantsAction.AppConstantsActionTypes.COURSE_TYPES_GET_ALL),
    mergeMap(() => this.appConstantsService.getCourseTypes().pipe(
      map(courseTypes => {
        return { type: AppConstantsAction.AppConstantsActionTypes.COURSE_TYPES_GET_ALL_SUCCESS, courseTypes: courseTypes };
      }),
      catchError(err => of({
        type: AppConstantsAction.AppConstantsActionTypes.APP_CONSTANTS_ERROR,
        origin: AppConstantsAction.AppConstantsActionTypes.COURSE_TYPES_GET_ALL,
        err: err
      }))
    ))
  ));

  /* reset data */
  resetUserTypes$ = createEffect(() => this.actions$.pipe(
    ofType(AppConstantsAction.AppConstantsActionTypes.APP_CONSTANTS_RESET),
    map(() => {
      return { type: AppConstantsAction.AppConstantsActionTypes.APP_CONSTANTS_RESET_SUCCESS };
    }),
    catchError(err => of({
      type: AppConstantsAction.AppConstantsActionTypes.APP_CONSTANTS_ERROR,
      origin: AppConstantsAction.AppConstantsActionTypes.APP_CONSTANTS_RESET,
      err: err
    }))
  ));

  error$ = createEffect(() => this.actions$.pipe(
    ofType(AppConstantsAction.AppConstantsActionTypes.APP_CONSTANTS_ERROR),
    tap((action: { type: string, origin: AppConstantsAction.AppConstantsActionTypes, err: HttpErrorResponse }) => {
      switch (action.err.status) {
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
      console.log('USER ERROR: ', {
        origin: action.origin,
        error: action.err
      });
    })
  ),
    { dispatch: false }
  );

}