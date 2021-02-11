import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as AuthActions from './auth.action';
import * as UserActions from '@modules/user/store/user.action';
import { Login } from '@models/login.model';
import { AuthService } from '../services/auth.service';
import { Auth } from '@models/auth.model';
import { ResetPassword } from '@models/reset-password.model';
import { VerifyEmail } from '@models/verify-email.model';
import { NotificationService } from '@services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as UsersActions from '@modules/users/store/users.action';
import * as UserTypesActions from '@store/user-types/user-types.action';

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private authService: AuthService, private notificationService: NotificationService) { }

  /* login */
  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.AUTH_LOGIN),
    mergeMap((action: { type: string, loginInfo: Login }) => this.authService.login(action.loginInfo).pipe(
      mergeMap((auth: Auth) => {
        return [
          { type: AuthActions.AuthActionTypes.AUTH_LOGIN_SUCCESS, authInfo: auth },
          { type: UserActions.UserActionTypes.USER_GET_DATA },
          { type: UserTypesActions.UserTypesActionTypes.USER_TYPES_GET_ALL },
        ]
      }),
      catchError(err => of({
        type: AuthActions.AuthActionTypes.AUTH_ERROR,
        origin: AuthActions.AuthActionTypes.AUTH_LOGIN,
        err: err
      }))
    ))
  ));

  /* logout */
  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.AUTH_LOGOUT),
    mergeMap(() => this.authService.logout().pipe(
      mergeMap(() => {
        return [
          { type: AuthActions.AuthActionTypes.AUTH_LOGOUT_SUCCESS },
          { type: UserActions.UserActionTypes.USER_RESET_DATA },
          { type: UsersActions.UsersActionTypes.USERS_RESET },
          { type: UserTypesActions.UserTypesActionTypes.USER_TYPES_RESET },
        ]
      }),
      catchError(err => of({
        type: AuthActions.AuthActionTypes.AUTH_ERROR,
        origin: AuthActions.AuthActionTypes.AUTH_LOGOUT,
        err: err
      }))
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
      catchError(err => of({
        type: AuthActions.AuthActionTypes.AUTH_ERROR,
        origin: AuthActions.AuthActionTypes.AUTH_SEND_RESET_PASSWORD_EMAIL,
        err: err
      }))
    ))
  ));

  /* reset password */
  resetPassword$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.AUTH_RESET_PASSWORD),
    mergeMap((action: { type: string, resetPassword: ResetPassword }) => this.authService.resetPassword(action.resetPassword).pipe(
      map((res) => {
        console.log(res);
        return { type: AuthActions.AuthActionTypes.AUTH_RESET_PASSWORD_SUCCESS };
      }),
      catchError(err => of({
        type: AuthActions.AuthActionTypes.AUTH_ERROR,
        origin: AuthActions.AuthActionTypes.AUTH_RESET_PASSWORD,
        err: err
      }))
    ))
  ));

  /* send verification email */
  sendVerificationEmail$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.AUTH_SEND_VERIFICATION_EMAIL),
    mergeMap(() => this.authService.sendVerificationEmail().pipe(
      map((res) => {
        return { type: AuthActions.AuthActionTypes.AUTH_SEND_VERIFICATION_EMAIL_SUCCESS };
      }),
      catchError(err => of({
        type: AuthActions.AuthActionTypes.AUTH_ERROR,
        origin: AuthActions.AuthActionTypes.AUTH_SEND_VERIFICATION_EMAIL,
        err: err
      }))
    ))
  ));

  /* verify email */
  verifyEmail$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.AUTH_VERIFY_EMAIL),
    mergeMap((action: { type: string, verifyEmail: VerifyEmail }) => this.authService.verifyEmail(action.verifyEmail).pipe(
      map((res) => {
        console.log(res)
        return { type: AuthActions.AuthActionTypes.AUTH_VERIFY_EMAIL_SUCCESS };
      }),
      catchError(err => of({
        type: AuthActions.AuthActionTypes.AUTH_ERROR,
        origin: AuthActions.AuthActionTypes.AUTH_VERIFY_EMAIL,
        err: err
      }))
    ))
  ));

  error$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.AUTH_ERROR),
    tap((action: { type: string, origin: AuthActions.AuthActionTypes, err: HttpErrorResponse }) => {
      switch (action.err.status) {
        case 400:
          this.notificationService.showError(action.err.error.message, 'OK');
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
      console.log('AUTH ERROR: ', {
        origin: action.origin,
        error: action.err
      });
    })
  ),
    { dispatch: false }
  );

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