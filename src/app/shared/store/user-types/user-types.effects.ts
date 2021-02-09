import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as UserTypesAction from './user-types.action';
import { NotificationService } from '@services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserTypesService } from '@services/user-types.service';

@Injectable()
export class UserTypesEffects {

  constructor(private actions$: Actions, private uts: UserTypesService, private notificationService: NotificationService) { }

  /* get all user types */
  getAllUserTypes$ = createEffect(() => this.actions$.pipe(
    ofType(UserTypesAction.UserTypesActionTypes.USER_TYPES_GET_ALL),
    mergeMap(() => this.uts.getUserTypes().pipe(
      map(userTypes => {
        return { type: UserTypesAction.UserTypesActionTypes.USER_TYPES_GET_ALL_SUCCESS, userTypes: userTypes };
      }),
      catchError(err => of({
        type: UserTypesAction.UserTypesActionTypes.USER_TYPES_ERROR,
        origin: UserTypesAction.UserTypesActionTypes.USER_TYPES_GET_ALL,
        err: err
      }))
    ))
  ));

  /* reset data */
  resetUserTypes$ = createEffect(() => this.actions$.pipe(
    ofType(UserTypesAction.UserTypesActionTypes.USER_TYPES_RESET),
    map(() => {
      return { type: UserTypesAction.UserTypesActionTypes.USER_TYPES_RESET_SUCCESS };
    }),
    catchError(err => of({
      type: UserTypesAction.UserTypesActionTypes.USER_TYPES_ERROR,
      origin: UserTypesAction.UserTypesActionTypes.USER_TYPES_RESET,
      err: err
    }))
  ));

  error$ = createEffect(() => this.actions$.pipe(
    ofType(UserTypesAction.UserTypesActionTypes.USER_TYPES_ERROR),
    tap((action: { type: string, origin: UserTypesAction.UserTypesActionTypes, err: HttpErrorResponse }) => {
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