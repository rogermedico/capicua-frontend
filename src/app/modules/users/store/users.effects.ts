import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as UsersActions from './users.action';
import { UsersService } from '@modules/users/services/users.service';
import { NewUser, User } from '@models/user.model';
import { Language } from '@models/language.model';
import { Education } from '@models/education.model';
import { Login } from '@models/login.model';
import { ChangePassword } from '@models/change-password.model';
import { NotificationService } from '@services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Course } from '@models/course.model';
import { SafeResourceUrl } from '@angular/platform-browser';
import { PersonalDocument } from '@models/document.model';

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
    ofType(UsersActions.UsersActionTypes.USERS_EDIT),
    mergeMap((action: { type: string, userId: number, editedProperties: { [key: string]: any } }) => this.us.editUser(action.userId, action.editedProperties).pipe(
      map((editedUser: User) => {
        console.log(editedUser)
        return { type: UsersActions.UsersActionTypes.USERS_EDIT_SUCCESS, editedUser: editedUser };
      }),
      catchError(err => of({
        type: UsersActions.UsersActionTypes.USERS_ERROR,
        origin: UsersActions.UsersActionTypes.USERS_EDIT,
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

  /* get dni */
  getDni$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.USERS_GET_DNI),
    mergeMap((action: { type: string, userId: number }) => this.us.getDni(action.userId).pipe(
      map((data: { userId: number, dni: string }) => {
        return { type: UsersActions.UsersActionTypes.USERS_GET_DNI_SUCCESS, userId: data.userId, dni: data.dni };
      }),
      catchError(err => of({
        type: UsersActions.UsersActionTypes.USERS_ERROR,
        origin: UsersActions.UsersActionTypes.USERS_GET_DNI,
        err: err
      }))
    ))
  ));

  /* get offenses */
  getOffenses$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.USERS_GET_OFFENSES),
    mergeMap((action: { type: string, userId: number }) => this.us.getOffenses(action.userId).pipe(
      map((data: { userId: number, offenses: string }) => {
        return { type: UsersActions.UsersActionTypes.USERS_GET_OFFENSES_SUCCESS, userId: data.userId, offenses: data.offenses };
      }),
      catchError(err => of({
        type: UsersActions.UsersActionTypes.USERS_ERROR,
        origin: UsersActions.UsersActionTypes.USERS_GET_OFFENSES,
        err: err
      }))
    ))
  ));

  /* get cv */
  getCV$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.USERS_GET_CV),
    mergeMap((action: { type: string, userId: number }) => this.us.getCV(action.userId).pipe(
      map((data: { userId: number, cv: string }) => {
        return { type: UsersActions.UsersActionTypes.USERS_GET_CV_SUCCESS, userId: data.userId, cv: data.cv };
      }),
      catchError(err => of({
        type: UsersActions.UsersActionTypes.USERS_ERROR,
        origin: UsersActions.UsersActionTypes.USERS_GET_CV,
        err: err
      }))
    ))
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

  /* get all personal documents info  */
  getAllPersonalDocumentsInfo$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.USERS_GET_ALL_PERSONAL_DOCUMENTS_INFO),
    mergeMap(() => this.us.getAllPersonalDocumentsInfo().pipe(
      map((personalDocuments) => {
        return { type: UsersActions.UsersActionTypes.USERS_GET_ALL_PERSONAL_DOCUMENTS_INFO_SUCCESS, personalDocuments: personalDocuments };
      }),
      catchError(err => of({
        type: UsersActions.UsersActionTypes.USERS_ERROR,
        origin: UsersActions.UsersActionTypes.USERS_GET_ALL_PERSONAL_DOCUMENTS_INFO,
        err: err
      }))
    ))
  ));

  /* get personal document  */
  getPersonalDocument$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.USERS_GET_PERSONAL_DOCUMENT),
    mergeMap((action: { type: string, documentId: number }) => this.us.getPersonalDocument(action.documentId).pipe(
      map(doc => {
        return { type: UsersActions.UsersActionTypes.USERS_GET_PERSONAL_DOCUMENT_SUCCESS, userId: doc.userId, documentId: doc.documentId, personalDocument: doc.personalDocument };
      }),
      catchError(err => of({
        type: UsersActions.UsersActionTypes.USERS_ERROR,
        origin: UsersActions.UsersActionTypes.USERS_GET_PERSONAL_DOCUMENT,
        err: err
      }))
    ))
  ));

  /* add personal document  */
  addPersonalDocument$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.USERS_ADD_PERSONAL_DOCUMENT),
    mergeMap((action: { type: string, userId: number, document: File }) => this.us.addPersonalDocument(action.userId, action.document).pipe(
      map((personalDocument: PersonalDocument) => {
        return { type: UsersActions.UsersActionTypes.USERS_ADD_PERSONAL_DOCUMENT_SUCCESS, personalDocument: personalDocument };
      }),
      catchError(err => of({
        type: UsersActions.UsersActionTypes.USERS_ERROR,
        origin: UsersActions.UsersActionTypes.USERS_ADD_PERSONAL_DOCUMENT,
        err: err
      }))
    ))
  ));

  /* delete personal document  */
  deletePersonalDocument$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.USERS_DELETE_PERSONAL_DOCUMENT),
    mergeMap((action: { type: string, userId: number, documentId: number }) => this.us.deletePersonalDocument(action.userId, action.documentId).pipe(
      map(response => {
        return { type: UsersActions.UsersActionTypes.USERS_DELETE_PERSONAL_DOCUMENT_SUCCESS, userId: response.userId, documentId: response.documentId };
      }),
      catchError(err => of({
        type: UsersActions.UsersActionTypes.USERS_ERROR,
        origin: UsersActions.UsersActionTypes.USERS_DELETE_PERSONAL_DOCUMENT,
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
      console.log('USERS ERROR: ', {
        origin: action.origin,
        error: action.err
      });
    })
  ),
    { dispatch: false }
  );

}