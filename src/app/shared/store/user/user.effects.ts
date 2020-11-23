import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as UserActions from './user.action';
import { UserService } from '@services/user.service';
import { User } from '@models/user.model';
import { Language } from '@models/language.model';
import { Education } from '@models/education.model';
import { ActivitiesFavoritesService } from '@services/activities-favorites.service';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions, private us: UserService, private favService: ActivitiesFavoritesService) { }

  /* signin */
  signin$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_SIGNIN),
    map((action: { type: string, user: User }) => {
      return { type: UserActions.UserActionTypes.USER_SIGNIN_SUCCESS, user: action.user };
    }),
    catchError(err => of({ type: UserActions.UserActionTypes.USER_SIGNIN_ERROR, err: err }))
  ));


  /* signout */
  logout$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_SIGNOUT),
    map(() => {
      return { type: UserActions.UserActionTypes.USER_SIGNOUT_SUCCESS }
    }),
    catchError(err => of({ type: UserActions.UserActionTypes.USER_SIGNOUT_ERROR, err: err }))
  ));

  /* modify personal data */
  modifyPersonalData$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_MODIFY_PERSONAL_DATA),
    map(() => {
      return { type: UserActions.UserActionTypes.USER_MODIFY_PERSONAL_DATA_SUCCESS }
    }),
    catchError(err => of({ type: UserActions.UserActionTypes.USER_MODIFY_PERSONAL_DATA_ERROR, err: err }))
  ));

  /* discard personal data changes*/
  discardPersonalDataChanges$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_DISCARD_PERSONAL_DATA_CHANGES),
    map(() => {
      return { type: UserActions.UserActionTypes.USER_DISCARD_PERSONAL_DATA_CHANGES_SUCCESS }
    }),
    catchError(err => of({ type: UserActions.UserActionTypes.USER_DISCARD_PERSONAL_DATA_CHANGES_ERROR, err: err }))
  ));

  /* update personal data */
  updatePersonalData$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_UPDATE_PERSONAL_DATA),
    mergeMap((action: { type: string, user: User }) => this.us.updateUser(action.user).pipe(
      map(() => {
        return { type: UserActions.UserActionTypes.USER_UPDATE_PERSONAL_DATA_SUCCESS, user: action.user }
      }),
      catchError(err => of({ type: UserActions.UserActionTypes.USER_UPDATE_PERSONAL_DATA_ERROR, err: err }))
    ))
  ));

  /* create language */
  createLanguage$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_CREATE_LANGUAGE),
    mergeMap((action: { type: string, user: User, language: Language }) => {
      const updatedUser = { ...action.user, languages: [...action.user.languages, action.language] };
      return this.us.updateUser(updatedUser).pipe(
        map(() => {
          return { type: UserActions.UserActionTypes.USER_CREATE_LANGUAGE_SUCCESS, user: updatedUser }
        }),
        catchError(err => of({ type: UserActions.UserActionTypes.USER_CREATE_LANGUAGE_ERROR, err: err }))
      )
    })
  ));

  /* update language */
  updateLanguage$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_UPDATE_LANGUAGE),
    mergeMap((action: { type: string, user: User, oldLanguage: Language, newLanguage: Language }) => {
      const updatedUser = {
        ...action.user,
        languages: action.user.languages.map(l => {
          if (l === action.oldLanguage) return action.newLanguage;
          else return l;
        })
      };
      return this.us.updateUser(updatedUser).pipe(
        map(() => {
          return { type: UserActions.UserActionTypes.USER_UPDATE_LANGUAGE_SUCCESS, user: updatedUser }
        }),
        catchError(err => of({ type: UserActions.UserActionTypes.USER_UPDATE_LANGUAGE_ERROR, err: err }))
      )
    })
  ));

  /* delete language */
  deleteLanguage$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_DELETE_LANGUAGE),
    mergeMap((action: { type: string, user: User, language: Language }) => {
      const updatedUser = { ...action.user, languages: action.user.languages.filter(lang => lang !== action.language) };
      return this.us.updateUser(updatedUser).pipe(
        map(() => {
          return { type: UserActions.UserActionTypes.USER_DELETE_LANGUAGE_SUCCESS, user: updatedUser }
        }),
        catchError(err => of({ type: UserActions.UserActionTypes.USER_DELETE_LANGUAGE_ERROR, err: err }))
      )
    })
  ));

  /* create education */
  createEducation$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_CREATE_EDUCATION),
    mergeMap((action: { type: string, user: User, education: Education }) => {
      const updatedUser = { ...action.user, education: [...action.user.education, action.education] };
      return this.us.updateUser(updatedUser).pipe(
        map(() => {
          return { type: UserActions.UserActionTypes.USER_CREATE_EDUCATION_SUCCESS, user: updatedUser }
        }),
        catchError(err => of({ type: UserActions.UserActionTypes.USER_CREATE_EDUCATION_ERROR, err: err }))
      )
    })
  ));

  /* update education */
  updateEducation$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_UPDATE_EDUCATION),
    mergeMap((action: { type: string, user: User, oldEducation: Education, newEducation: Education }) => {
      const updatedUser = {
        ...action.user,
        education: action.user.education.map(e => {
          if (e === action.oldEducation) return action.newEducation;
          else return e;
        })
      };
      return this.us.updateUser(updatedUser).pipe(
        map(() => {
          return { type: UserActions.UserActionTypes.USER_UPDATE_EDUCATION_SUCCESS, user: updatedUser }
        }),
        catchError(err => of({ type: UserActions.UserActionTypes.USER_UPDATE_EDUCATION_ERROR, err: err }))
      )
    })
  ));

  /* delete education */
  deleteEducation$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_DELETE_EDUCATION),
    mergeMap((action: { type: string, user: User, education: Education }) => {
      const updatedUser = { ...action.user, education: action.user.education.filter(e => e !== action.education) };
      return this.us.updateUser(updatedUser).pipe(
        map(() => {
          return { type: UserActions.UserActionTypes.USER_DELETE_EDUCATION_SUCCESS, user: updatedUser }
        }),
        catchError(err => of({ type: UserActions.UserActionTypes.USER_DELETE_EDUCATION_ERROR, err: err }))
      )
    })
  ));

  /* load favorite activities */
  loadFavoriteActivities$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_LOAD_FAVORITE_ACTIVITIES),
    mergeMap((action: { type: string, user: User }) => {
      return this.favService.loadFavorites(action.user).pipe(
        map(favoriteActivities => {
          return { type: UserActions.UserActionTypes.USER_LOAD_FAVORITE_ACTIVITIES_SUCCESS, favoriteActivities: favoriteActivities }
        }),
        catchError(err => of({ type: UserActions.UserActionTypes.USER_LOAD_FAVORITE_ACTIVITIES_ERROR, err: err }))
      )
    })
  ));

  /* toggle favorite activity */
  toggleFavoriteActivity$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_TOGGLE_FAVORITE_ACTIVITY),
    mergeMap((action: { type: string, user: User, activityId: number }) => {
      return this.favService.toggleFavorite(action.user, action.activityId).pipe(
        map(favoriteActivities => {
          return { type: UserActions.UserActionTypes.USER_TOGGLE_FAVORITE_ACTIVITY_SUCCESS, favoriteActivities: favoriteActivities }
        }),
        catchError(err => of({ type: UserActions.UserActionTypes.USER_TOGGLE_FAVORITE_ACTIVITY_ERROR, err: err }))
      )
    })
  ));
}