import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as UsersActions from './users.action';
import { UsersService } from '@modules/users/services/users.service';
import { NewUser, User } from '@models/user.model';
import { Language } from '@models/language.model';
import { Education } from '@models/education.model';
import { ActivitiesFavoritesService } from '@services/activities-favorites.service';
import { Login } from '@models/login.model';
import { ChangePassword } from '@models/change-password.model';
import { NotificationService } from '@services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Course } from '@models/course.model';
import { SafeResourceUrl } from '@angular/platform-browser';

@Injectable()
export class UsersEffects {

  constructor(private actions$: Actions, private us: UsersService, private notificationService: NotificationService) { }

  /* get all users */
  getAll$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.USERS_GET_ALL),
    mergeMap(() => this.us.getUsers().pipe(
      map(users => {
        return { type: UsersActions.UsersActionTypes.USERS_GET_ALL_SUCCESS, users: users };
      }),
      catchError(err => of({
        type: UsersActions.UsersActionTypes.USERS_ERROR,
        origin: UsersActions.UsersActionTypes.USERS_GET_ALL,
        err: err
      }))
    ))
  ));

  /* reset data */
  resetData$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.USERS_RESET),
    map(() => {
      return { type: UsersActions.UsersActionTypes.USERS_RESET_SUCCESS };
    }),
    catchError(err => of({
      type: UsersActions.UsersActionTypes.USERS_ERROR,
      origin: UsersActions.UsersActionTypes.USERS_RESET,
      err: err
    }))
  ));

  /* create new user */
  createUser$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.USERS_CREATE),
    mergeMap((action: { type: string, newUser: NewUser }) => this.us.newUser(action.newUser).pipe(
      map((user: User) => {
        return { type: UsersActions.UsersActionTypes.USERS_CREATE_SUCCESS, user: user };
      }),
      catchError(err => of({
        type: UsersActions.UsersActionTypes.USERS_ERROR,
        origin: UsersActions.UsersActionTypes.USERS_CREATE,
        err: err
      }))
    ))
  ));

  /* edit user */
  editUser$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.USERS_PROFILE_UPDATE),
    mergeMap((action: { type: string, id: number, updatedProperties: { [key: string]: any } }) => this.us.editUser(action.id, action.updatedProperties).pipe(
      map((updatedUser: User) => {
        console.log(updatedUser)
        return { type: UsersActions.UsersActionTypes.USERS_PROFILE_UPDATE_SUCCESS, updatedUser: updatedUser };
      }),
      catchError(err => of({
        type: UsersActions.UsersActionTypes.USERS_ERROR,
        origin: UsersActions.UsersActionTypes.USERS_PROFILE_UPDATE,
        err: err
      }))
    ))
  ));

  /* get avatar */
  usersAvatarGet$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.USERS_GET_AVATAR),
    mergeMap((action: { type: string, userId: number }) => {
      return this.us.getAvatar(action.userId).pipe(
        // map(a => { console.log(a); return null })
        map((data: { userId: number, avatar: SafeResourceUrl }) => {
          console.log(data);
          return { type: UsersActions.UsersActionTypes.USERS_GET_AVATAR_SUCCESS, userId: data.userId, avatar: data.avatar };
        }),
        catchError(err => of({
          type: UsersActions.UsersActionTypes.USERS_ERROR,
          origin: UsersActions.UsersActionTypes.USERS_GET_AVATAR,
          err: err
        }))
      )
    })
  ));

  /* activate user */
  activateUser$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.USERS_ACTIVATE),
    mergeMap((action: { type: string, userId: number }) => this.us.activateUser(action.userId).pipe(
      // map(a => { console.log(a); return null })
      map((data: { userId: number }) => {
        console.log(data);
        return { type: UsersActions.UsersActionTypes.USERS_ACTIVATE_SUCCESS, userId: data.userId };
      }),
      catchError(err => of({
        type: UsersActions.UsersActionTypes.USERS_ERROR,
        origin: UsersActions.UsersActionTypes.USERS_ACTIVATE,
        err: err
      }))
    )
    )
  ));

  /* deactivate user */
  deactivateUser$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.USERS_DEACTIVATE),
    mergeMap((action: { type: string, userId: number }) => this.us.deactivateUser(action.userId).pipe(
      // map(a => { console.log(a); return null })
      map((data: { userId: number }) => {
        console.log(data);
        return { type: UsersActions.UsersActionTypes.USERS_DEACTIVATE_SUCCESS, userId: data.userId };
      }),
      catchError(err => of({
        type: UsersActions.UsersActionTypes.USERS_ERROR,
        origin: UsersActions.UsersActionTypes.USERS_DEACTIVATE,
        err: err
      }))
    )
    )
  ));

  /* delete user */
  deleteUser$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.USERS_DELETE),
    mergeMap((action: { type: string, userId: number }) => this.us.deleteUser(action.userId).pipe(
      // map(a => { console.log(a); return null })
      map((data: { userId: number }) => {
        console.log(data);
        return { type: UsersActions.UsersActionTypes.USERS_DELETE_SUCCESS, userId: data.userId };
      }),
      catchError(err => of({
        type: UsersActions.UsersActionTypes.USERS_ERROR,
        origin: UsersActions.UsersActionTypes.USERS_DELETE,
        err: err
      }))
    )
    )
  ));

  /* error */
  error$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.USERS_ERROR),
    tap((action: { type: string, origin: UsersActions.UsersActionTypes, err: HttpErrorResponse }) => {
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
      console.log('USERS ERROR: ', {
        origin: action.origin,
        error: action.err
      });
    })
  ),
    { dispatch: false }
  );

}