import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as AuthActions from './auth.action';
import * as UserActions from '@modules/user/store/user.action';
import { User } from '@models/user.model';
import { Login } from '@models/login.model';
import { AuthService } from '../services/auth.service';
import { Auth } from '@models/auth.model';
import { Course } from '@models/course.model';
import { DrivingLicence } from '@models/driving-licence.model';
import { AuthBackend } from '@models/auth.model';
import { ParserService } from '../services/parser.service';
import { ResetPassword } from '@models/reset-password.model';

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private authService: AuthService, private parser: ParserService) { }

  /* login */
  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.AUTH_LOGIN),
    mergeMap((action: { type: string, loginInfo: Login }) => this.authService.login(action.loginInfo).pipe(
      mergeMap((authBackend: AuthBackend) => {
        const user = this.parser.parseUser(authBackend.user);
        const auth: Auth = {
          accessToken: authBackend.accessToken,
          tokenType: authBackend.tokenType,
          expiresIn: authBackend.expiresIn,
          username: authBackend.user.email
        }

        console.log('auth:', auth);
        console.log('user', user);
        return [
          { type: AuthActions.AuthActionTypes.AUTH_LOGIN_SUCCESS, authInfo: auth },
          { type: UserActions.UserActionTypes.USER_GET_DATA, user: user }
        ]
      }),
      catchError(err => of({ type: AuthActions.AuthActionTypes.AUTH_LOGIN_ERROR, err: err }))
    ))
  ));

  /* logout */
  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.AUTH_LOGOUT),
    mergeMap(() => this.authService.logout().pipe(
      mergeMap(() => {
        return [
          { type: AuthActions.AuthActionTypes.AUTH_LOGOUT_SUCCESS },
          { type: UserActions.UserActionTypes.USER_RESET_DATA }
        ]
      }),
      catchError(err => of({ type: AuthActions.AuthActionTypes.AUTH_LOGOUT_ERROR, err: err }))
    ))
  ));

  /* send reset password email */
  sendResetPasswordEmail$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.AUTH_SEND_RESET_PASSWORD_EMAIL),
    mergeMap((action: { type: string, email: string }) => this.authService.sendResetPasswordEmail(action.email).pipe(
      map((res) => {
        console.log(res);
        return { type: AuthActions.AuthActionTypes.AUTH_SEND_RESET_PASSWORD_EMAIL_SUCCESS };
      }),
      catchError(err => of({ type: AuthActions.AuthActionTypes.AUTH_SEND_RESET_PASSWORD_EMAIL_ERROR, err: err }))
    ))
  ));

  /* send reset password email */
  resetPassword$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.AUTH_RESET_PASSWORD),
    mergeMap((action: { type: string, resetPassword: ResetPassword }) => this.authService.resetPassword(action.resetPassword).pipe(
      map((res) => {
        console.log(res);
        return { type: AuthActions.AuthActionTypes.AUTH_RESET_PASSWORD_SUCCESS };
      }),
      catchError(err => of({ type: AuthActions.AuthActionTypes.AUTH_RESET_PASSWORD_ERROR, err: err }))
    ))
  ));

  // login$ = createEffect(() => this.actions$.pipe(
  //   ofType(AuthActions.AuthActionTypes.AUTH_LOGIN),
  //   mergeMap((action: { type: string, loginInfo: Login }) => this.us.login(action.loginInfo).pipe(
  //     mergeMap(user => {
  //       const loginInfo: Login = { username: user.email, password: user.password };
  //       return [
  //         { type: AuthActions.AuthActionTypes.AUTH_LOGIN_SUCCESS, loginInfo: loginInfo },
  //         { type: UserActions.UserActionTypes.USER_SIGNIN, user: user }
  //       ]
  //     }),
  //     catchError(err => of({ type: AuthActions.AuthActionTypes.AUTH_LOGIN_ERROR, err: err }))
  //   ))
  // ));

  // logout$ = createEffect(() => this.actions$.pipe(
  //   ofType(AuthActions.AuthActionTypes.AUTH_LOGOUT),
  //   mergeMap((action: { type: string, user: User }) => this.us.logout(action.user).pipe(
  //     mergeMap(() => {
  //       return [
  //         { type: AuthActions.AuthActionTypes.AUTH_LOGOUT_SUCCESS },
  //         { type: UserActions.UserActionTypes.USER_SIGNOUT }
  //       ]
  //     }),
  //     catchError(err => of({ type: AuthActions.AuthActionTypes.AUTH_LOGOUT_ERROR, err: err }))
  //   ))
  // ));

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