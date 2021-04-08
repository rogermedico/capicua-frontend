import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as HomeActions from './home.action';
import { HomeService } from '@modules/home/services/home.service';
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
import { PersonalDocument } from '@models/document.model';
import { HomePost } from '@models/home-post.model';

@Injectable()
export class HomeEffects {

  constructor(private actions$: Actions, private us: HomeService, private notificationService: NotificationService) { }

  /* get all posts */
  getAll$ = createEffect(() => this.actions$.pipe(
    ofType(HomeActions.HomeActionTypes.HOME_GET_ALL),
    mergeMap(() => this.us.getPosts().pipe(
      map((homePosts: HomePost[]) => {
        return { type: HomeActions.HomeActionTypes.HOME_GET_ALL_SUCCESS, homePosts: homePosts };
      }),
      catchError(err => of({
        type: HomeActions.HomeActionTypes.HOME_ERROR,
        origin: HomeActions.HomeActionTypes.HOME_GET_ALL,
        err: err
      }))
    ))
  ));

  /* reset data */
  resetData$ = createEffect(() => this.actions$.pipe(
    ofType(HomeActions.HomeActionTypes.HOME_RESET),
    map(() => {
      return { type: HomeActions.HomeActionTypes.HOME_RESET_SUCCESS };
    }),
    catchError(err => of({
      type: HomeActions.HomeActionTypes.HOME_ERROR,
      origin: HomeActions.HomeActionTypes.HOME_RESET,
      err: err
    }))
  ));

  // /* create new user */
  // createUser$ = createEffect(() => this.actions$.pipe(
  //   ofType(HomeActions.HomeActionTypes.HOME_CREATE),
  //   mergeMap((action: { type: string, newUser: NewUser }) => this.us.newUser(action.newUser).pipe(
  //     map((user: User) => {
  //       return { type: HomeActions.HomeActionTypes.HOME_CREATE_SUCCESS, user: user };
  //     }),
  //     catchError(err => of({
  //       type: HomeActions.HomeActionTypes.HOME_ERROR,
  //       origin: HomeActions.HomeActionTypes.HOME_CREATE,
  //       err: err
  //     }))
  //   ))
  // ));

  // /* edit user */
  // editUser$ = createEffect(() => this.actions$.pipe(
  //   ofType(HomeActions.HomeActionTypes.HOME_EDIT),
  //   mergeMap((action: { type: string, userId: number, editedProperties: { [key: string]: any } }) => this.us.editUser(action.userId, action.editedProperties).pipe(
  //     map((editedUser: User) => {
  //       console.log(editedUser)
  //       return { type: HomeActions.HomeActionTypes.HOME_EDIT_SUCCESS, editedUser: editedUser };
  //     }),
  //     catchError(err => of({
  //       type: HomeActions.HomeActionTypes.HOME_ERROR,
  //       origin: HomeActions.HomeActionTypes.HOME_EDIT,
  //       err: err
  //     }))
  //   ))
  // ));

  // /* get avatar */
  // usersAvatarGet$ = createEffect(() => this.actions$.pipe(
  //   ofType(HomeActions.HomeActionTypes.HOME_GET_AVATAR),
  //   mergeMap((action: { type: string, userId: number }) => {
  //     return this.us.getAvatar(action.userId).pipe(
  //       // map(a => { console.log(a); return null })
  //       map((data: { userId: number, avatar: SafeResourceUrl }) => {
  //         console.log(data);
  //         return { type: HomeActions.HomeActionTypes.HOME_GET_AVATAR_SUCCESS, userId: data.userId, avatar: data.avatar };
  //       }),
  //       catchError(err => of({
  //         type: HomeActions.HomeActionTypes.HOME_ERROR,
  //         origin: HomeActions.HomeActionTypes.HOME_GET_AVATAR,
  //         err: err
  //       }))
  //     )
  //   })
  // ));

  // /* get dni */
  // getDni$ = createEffect(() => this.actions$.pipe(
  //   ofType(HomeActions.HomeActionTypes.HOME_GET_DNI),
  //   mergeMap((action: { type: string, userId: number }) => this.us.getDni(action.userId).pipe(
  //     map((data: { userId: number, dni: string }) => {
  //       return { type: HomeActions.HomeActionTypes.HOME_GET_DNI_SUCCESS, userId: data.userId, dni: data.dni };
  //     }),
  //     catchError(err => of({
  //       type: HomeActions.HomeActionTypes.HOME_ERROR,
  //       origin: HomeActions.HomeActionTypes.HOME_GET_DNI,
  //       err: err
  //     }))
  //   ))
  // ));

  // /* get offenses */
  // getOffenses$ = createEffect(() => this.actions$.pipe(
  //   ofType(HomeActions.HomeActionTypes.HOME_GET_OFFENSES),
  //   mergeMap((action: { type: string, userId: number }) => this.us.getOffenses(action.userId).pipe(
  //     map((data: { userId: number, offenses: string }) => {
  //       return { type: HomeActions.HomeActionTypes.HOME_GET_OFFENSES_SUCCESS, userId: data.userId, offenses: data.offenses };
  //     }),
  //     catchError(err => of({
  //       type: HomeActions.HomeActionTypes.HOME_ERROR,
  //       origin: HomeActions.HomeActionTypes.HOME_GET_OFFENSES,
  //       err: err
  //     }))
  //   ))
  // ));

  // /* activate user */
  // activateUser$ = createEffect(() => this.actions$.pipe(
  //   ofType(HomeActions.HomeActionTypes.HOME_ACTIVATE),
  //   mergeMap((action: { type: string, userId: number }) => this.us.activateUser(action.userId).pipe(
  //     // map(a => { console.log(a); return null })
  //     map((data: { userId: number }) => {
  //       console.log(data);
  //       return { type: HomeActions.HomeActionTypes.HOME_ACTIVATE_SUCCESS, userId: data.userId };
  //     }),
  //     catchError(err => of({
  //       type: HomeActions.HomeActionTypes.HOME_ERROR,
  //       origin: HomeActions.HomeActionTypes.HOME_ACTIVATE,
  //       err: err
  //     }))
  //   )
  //   )
  // ));

  // /* deactivate user */
  // deactivateUser$ = createEffect(() => this.actions$.pipe(
  //   ofType(HomeActions.HomeActionTypes.HOME_DEACTIVATE),
  //   mergeMap((action: { type: string, userId: number }) => this.us.deactivateUser(action.userId).pipe(
  //     // map(a => { console.log(a); return null })
  //     map((data: { userId: number }) => {
  //       console.log(data);
  //       return { type: HomeActions.HomeActionTypes.HOME_DEACTIVATE_SUCCESS, userId: data.userId };
  //     }),
  //     catchError(err => of({
  //       type: HomeActions.HomeActionTypes.HOME_ERROR,
  //       origin: HomeActions.HomeActionTypes.HOME_DEACTIVATE,
  //       err: err
  //     }))
  //   )
  //   )
  // ));

  // /* delete user */
  // deleteUser$ = createEffect(() => this.actions$.pipe(
  //   ofType(HomeActions.HomeActionTypes.HOME_DELETE),
  //   mergeMap((action: { type: string, userId: number }) => this.us.deleteUser(action.userId).pipe(
  //     // map(a => { console.log(a); return null })
  //     map((data: { userId: number }) => {
  //       console.log(data);
  //       return { type: HomeActions.HomeActionTypes.HOME_DELETE_SUCCESS, userId: data.userId };
  //     }),
  //     catchError(err => of({
  //       type: HomeActions.HomeActionTypes.HOME_ERROR,
  //       origin: HomeActions.HomeActionTypes.HOME_DELETE,
  //       err: err
  //     }))
  //   )
  //   )
  // ));

  // /* get all personal documents info  */
  // getAllPersonalDocumentsInfo$ = createEffect(() => this.actions$.pipe(
  //   ofType(HomeActions.HomeActionTypes.HOME_GET_ALL_PERSONAL_DOCUMENTS_INFO),
  //   mergeMap(() => this.us.getAllPersonalDocumentsInfo().pipe(
  //     map((personalDocuments) => {
  //       return { type: HomeActions.HomeActionTypes.HOME_GET_ALL_PERSONAL_DOCUMENTS_INFO_SUCCESS, personalDocuments: personalDocuments };
  //     }),
  //     catchError(err => of({
  //       type: HomeActions.HomeActionTypes.HOME_ERROR,
  //       origin: HomeActions.HomeActionTypes.HOME_GET_ALL_PERSONAL_DOCUMENTS_INFO,
  //       err: err
  //     }))
  //   ))
  // ));

  // /* get personal document  */
  // getPersonalDocument$ = createEffect(() => this.actions$.pipe(
  //   ofType(HomeActions.HomeActionTypes.HOME_GET_PERSONAL_DOCUMENT),
  //   mergeMap((action: { type: string, documentId: number }) => this.us.getPersonalDocument(action.documentId).pipe(
  //     map(doc => {
  //       return { type: HomeActions.HomeActionTypes.HOME_GET_PERSONAL_DOCUMENT_SUCCESS, userId: doc.userId, documentId: doc.documentId, personalDocument: doc.personalDocument };
  //     }),
  //     catchError(err => of({
  //       type: HomeActions.HomeActionTypes.HOME_ERROR,
  //       origin: HomeActions.HomeActionTypes.HOME_GET_PERSONAL_DOCUMENT,
  //       err: err
  //     }))
  //   ))
  // ));

  // /* add personal document  */
  // addPersonalDocument$ = createEffect(() => this.actions$.pipe(
  //   ofType(HomeActions.HomeActionTypes.HOME_ADD_PERSONAL_DOCUMENT),
  //   mergeMap((action: { type: string, userId: number, document: File }) => this.us.addPersonalDocument(action.userId, action.document).pipe(
  //     map((personalDocument: PersonalDocument) => {
  //       return { type: HomeActions.HomeActionTypes.HOME_ADD_PERSONAL_DOCUMENT_SUCCESS, personalDocument: personalDocument };
  //     }),
  //     catchError(err => of({
  //       type: HomeActions.HomeActionTypes.HOME_ERROR,
  //       origin: HomeActions.HomeActionTypes.HOME_ADD_PERSONAL_DOCUMENT,
  //       err: err
  //     }))
  //   ))
  // ));

  // /* delete personal document  */
  // deletePersonalDocument$ = createEffect(() => this.actions$.pipe(
  //   ofType(HomeActions.HomeActionTypes.HOME_DELETE_PERSONAL_DOCUMENT),
  //   mergeMap((action: { type: string, userId: number, documentId: number }) => this.us.deletePersonalDocument(action.userId, action.documentId).pipe(
  //     map(response => {
  //       return { type: HomeActions.HomeActionTypes.HOME_DELETE_PERSONAL_DOCUMENT_SUCCESS, userId: response.userId, documentId: response.documentId };
  //     }),
  //     catchError(err => of({
  //       type: HomeActions.HomeActionTypes.HOME_ERROR,
  //       origin: HomeActions.HomeActionTypes.HOME_DELETE_PERSONAL_DOCUMENT,
  //       err: err
  //     }))
  //   ))
  // ));

  /* error */
  error$ = createEffect(() => this.actions$.pipe(
    ofType(HomeActions.HomeActionTypes.HOME_ERROR),
    tap((action: { type: string, origin: HomeActions.HomeActionTypes, err: HttpErrorResponse }) => {
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
      console.log('HOME ERROR: ', {
        origin: action.origin,
        error: action.err
      });
    })
  ),
    { dispatch: false }
  );

}