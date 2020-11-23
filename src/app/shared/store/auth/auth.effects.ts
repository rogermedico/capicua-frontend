import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as AuthActions from './auth.action';
import * as UserActions from '@store/user/user.action';
import { UserService } from '@services/user.service';
import { User } from '@models/user.model';
import { Login } from '@models/login.model';

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private us: UserService) { }

  /* login */
  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.AUTH_LOGIN),
    mergeMap((action: { type: string, loginInfo: Login }) => this.us.login(action.loginInfo).pipe(
      mergeMap(user => {
        const loginInfo: Login = { username: user.email, password: user.password };
        return [
          { type: AuthActions.AuthActionTypes.AUTH_LOGIN_SUCCESS, loginInfo: loginInfo },
          { type: UserActions.UserActionTypes.USER_SIGNIN, user: user }
        ]
      }),
      catchError(err => of({ type: AuthActions.AuthActionTypes.AUTH_LOGIN_ERROR, err: err }))
    ))
  ));

  /* logout */
  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.AUTH_LOGOUT),
    mergeMap((action: { type: string, user: User }) => this.us.logout(action.user).pipe(
      mergeMap(() => {
        return [
          { type: AuthActions.AuthActionTypes.AUTH_LOGOUT_SUCCESS },
          { type: UserActions.UserActionTypes.USER_SIGNOUT }
        ]
      }),
      catchError(err => of({ type: AuthActions.AuthActionTypes.AUTH_LOGOUT_ERROR, err: err }))
    ))
  ));

  /* register */
  // register$ = createEffect(() => this.actions$.pipe(
  //   ofType(AuthActions.AuthActionTypes.AUTH_REGISTER),
  //   mergeMap((action: { type: string, user: User }) => this.us.register(action.user).pipe(
  //     mergeMap(user => {
  //       return [
  //         { type: AuthActions.AuthActionTypes.AUTH_REGISTER_SUCCESS, user: user },
  //         { type: UserActions.UserActionTypes.USER_SIGNIN, user: user }
  //       ]
  //     }),
  //     catchError(err => of({ type: AuthActions.AuthActionTypes.AUTH_REGISTER_ERROR, err: err }))
  //   ))
  // ));


}