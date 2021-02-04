import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as UserActions from './user.action';
import { UserService } from '@modules/user/services/user.service';
import { User } from '@models/user.model';
import { Language } from '@models/language.model';
import { Education } from '@models/education.model';
import { ActivitiesFavoritesService } from '@services/activities-favorites.service';
import { Login } from '@models/login.model';
import { ChangePassword } from '@models/change-password.model';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions, private us: UserService, private favService: ActivitiesFavoritesService) { }

  /* get data */
  getData$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_GET_DATA),
    mergeMap((action: { type: string, user: User }) => {
      if (action.user) return of({ type: UserActions.UserActionTypes.USER_GET_DATA_SUCCESS, user: action.user });
      else {
        return this.us.getUser().pipe(
          map(user => {
            return { type: UserActions.UserActionTypes.USER_GET_DATA_SUCCESS, user: user };
          }),
          catchError(err => of({ type: UserActions.UserActionTypes.USER_GET_DATA_ERROR, err: err }))
        )
      }
    })
  ));

  /* reset data */
  resetData$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_RESET_DATA),
    map(() => {
      return { type: UserActions.UserActionTypes.USER_RESET_DATA_SUCCESS };
    }),
    catchError(err => of({ type: UserActions.UserActionTypes.USER_RESET_DATA_ERROR, err: err }))
  ));

  /* change password  */
  changePassword$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_CHANGE_PASSWORD),
    mergeMap((action: { type: string, changePassword: ChangePassword }) => this.us.changePassword(action.changePassword).pipe(
      map(() => {
        return { type: UserActions.UserActionTypes.USER_CHANGE_PASSWORD_SUCCESS };
      }),
      catchError(err => of({ type: UserActions.UserActionTypes.USER_CHANGE_PASSWORD_ERROR, err: err }))
    ))
  ));

  // /* login */
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
  // logout$ = createEffect(() => this.actions$.pipe(
  //   ofType(UserActions.UserActionTypes.USER_LOGOUT),
  //   mergeMap((action: { type: string, user: User }) => this.us.logout(action.user).pipe(
  //     map(() => {
  //       return { type: UserActions.UserActionTypes.USER_LOGOUT_SUCCESS }
  //     }),
  //     catchError(err => of({ type: UserActions.UserActionTypes.USER_LOGOUT_ERROR, err: err }))
  //   ))
  // ));

  /* logout */
  // logout$ = createEffect(() => this.actions$.pipe(
  //   ofType(AuthActions.AuthActionTypes.AUTH_LOGOUT),
  //   mergeMap((action: { type: string, user: User }) => this.us.logout(action.user).pipe(
  //     mergeMap(() => {
  //       return [
  //         { type: AuthActions.AuthActionTypes.AUTH_LOGOUT_SUCCESS },
  //         { type: UserActions.UserActionTypes.USER_LOGOUT }
  //       ]
  //     }),
  //     catchError(err => of({ type: AuthActions.AuthActionTypes.AUTH_LOGOUT_ERROR, err: err }))
  //   ))
  // ));


  /* register */
  // register$ = createEffect(() => this.actions$.pipe(
  //   ofType(UserActions.UserActionTypes.USER_REGISTER),
  //   mergeMap((action: { type: string, user: User }) => this.us.register(action.user).pipe(
  //     map(user => {
  //       return { type: UserActions.UserActionTypes.USER_REGISTER_SUCCESS, user: user }
  //     }),
  //     catchError(err => of({ type: UserActions.UserActionTypes.USER_REGISTER_ERROR, err: err }))
  //   ))
  // ));

  // /* modify personal data */
  // modifyPersonalData$ = createEffect(() => this.actions$.pipe(
  //   ofType(UserActions.UserActionTypes.USER_MODIFY_PERSONAL_DATA),
  //   map(() => {
  //     return { type: UserActions.UserActionTypes.USER_MODIFY_PERSONAL_DATA_SUCCESS }
  //   }),
  //   catchError(err => of({ type: UserActions.UserActionTypes.USER_MODIFY_PERSONAL_DATA_ERROR, err: err }))
  // ));

  // /* discard personal data changes*/
  // discardPersonalDataChanges$ = createEffect(() => this.actions$.pipe(
  //   ofType(UserActions.UserActionTypes.USER_DISCARD_PERSONAL_DATA_CHANGES),
  //   map(() => {
  //     return { type: UserActions.UserActionTypes.USER_DISCARD_PERSONAL_DATA_CHANGES_SUCCESS }
  //   }),
  //   catchError(err => of({ type: UserActions.UserActionTypes.USER_DISCARD_PERSONAL_DATA_CHANGES_ERROR, err: err }))
  // ));

  // /* update personal data */
  // updatePersonalData$ = createEffect(() => this.actions$.pipe(
  //   ofType(UserActions.UserActionTypes.USER_UPDATE_PERSONAL_DATA),
  //   mergeMap((action: { type: string, user: User }) => this.us.updateUser(action.user).pipe(
  //     map(() => {
  //       return { type: UserActions.UserActionTypes.USER_UPDATE_PERSONAL_DATA_SUCCESS, user: action.user }
  //     }),
  //     catchError(err => of({ type: UserActions.UserActionTypes.USER_UPDATE_PERSONAL_DATA_ERROR, err: err }))
  //   ))
  // ));

  // /* create language */
  // createLanguage$ = createEffect(() => this.actions$.pipe(
  //   ofType(UserActions.UserActionTypes.USER_CREATE_LANGUAGE),
  //   mergeMap((action: { type: string, user: User, language: Language }) => {
  //     const updatedUser = { ...action.user, languages: [...action.user.languages, action.language] };
  //     return this.us.updateUser(updatedUser).pipe(
  //       map(() => {
  //         return { type: UserActions.UserActionTypes.USER_CREATE_LANGUAGE_SUCCESS, user: updatedUser }
  //       }),
  //       catchError(err => of({ type: UserActions.UserActionTypes.USER_CREATE_LANGUAGE_ERROR, err: err }))
  //     )
  //   })
  // ));

  // /* update language */
  // updateLanguage$ = createEffect(() => this.actions$.pipe(
  //   ofType(UserActions.UserActionTypes.USER_UPDATE_LANGUAGE),
  //   mergeMap((action: { type: string, user: User, oldLanguage: Language, newLanguage: Language }) => {
  //     const updatedUser = {
  //       ...action.user,
  //       languages: action.user.languages.map(l => {
  //         if (l === action.oldLanguage) return action.newLanguage;
  //         else return l;
  //       })
  //     };
  //     return this.us.updateUser(updatedUser).pipe(
  //       map(() => {
  //         return { type: UserActions.UserActionTypes.USER_UPDATE_LANGUAGE_SUCCESS, user: updatedUser }
  //       }),
  //       catchError(err => of({ type: UserActions.UserActionTypes.USER_UPDATE_LANGUAGE_ERROR, err: err }))
  //     )
  //   })
  // ));

  // /* delete language */
  // deleteLanguage$ = createEffect(() => this.actions$.pipe(
  //   ofType(UserActions.UserActionTypes.USER_DELETE_LANGUAGE),
  //   mergeMap((action: { type: string, user: User, language: Language }) => {
  //     const updatedUser = { ...action.user, languages: action.user.languages.filter(lang => lang !== action.language) };
  //     return this.us.updateUser(updatedUser).pipe(
  //       map(() => {
  //         return { type: UserActions.UserActionTypes.USER_DELETE_LANGUAGE_SUCCESS, user: updatedUser }
  //       }),
  //       catchError(err => of({ type: UserActions.UserActionTypes.USER_DELETE_LANGUAGE_ERROR, err: err }))
  //     )
  //   })
  // ));

  // /* create education */
  // createEducation$ = createEffect(() => this.actions$.pipe(
  //   ofType(UserActions.UserActionTypes.USER_CREATE_EDUCATION),
  //   mergeMap((action: { type: string, user: User, education: Education }) => {
  //     const updatedUser = { ...action.user, education: [...action.user.education, action.education] };
  //     return this.us.updateUser(updatedUser).pipe(
  //       map(() => {
  //         return { type: UserActions.UserActionTypes.USER_CREATE_EDUCATION_SUCCESS, user: updatedUser }
  //       }),
  //       catchError(err => of({ type: UserActions.UserActionTypes.USER_CREATE_EDUCATION_ERROR, err: err }))
  //     )
  //   })
  // ));

  // /* update education */
  // updateEducation$ = createEffect(() => this.actions$.pipe(
  //   ofType(UserActions.UserActionTypes.USER_UPDATE_EDUCATION),
  //   mergeMap((action: { type: string, user: User, oldEducation: Education, newEducation: Education }) => {
  //     const updatedUser = {
  //       ...action.user,
  //       education: action.user.education.map(e => {
  //         if (e === action.oldEducation) return action.newEducation;
  //         else return e;
  //       })
  //     };
  //     return this.us.updateUser(updatedUser).pipe(
  //       map(() => {
  //         return { type: UserActions.UserActionTypes.USER_UPDATE_EDUCATION_SUCCESS, user: updatedUser }
  //       }),
  //       catchError(err => of({ type: UserActions.UserActionTypes.USER_UPDATE_EDUCATION_ERROR, err: err }))
  //     )
  //   })
  // ));

  // /* delete education */
  // deleteEducation$ = createEffect(() => this.actions$.pipe(
  //   ofType(UserActions.UserActionTypes.USER_DELETE_EDUCATION),
  //   mergeMap((action: { type: string, user: User, education: Education }) => {
  //     const updatedUser = { ...action.user, education: action.user.education.filter(e => e !== action.education) };
  //     return this.us.updateUser(updatedUser).pipe(
  //       map(() => {
  //         return { type: UserActions.UserActionTypes.USER_DELETE_EDUCATION_SUCCESS, user: updatedUser }
  //       }),
  //       catchError(err => of({ type: UserActions.UserActionTypes.USER_DELETE_EDUCATION_ERROR, err: err }))
  //     )
  //   })
  // ));

  // /* load favorite activities */
  // loadFavoriteActivities$ = createEffect(() => this.actions$.pipe(
  //   ofType(UserActions.UserActionTypes.USER_LOAD_FAVORITE_ACTIVITIES),
  //   mergeMap((action: { type: string, user: User }) => {
  //     return this.favService.loadFavorites(action.user).pipe(
  //       map(favoriteActivities => {
  //         return { type: UserActions.UserActionTypes.USER_LOAD_FAVORITE_ACTIVITIES_SUCCESS, favoriteActivities: favoriteActivities }
  //       }),
  //       catchError(err => of({ type: UserActions.UserActionTypes.USER_LOAD_FAVORITE_ACTIVITIES_ERROR, err: err }))
  //     )
  //   })
  // ));

  // /* toggle favorite activity */
  // toggleFavoriteActivity$ = createEffect(() => this.actions$.pipe(
  //   ofType(UserActions.UserActionTypes.USER_TOGGLE_FAVORITE_ACTIVITY),
  //   mergeMap((action: { type: string, user: User, activityId: number }) => {
  //     return this.favService.toggleFavorite(action.user, action.activityId).pipe(
  //       map(favoriteActivities => {
  //         return { type: UserActions.UserActionTypes.USER_TOGGLE_FAVORITE_ACTIVITY_SUCCESS, favoriteActivities: favoriteActivities }
  //       }),
  //       catchError(err => of({ type: UserActions.UserActionTypes.USER_TOGGLE_FAVORITE_ACTIVITY_ERROR, err: err }))
  //     )
  //   })
  // ));
}