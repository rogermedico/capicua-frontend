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
import { NotificationService } from '@services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Course } from '@models/course.model';
import { SafeResourceUrl } from '@angular/platform-browser';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions, private us: UserService, private notificationService: NotificationService) { }

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
          catchError(err => of({
            type: UserActions.UserActionTypes.USER_ERROR,
            origin: UserActions.UserActionTypes.USER_GET_DATA,
            err: err
          }))
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
    catchError(err => of({
      type: UserActions.UserActionTypes.USER_ERROR,
      origin: UserActions.UserActionTypes.USER_RESET_DATA,
      err: err
    }))
  ));

  /* update profile */
  updateProfileUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_PROFILE_UPDATE),
    mergeMap((action: { type: string, updatedProperties: { [key: string]: any } }) => this.us.editProfile(action.updatedProperties).pipe(
      map((updatedUser: User) => {
        console.log('updated profile', updatedUser);
        return { type: UserActions.UserActionTypes.USER_PROFILE_UPDATE_SUCCESS, updatedUser: updatedUser };
      }),
      catchError(err => of({
        type: UserActions.UserActionTypes.USER_ERROR,
        origin: UserActions.UserActionTypes.USER_PROFILE_UPDATE,
        err: err
      }))
    ))
  ));

  /* create course */
  usersCourseCreate$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_CREATE_COURSE),
    mergeMap((action: { type: string, course: Course }) => this.us.createCourse(action.course).pipe(
      map((data: { course: Course }) => {
        return { type: UserActions.UserActionTypes.USER_CREATE_COURSE_SUCCESS, course: data.course };
      }),
      catchError(err => of({
        type: UserActions.UserActionTypes.USER_ERROR,
        origin: UserActions.UserActionTypes.USER_CREATE_COURSE,
        err: err
      }))
    ))
  ));

  /* update course */
  usersCourseUpdate$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_UPDATE_COURSE),
    mergeMap((action: { type: string, course: Course }) => this.us.updateCourse(action.course).pipe(
      map((data: { course: Course }) => {
        return { type: UserActions.UserActionTypes.USER_UPDATE_COURSE_SUCCESS, course: data.course };
      }),
      catchError(err => of({
        type: UserActions.UserActionTypes.USER_ERROR,
        origin: UserActions.UserActionTypes.USER_UPDATE_COURSE,
        err: err
      }))
    ))
  ));

  /* delete course */
  usersCourseDelete$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_DELETE_COURSE),
    mergeMap((action: { type: string, courseId: number }) => this.us.deleteCourse(action.courseId).pipe(
      map((ids: { courseId: number }) => {
        return { type: UserActions.UserActionTypes.USER_DELETE_COURSE_SUCCESS, courseId: ids.courseId };
      }),
      catchError(err => of({
        type: UserActions.UserActionTypes.USER_ERROR,
        origin: UserActions.UserActionTypes.USER_DELETE_COURSE,
        err: err
      }))
    ))
  ));

  /* create education */
  usersEducationCreate$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_CREATE_EDUCATION),
    mergeMap((action: { type: string, education: Education }) => this.us.createEducation(action.education).pipe(
      map((data: { education: Education }) => {
        return { type: UserActions.UserActionTypes.USER_CREATE_EDUCATION_SUCCESS, education: data.education };
      }),
      catchError(err => of({
        type: UserActions.UserActionTypes.USER_ERROR,
        origin: UserActions.UserActionTypes.USER_CREATE_EDUCATION,
        err: err
      }))
    ))
  ));

  /* update education */
  usersEducationUpdate$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_UPDATE_EDUCATION),
    mergeMap((action: { type: string, education: Education }) => this.us.updateEducation(action.education).pipe(
      map((data: { education: Education }) => {
        return { type: UserActions.UserActionTypes.USER_UPDATE_EDUCATION_SUCCESS, education: data.education };
      }),
      catchError(err => of({
        type: UserActions.UserActionTypes.USER_ERROR,
        origin: UserActions.UserActionTypes.USER_UPDATE_EDUCATION,
        err: err
      }))
    ))
  ));

  /* delete education */
  usersEducationDelete$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_DELETE_EDUCATION),
    mergeMap((action: { type: string, educationId: number }) => this.us.deleteEducation(action.educationId).pipe(
      map((ids: { educationId: number }) => {
        return { type: UserActions.UserActionTypes.USER_DELETE_EDUCATION_SUCCESS, educationId: ids.educationId };
      }),
      catchError(err => of({
        type: UserActions.UserActionTypes.USER_ERROR,
        origin: UserActions.UserActionTypes.USER_DELETE_EDUCATION,
        err: err
      }))
    ))
  ));

  /* create language */
  usersLanguageCreate$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_CREATE_LANGUAGE),
    mergeMap((action: { type: string, language: Language }) => this.us.createLanguage(action.language).pipe(
      map((data: { language: Language }) => {
        return { type: UserActions.UserActionTypes.USER_CREATE_LANGUAGE_SUCCESS, language: data.language };
      }),
      catchError(err => of({
        type: UserActions.UserActionTypes.USER_ERROR,
        origin: UserActions.UserActionTypes.USER_CREATE_LANGUAGE,
        err: err
      }))
    ))
  ));

  /* update language */
  usersLanguageUpdate$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_UPDATE_LANGUAGE),
    mergeMap((action: { type: string, language: Language }) => this.us.updateLanguage(action.language).pipe(
      map((data: { language: Language }) => {
        return { type: UserActions.UserActionTypes.USER_UPDATE_LANGUAGE_SUCCESS, language: data.language };
      }),
      catchError(err => of({
        type: UserActions.UserActionTypes.USER_ERROR,
        origin: UserActions.UserActionTypes.USER_UPDATE_LANGUAGE,
        err: err
      }))
    ))
  ));

  /* delete language */
  usersLanguageDelete$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_DELETE_LANGUAGE),
    mergeMap((action: { type: string, languageId: number }) => this.us.deleteLanguage(action.languageId).pipe(
      map((ids: { languageId: number }) => {
        return { type: UserActions.UserActionTypes.USER_DELETE_LANGUAGE_SUCCESS, languageId: ids.languageId };
      }),
      catchError(err => of({
        type: UserActions.UserActionTypes.USER_ERROR,
        origin: UserActions.UserActionTypes.USER_DELETE_LANGUAGE,
        err: err
      }))
    ))
  ));

  /* update avatar */
  usersAvatarUpdate$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_UPDATE_AVATAR),
    mergeMap((action: { type: string, avatar: File }) => this.us.updateAvatar(action.avatar).pipe(
      map((data: { avatar: SafeResourceUrl }) => {
        return { type: UserActions.UserActionTypes.USER_UPDATE_AVATAR_SUCCESS, avatar: data.avatar };
      }),
      catchError(err => of({
        type: UserActions.UserActionTypes.USER_ERROR,
        origin: UserActions.UserActionTypes.USER_UPDATE_AVATAR,
        err: err
      }))
    ))
  ));

  /* delete avatar */
  usersAvatarDelete$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_DELETE_AVATAR),
    mergeMap(() => this.us.deleteAvatar().pipe(
      map(() => {
        return { type: UserActions.UserActionTypes.USER_DELETE_AVATAR_SUCCESS };
      }),
      catchError(err => of({
        type: UserActions.UserActionTypes.USER_ERROR,
        origin: UserActions.UserActionTypes.USER_DELETE_AVATAR,
        err: err
      }))
    ))
  ));

  /* get dni */
  getDni$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_GET_DNI),
    mergeMap((action: { type: string, userId: number }) => this.us.getDni(action.userId).pipe(
      map((data: { userId: number, dni: string }) => {
        return { type: UserActions.UserActionTypes.USER_GET_DNI_SUCCESS, dni: data.dni };
      }),
      catchError(err => of({
        type: UserActions.UserActionTypes.USER_ERROR,
        origin: UserActions.UserActionTypes.USER_GET_DNI,
        err: err
      }))
    ))
  ));

  /* update dni */
  updateDni$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_UPDATE_DNI),
    mergeMap((action: { type: string, dni: File }) => this.us.updateDni(action.dni).pipe(
      map((data: string) => {
        return { type: UserActions.UserActionTypes.USER_UPDATE_DNI_SUCCESS, dni: data };
      }),
      catchError(err => of({
        type: UserActions.UserActionTypes.USER_ERROR,
        origin: UserActions.UserActionTypes.USER_UPDATE_DNI,
        err: err
      }))
    ))
  ));

  /* get offenses */
  getOffenses$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_GET_OFFENSES),
    mergeMap((action: { type: string, userId: number }) => this.us.getOffenses(action.userId).pipe(
      map((data: { userId: number, offenses: string }) => {
        return { type: UserActions.UserActionTypes.USER_GET_OFFENSES_SUCCESS, offenses: data.offenses };
      }),
      catchError(err => of({
        type: UserActions.UserActionTypes.USER_ERROR,
        origin: UserActions.UserActionTypes.USER_GET_OFFENSES,
        err: err
      }))
    ))
  ));

  /* update offenses */
  updateOffenses$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_UPDATE_OFFENSES),
    mergeMap((action: { type: string, offenses: File }) => this.us.updateOffenses(action.offenses).pipe(
      map((data: string) => {
        return { type: UserActions.UserActionTypes.USER_UPDATE_OFFENSES_SUCCESS, offenses: data };
      }),
      catchError(err => of({
        type: UserActions.UserActionTypes.USER_ERROR,
        origin: UserActions.UserActionTypes.USER_UPDATE_OFFENSES,
        err: err
      }))
    ))
  ));

  /* change password  */
  changePassword$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_CHANGE_PASSWORD),
    mergeMap((action: { type: string, changePassword: ChangePassword }) => this.us.changePassword(action.changePassword).pipe(
      map(() => {
        return { type: UserActions.UserActionTypes.USER_CHANGE_PASSWORD_SUCCESS };
      }),
      catchError(err => of({
        type: UserActions.UserActionTypes.USER_ERROR,
        origin: UserActions.UserActionTypes.USER_CHANGE_PASSWORD,
        err: err
      }))
    ))
  ));

  /* get personal documents info  */
  getPersonalDocumentsInfo$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_GET_PERSONAL_DOCUMENTS_INFO),
    mergeMap((action: { type: string, userId: number }) => this.us.getPersonalDocumentsInfo(action.userId).pipe(
      map((personalDocuments) => {
        return { type: UserActions.UserActionTypes.USER_GET_PERSONAL_DOCUMENTS_INFO_SUCCESS, personalDocuments: personalDocuments };
      }),
      catchError(err => of({
        type: UserActions.UserActionTypes.USER_ERROR,
        origin: UserActions.UserActionTypes.USER_GET_PERSONAL_DOCUMENTS_INFO,
        err: err
      }))
    ))
  ));

  /* get personal document  */
  getPersonalDocument$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_GET_PERSONAL_DOCUMENT),
    mergeMap((action: { type: string, documentId: number }) => this.us.getPersonalDocument(action.documentId).pipe(
      map(doc => {
        return { type: UserActions.UserActionTypes.USER_GET_PERSONAL_DOCUMENT_SUCCESS, documentId: doc.documentId, personalDocument: doc.personalDocument };
      }),
      catchError(err => of({
        type: UserActions.UserActionTypes.USER_ERROR,
        origin: UserActions.UserActionTypes.USER_GET_PERSONAL_DOCUMENT,
        err: err
      }))
    ))
  ));

  /* error */
  error$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UserActionTypes.USER_ERROR),
    tap((action: { type: string, origin: UserActions.UserActionTypes, err: HttpErrorResponse }) => {
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