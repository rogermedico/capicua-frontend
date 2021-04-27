import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { USER_DOCUMENTS } from '@constants/user-documents.constant';
import { UserDocument } from '@models/document.model';
import { User } from '@models/user.model';
import * as UserActions from '@modules/user/store/user.action';
import * as UserSelectors from '@modules/user/store/user.selector';
import { UserState } from '@modules/user/store/user.state';
import { Store } from '@ngrx/store';
import { NotificationService } from '@services/notification.service';
import { ParserService } from '@services/parser.service';
import { AppState } from '@store/root.state';
import { Observable, Subscription } from 'rxjs';
import { filter, map, skipWhile, take, tap } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-documents',
  templateUrl: './user-documents.component.html',
  styleUrls: ['./user-documents.component.scss']
})
export class UserDocumentsComponent implements OnInit {

  public user: User;
  public userDocumentsDisplayedColumns: string[] = ['name', 'actions'];
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public userStateSubscription: Subscription;
  public getDniSubscription: Subscription;
  public getOffensesSubscription: Subscription;
  public getCVSubscription: Subscription;
  public updateDniNotificationSubscription: Subscription;
  public updateOffensesNotificationSubscription: Subscription;
  public updateCVNotificationSubscription: Subscription;
  public editable: boolean = true;

  constructor(
    private store$: Store<AppState>,
    private dialog: MatDialog,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.userStateSubscription = this.userState$.pipe(
      filter(userState => {
        return userState != null;
      }),
      tap(userState => {
        this.user = userState.user;
        // if (this.user) {
        //   this.editable = this.user.userType.rank > userState.user.userType.rank || this.user.userType.id == userState.user.id;
        // }
      })
    ).subscribe();

  }

  ngOnDestroy(): void {
    this.userStateSubscription.unsubscribe();
    // if (this.getDniSubscription) this.getDniSubscription.unsubscribe();
    // if (this.getOffensesSubscription) this.getOffensesSubscription.unsubscribe();
    if (this.updateDniNotificationSubscription) this.updateDniNotificationSubscription.unsubscribe();
    if (this.updateOffensesNotificationSubscription) this.updateOffensesNotificationSubscription.unsubscribe();
    if (this.updateCVNotificationSubscription) this.updateCVNotificationSubscription.unsubscribe();

    // this.courseTypesSubscription.unsubscribe();
  }

  viewDocument(userDocument: UserDocument) {

    switch (userDocument.name) {
      case USER_DOCUMENTS.dni:
        const dni = this.user.userDocuments.find(userDocument => userDocument.name == USER_DOCUMENTS.dni);
        if (typeof dni.file != 'boolean') {
          window.open(dni.file, '_blank');
        }
        else {
          console.log('else?');
          this.store$.dispatch(UserActions.UserDniGet({ userId: this.user.id }));
          this.getDniSubscription = this.userState$.pipe(
            filter(us => {
              const dni = us.user.userDocuments.find(userDocument => userDocument.name == USER_DOCUMENTS.dni);
              console.log('return filter', typeof dni.file != 'boolean')
              return typeof dni.file != 'boolean';
            }),
            take(1),
            map(us => {
              console.log('user state', us);
              const dni = us.user.userDocuments.find(userDocument => userDocument.name == USER_DOCUMENTS.dni);
              window.open(<string>dni.file, '_blank');
            })
          ).subscribe();
        }
        break;
      case USER_DOCUMENTS.sexOffenseCertificate:
        const offenses = this.user.userDocuments.find(userDocument => userDocument.name == USER_DOCUMENTS.sexOffenseCertificate);
        if (typeof offenses.file != 'boolean') {
          window.open(offenses.file, '_blank');
        }
        else {
          this.store$.dispatch(UserActions.UserOffensesGet({ userId: this.user.id }));
          this.getOffensesSubscription = this.userState$.pipe(
            filter(us => {
              const offenses = us.user.userDocuments.find(userDocument => userDocument.name == USER_DOCUMENTS.sexOffenseCertificate);
              return typeof offenses.file != 'boolean';
            }),
            take(1),
            map(us => {
              const offenses = us.user.userDocuments.find(userDocument => userDocument.name == USER_DOCUMENTS.sexOffenseCertificate);
              window.open(<string>offenses.file, '_blank');
            })
          ).subscribe();
        }
        break;
      case USER_DOCUMENTS.cv:
        const cv = this.user.userDocuments.find(userDocument => userDocument.name == USER_DOCUMENTS.cv);
        if (typeof cv.file != 'boolean') {
          window.open(cv.file, '_blank');
        }
        else {
          this.store$.dispatch(UserActions.UserCVGet({ userId: this.user.id }));
          this.getCVSubscription = this.userState$.pipe(
            filter(us => {
              const cv = us.user.userDocuments.find(userDocument => userDocument.name == USER_DOCUMENTS.cv);
              return typeof cv.file != 'boolean';
            }),
            take(1),
            map(us => {
              const cv = us.user.userDocuments.find(userDocument => userDocument.name == USER_DOCUMENTS.cv);
              window.open(<string>cv.file, '_blank');
            })
          ).subscribe();
        }
        break;
    }
    // const dialogRef = this.dialog.open(EducationDialogComponent, {
    //   data: {
    //     name: education.name,
    //     finishDate: education.finishDate,
    //     finished: education.finished,
    //   },
    //   // width: '400px'
    // });

    // dialogRef.afterClosed().pipe(
    //   take(1),
    //   tap((result) => {
    //     if (result) {
    //       const editedEducation: Education = {
    //         id: education.id,
    //         name: result.name,
    //         finishDate: result.finishDate,
    //         finished: result.finished ? true : false
    //       };
    //       console.log(education)
    //       this.store$.dispatch(UserActions.UserEducationUpdate({ education: editedEducation }));
    //     }
    //   })
    // ).subscribe();
  }

  updateDocument(userDocument: UserDocument, fileInputEvent: any) {
    const userDocumentFile = fileInputEvent.target.files[0];
    switch (userDocument.name) {
      case USER_DOCUMENTS.dni:
        const dni = this.user.userDocuments.find(userDocument => userDocument.name == USER_DOCUMENTS.dni);
        if (typeof dni.file == 'boolean' && dni.file == true || typeof dni.file == 'string') {
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
              question: 'Are you sure you want to override the actual DNI file?'
            },
            width: '400px'
          });

          dialogRef.afterClosed().pipe(
            take(1),
            tap((result: boolean) => {
              if (result) {
                this.store$.dispatch(UserActions.UserDniUpdate({ dni: userDocumentFile }));
                this.updateDniNotificationSubscription = this.userState$.pipe(
                  skipWhile(userState => userState.loading),
                  take(1),
                  map(() => {
                    this.notificationService.showMessage('DNI file successfully updated', 'OK');
                  })
                ).subscribe()
              }
              else {
                this.updateDniNotificationSubscription = this.userState$.pipe(
                  skipWhile(userState => userState.loading),
                  take(1),
                  map(() => {
                    this.notificationService.showMessage('DNI file not updated', 'OK');
                  })
                ).subscribe()
              }
            })
          ).subscribe();
        }
        else {
          this.store$.dispatch(UserActions.UserDniUpdate({ dni: userDocumentFile }));
          this.updateDniNotificationSubscription = this.userState$.pipe(
            skipWhile(userState => userState.loading),
            take(1),
            map(() => {
              this.notificationService.showMessage('DNI file successfully updated', 'OK');
            })
          ).subscribe()
        }
        break;
      case USER_DOCUMENTS.sexOffenseCertificate:
        const offense = this.user.userDocuments.find(userDocument => userDocument.name == USER_DOCUMENTS.sexOffenseCertificate);
        if (typeof offense.file == 'boolean' && offense.file == true || typeof offense.file == 'string') {
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
              question: 'Are you sure you want to override the actual Offenses Certificate file?'
            },
            width: '400px'
          });

          dialogRef.afterClosed().pipe(
            take(1),
            tap((result: boolean) => {
              if (result) {
                this.store$.dispatch(UserActions.UserOffensesUpdate({ offenses: userDocumentFile }));
                this.updateOffensesNotificationSubscription = this.userState$.pipe(
                  skipWhile(userState => userState.loading),
                  take(1),
                  map(() => {
                    this.notificationService.showMessage('Offenses Certificate file successfully updated', 'OK');
                  })
                ).subscribe()
              }
              else {
                this.updateDniNotificationSubscription = this.userState$.pipe(
                  skipWhile(userState => userState.loading),
                  take(1),
                  map(() => {
                    this.notificationService.showMessage('Offenses Certificate file not updated', 'OK');
                  })
                ).subscribe()
              }
            })
          ).subscribe();
        }
        else {
          this.store$.dispatch(UserActions.UserOffensesUpdate({ offenses: userDocumentFile }));
          this.updateDniNotificationSubscription = this.userState$.pipe(
            skipWhile(userState => userState.loading),
            take(1),
            map(() => {
              this.notificationService.showMessage('Offenses Certificate file successfully updated', 'OK');
            })
          ).subscribe()
        }
        break;
      case USER_DOCUMENTS.cv:
        const cv = this.user.userDocuments.find(userDocument => userDocument.name == USER_DOCUMENTS.cv);
        if (typeof cv.file == 'boolean' && cv.file == true || typeof cv.file == 'string') {
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
              question: 'Are you sure you want to override the actual CV file?'
            },
            width: '400px'
          });

          dialogRef.afterClosed().pipe(
            take(1),
            tap((result: boolean) => {
              if (result) {
                this.store$.dispatch(UserActions.UserCVUpdate({ cv: userDocumentFile }));
                this.updateCVNotificationSubscription = this.userState$.pipe(
                  skipWhile(userState => userState.loading),
                  take(1),
                  map(() => {
                    this.notificationService.showMessage('CV file successfully updated', 'OK');
                  })
                ).subscribe()
              }
              else {
                this.updateCVNotificationSubscription = this.userState$.pipe(
                  skipWhile(userState => userState.loading),
                  take(1),
                  map(() => {
                    this.notificationService.showMessage('CV file not updated', 'OK');
                  })
                ).subscribe()
              }
            })
          ).subscribe();
        }
        else {
          this.store$.dispatch(UserActions.UserCVUpdate({ cv: userDocumentFile }));
          this.updateCVNotificationSubscription = this.userState$.pipe(
            skipWhile(userState => userState.loading),
            take(1),
            map(() => {
              this.notificationService.showMessage('CV file successfully updated', 'OK');
            })
          ).subscribe()
        }
        break;
    }
  }
}
