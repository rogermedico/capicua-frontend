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

  /* update profile */
  updateProfileUser$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.USERS_PROFILE_UPDATE),
    mergeMap((action: { type: string, id: number, updatedProperties: { [key: string]: any } }) => this.us.editProfile(action.id, action.updatedProperties).pipe(
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

  /* create course */
  usersCourseCreate$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.USERS_CREATE_COURSE),
    mergeMap((action: { type: string, userId: number, course: Course }) => this.us.createCourse(action.userId, action.course).pipe(
      map((data: { userId: number, course: Course }) => {
        return { type: UsersActions.UsersActionTypes.USERS_CREATE_COURSE_SUCCESS, userId: data.userId, course: data.course };
      }),
      catchError(err => of({
        type: UsersActions.UsersActionTypes.USERS_ERROR,
        origin: UsersActions.UsersActionTypes.USERS_CREATE_COURSE,
        err: err
      }))
    ))
  ));

  /* update course */
  usersCourseUpdate$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.USERS_UPDATE_COURSE),
    mergeMap((action: { type: string, userId: number, course: Course }) => this.us.updateCourse(action.userId, action.course).pipe(
      map((data: { userId: number, course: Course }) => {
        return { type: UsersActions.UsersActionTypes.USERS_UPDATE_COURSE_SUCCESS, userId: data.userId, course: data.course };
      }),
      catchError(err => of({
        type: UsersActions.UsersActionTypes.USERS_ERROR,
        origin: UsersActions.UsersActionTypes.USERS_UPDATE_COURSE,
        err: err
      }))
    ))
  ));

  /* delete course */
  usersCourseDelete$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.USERS_DELETE_COURSE),
    mergeMap((action: { type: string, userId: number, courseId: number }) => this.us.deleteCourse(action.userId, action.courseId).pipe(
      map((ids: { userId: number, courseId: number }) => {
        return { type: UsersActions.UsersActionTypes.USERS_DELETE_COURSE_SUCCESS, userId: ids.userId, courseId: ids.courseId };
      }),
      catchError(err => of({
        type: UsersActions.UsersActionTypes.USERS_ERROR,
        origin: UsersActions.UsersActionTypes.USERS_DELETE_COURSE,
        err: err
      }))
    ))
  ));

  /* create education */
  usersEducationCreate$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.USERS_CREATE_EDUCATION),
    mergeMap((action: { type: string, userId: number, education: Education }) => this.us.createEducation(action.userId, action.education).pipe(
      map((data: { userId: number, education: Education }) => {
        return { type: UsersActions.UsersActionTypes.USERS_CREATE_EDUCATION_SUCCESS, userId: data.userId, education: data.education };
      }),
      catchError(err => of({
        type: UsersActions.UsersActionTypes.USERS_ERROR,
        origin: UsersActions.UsersActionTypes.USERS_CREATE_EDUCATION,
        err: err
      }))
    ))
  ));

  /* update education */
  usersEducationUpdate$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.USERS_UPDATE_EDUCATION),
    mergeMap((action: { type: string, userId: number, education: Education }) => this.us.updateEducation(action.userId, action.education).pipe(
      map((data: { userId: number, education: Education }) => {
        return { type: UsersActions.UsersActionTypes.USERS_UPDATE_EDUCATION_SUCCESS, userId: data.userId, education: data.education };
      }),
      catchError(err => of({
        type: UsersActions.UsersActionTypes.USERS_ERROR,
        origin: UsersActions.UsersActionTypes.USERS_UPDATE_EDUCATION,
        err: err
      }))
    ))
  ));

  /* delete education */
  usersEducationDelete$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.USERS_DELETE_EDUCATION),
    mergeMap((action: { type: string, userId: number, educationId: number }) => this.us.deleteEducation(action.userId, action.educationId).pipe(
      map((ids: { userId: number, educationId: number }) => {
        return { type: UsersActions.UsersActionTypes.USERS_DELETE_EDUCATION_SUCCESS, userId: ids.userId, educationId: ids.educationId };
      }),
      catchError(err => of({
        type: UsersActions.UsersActionTypes.USERS_ERROR,
        origin: UsersActions.UsersActionTypes.USERS_DELETE_EDUCATION,
        err: err
      }))
    ))
  ));

  /* create language */
  usersLanguageCreate$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.USERS_CREATE_LANGUAGE),
    mergeMap((action: { type: string, userId: number, language: Language }) => this.us.createLanguage(action.userId, action.language).pipe(
      map((data: { userId: number, language: Language }) => {
        return { type: UsersActions.UsersActionTypes.USERS_CREATE_LANGUAGE_SUCCESS, userId: data.userId, language: data.language };
      }),
      catchError(err => of({
        type: UsersActions.UsersActionTypes.USERS_ERROR,
        origin: UsersActions.UsersActionTypes.USERS_CREATE_LANGUAGE,
        err: err
      }))
    ))
  ));

  /* update language */
  usersLanguageUpdate$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.USERS_UPDATE_LANGUAGE),
    mergeMap((action: { type: string, userId: number, language: Language }) => this.us.updateLanguage(action.userId, action.language).pipe(
      map((data: { userId: number, language: Language }) => {
        return { type: UsersActions.UsersActionTypes.USERS_UPDATE_LANGUAGE_SUCCESS, userId: data.userId, language: data.language };
      }),
      catchError(err => of({
        type: UsersActions.UsersActionTypes.USERS_ERROR,
        origin: UsersActions.UsersActionTypes.USERS_UPDATE_LANGUAGE,
        err: err
      }))
    ))
  ));

  /* delete language */
  usersLanguageDelete$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.USERS_DELETE_LANGUAGE),
    mergeMap((action: { type: string, userId: number, languageId: number }) => this.us.deleteLanguage(action.userId, action.languageId).pipe(
      map((ids: { userId: number, languageId: number }) => {
        return { type: UsersActions.UsersActionTypes.USERS_DELETE_LANGUAGE_SUCCESS, userId: ids.userId, languageId: ids.languageId };
      }),
      catchError(err => of({
        type: UsersActions.UsersActionTypes.USERS_ERROR,
        origin: UsersActions.UsersActionTypes.USERS_DELETE_LANGUAGE,
        err: err
      }))
    ))
  ));



  /* update avatar */
  usersAvatarUpdate$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.USERS_UPDATE_AVATAR),
    mergeMap((action: { type: string, userId: number, avatar: File }) => this.us.updateAvatar(action.userId, action.avatar).pipe(
      map((data: { userId: number, avatar: SafeResourceUrl }) => {
        return { type: UsersActions.UsersActionTypes.USERS_UPDATE_AVATAR_SUCCESS, userId: data.userId, avatar: data.avatar };
      }),
      catchError(err => of({
        type: UsersActions.UsersActionTypes.USERS_ERROR,
        origin: UsersActions.UsersActionTypes.USERS_UPDATE_AVATAR,
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

  /* delete language */
  usersAvatarDelete$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.USERS_DELETE_AVATAR),
    mergeMap((action: { type: string, userId: number }) => this.us.deleteAvatar(action.userId).pipe(
      map((ids: { userId: number }) => {
        return { type: UsersActions.UsersActionTypes.USERS_DELETE_AVATAR_SUCCESS, userId: ids.userId };
      }),
      catchError(err => of({
        type: UsersActions.UsersActionTypes.USERS_ERROR,
        origin: UsersActions.UsersActionTypes.USERS_DELETE_AVATAR,
        err: err
      }))
    ))
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
      console.log('USER ERROR: ', {
        origin: action.origin,
        error: action.err
      });
    })
  ),
    { dispatch: false }
  );

}