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

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private authService: AuthService) { }

  /* login */
  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.AUTH_LOGIN),
    mergeMap((action: { type: string, loginInfo: Login }) => this.authService.login(action.loginInfo).pipe(
      mergeMap(auth => {
        const user = this.parseUser(auth.user);
        return [
          { type: AuthActions.AuthActionTypes.AUTH_LOGIN_SUCCESS, authInfo: auth },
          { type: UserActions.UserActionTypes.USER_GET_DATA, user: user }
        ]
      }),
      catchError(err => of({ type: AuthActions.AuthActionTypes.AUTH_LOGIN_ERROR, err: err }))
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

  private parseUser(user): User {
    const parsedUser = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      userType: {
        name: user.user_type.name,
        rank: user.user_type.rank
      },
      dni: user.dni,
      birthDate: new Date(user.birth_date),
      address: {
        street: user.address_street,
        number: user.address_number,
        city: user.address_city,
        cp: user.address_cp,
        country: user.address_country
      },
      actualPosition: user.actual_position,
      phone: user.phone,
      courses: []
    }

    user.courses.forEach(course => {
      const parsedCourse: Course = {
        name: course.name,
        number: course.number,
        expeditionDate: course.expedition_date,
        validUntil: course.valid_until
      }
      parsedUser.courses.push(parsedCourse);
    });

    return parsedUser;
  }


}