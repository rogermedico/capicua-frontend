import { Component, OnInit } from '@angular/core';
import { USER_DOCUMENTS } from '@constants/user-documents.constant';
import { UserDocument } from '@models/document.model';
import { User } from '@models/user.model';
import * as UsersSelectors from '@modules/users/store/users.selector';
import * as UsersActions from '@modules/users/store/users.action';
import * as RouterSelectors from '@store/router/router.selector';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { UsersState } from '@modules/users/store/users.state';
import { Params } from '@angular/router';

@Component({
  selector: 'app-view-user-documents',
  templateUrl: './view-user-documents.component.html',
  styleUrls: ['./view-user-documents.component.scss']
})
export class ViewUserDocumentsComponent implements OnInit {

  public user: User;
  public userDocumentsDisplayedColumns: string[] = ['name', 'actions'];
  public usersState$: Observable<UsersState> = this.store$.select(UsersSelectors.selectUsersState);
  public routeParams$: Observable<Params> = this.store$.select(RouterSelectors.selectParams);
  public routeParamsUsersStateSubscription: Subscription;
  public getDniSubscription: Subscription;
  public getOffensesSubscription: Subscription;
  public getCVSubscription: Subscription;
  public userDocuments: UserDocument[];
  public editable: boolean = true;

  constructor(private store$: Store<AppState>) { }

  ngOnInit(): void {

    this.routeParamsUsersStateSubscription = combineLatest([this.routeParams$, this.usersState$]).pipe(
      filter(([routeParams, usersState]) => usersState.users != null),
      tap(([routeParams, usersState]) => {
        this.user = usersState.users.find(user => user.id == routeParams.params.id);
        if (this.user) this.userDocuments = this.user.userDocuments.filter(userDocument => userDocument.file != false);
      })
    ).subscribe();

  }

  ngOnDestroy(): void {
    this.routeParamsUsersStateSubscription.unsubscribe();
    if (this.getDniSubscription) this.getDniSubscription.unsubscribe();
    if (this.getOffensesSubscription) this.getOffensesSubscription.unsubscribe();
    if (this.getCVSubscription) this.getCVSubscription.unsubscribe();
  }

  viewDocument(userDocument: UserDocument) {

    switch (userDocument.name) {
      case USER_DOCUMENTS.dni:
        const dni = this.user.userDocuments.find(userDocument => userDocument.name == USER_DOCUMENTS.dni);
        if (typeof dni.file != 'boolean') {
          window.open(dni.file, '_blank');
        }
        else {
          this.store$.dispatch(UsersActions.UsersDniGet({ userId: this.user.id }));
          this.getDniSubscription = this.usersState$.pipe(
            filter(us => {
              const dni = us.users.find(u => u.id == this.user.id).userDocuments.find(userDocument => userDocument.name == USER_DOCUMENTS.dni);
              return typeof dni.file != 'boolean';
            }),
            take(1),
            map(us => {
              const dni = us.users.find(u => u.id == this.user.id).userDocuments.find(userDocument => userDocument.name == USER_DOCUMENTS.dni);
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
          this.store$.dispatch(UsersActions.UsersOffensesGet({ userId: this.user.id }));
          this.getOffensesSubscription = this.usersState$.pipe(
            filter(us => {
              const offenses = us.users.find(u => u.id == this.user.id).userDocuments.find(userDocument => userDocument.name == USER_DOCUMENTS.sexOffenseCertificate);
              return typeof offenses.file != 'boolean';
            }),
            take(1),
            map(us => {
              const offenses = us.users.find(u => u.id == this.user.id).userDocuments.find(userDocument => userDocument.name == USER_DOCUMENTS.sexOffenseCertificate);
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
          this.store$.dispatch(UsersActions.UsersCVGet({ userId: this.user.id }));
          this.getCVSubscription = this.usersState$.pipe(
            filter(us => {
              const cv = us.users.find(u => u.id == this.user.id).userDocuments.find(userDocument => userDocument.name == USER_DOCUMENTS.cv);
              return typeof cv.file != 'boolean';
            }),
            take(1),
            map(us => {
              const cv = us.users.find(u => u.id == this.user.id).userDocuments.find(userDocument => userDocument.name == USER_DOCUMENTS.cv);
              window.open(<string>cv.file, '_blank');
            })
          ).subscribe();
        }
        break;
    }
  }

}
