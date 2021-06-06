import { Component, OnInit } from '@angular/core';
import { UserState } from '@modules/user/store/user.state';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { combineLatest, Observable, Subscription } from 'rxjs';
import * as UsersActions from '@modules/users/store/users.action';
import * as UsersSelectors from '@modules/users/store/users.selector';
import * as UserSelectors from '@modules/user/store/user.selector';
import * as RouterSelectors from '@store/router/router.selector';
import { User } from '@models/user.model';
import { filter, map, take, tap } from 'rxjs/operators';
import { PersonalDocument } from '@models/document.model';
import { Params } from '@angular/router';
import { UsersState } from '@modules/users/store/users.state';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-view-documents',
  templateUrl: './view-documents.component.html',
  styleUrls: ['./view-documents.component.scss']
})
export class ViewDocumentsComponent implements OnInit {

  public userId: number;
  public user: User;
  public personalDocumentsDisplayedColumns: string[] = ['name', 'date', 'actions'];
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public usersState$: Observable<UsersState> = this.store$.select(UsersSelectors.selectUsersState);
  public routeParams$: Observable<Params> = this.store$.select(RouterSelectors.selectParams);
  public routeParamsSubscription: Subscription;
  public usersStateSubscription: Subscription;
  public getPersonalDocumentSubscription: Subscription;
  public personalDocuments: PersonalDocument[];
  public deletable: boolean;

  constructor(
    private store$: Store<AppState>,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.routeParamsSubscription = this.routeParams$.pipe(
      take(1),
      map(routeParams => this.userId = routeParams.params.id)
    ).subscribe();

    this.usersStateSubscription = combineLatest([this.usersState$, this.userState$]).pipe(
      filter(([usersState, userState]) => usersState.users != null && userState.user != null),
      tap(([usersState, userState]) => {
        this.user = usersState.users.find(user => user.id == this.userId);
        this.deletable = this.user.userType.rank > userState.user.userType.rank || userState.user.userType.rank == 1;
        this.personalDocuments = this.user.personalDocuments.slice().sort((a, b) => (a.createdAt > b.createdAt) ? -1 : ((b.createdAt > a.createdAt) ? 1 : 0));
      })
    ).subscribe();

  }

  ngOnDestroy(): void {
    this.routeParamsSubscription.unsubscribe();
    this.usersStateSubscription.unsubscribe();
    if (this.getPersonalDocumentSubscription) this.getPersonalDocumentSubscription.unsubscribe();
  }

  viewPersonalDocument(personalDocument: PersonalDocument) {
    if (personalDocument.file) {
      window.open(personalDocument.file, '_blank');
    }
    else {
      this.store$.dispatch(UsersActions.UsersGetPersonalDocument({ documentId: personalDocument.id }));
      this.getPersonalDocumentSubscription = this.usersState$.pipe(
        filter(us => {
          const user = us.users.find(user => user.id == this.user.id);
          const pd = user.personalDocuments.find(pd => pd.id == personalDocument.id);
          return pd.file != null;
        }),
        take(1),
        map(us => {
          const user = us.users.find(user => user.id == this.user.id);
          const pd = user.personalDocuments.find(pd => pd.id == personalDocument.id);
          window.open(<string>pd.file, '_blank');
        })
      ).subscribe();
    }
  }

  deletePersonalDocument(personalDocument: PersonalDocument): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        question: 'Are you sure you want to permanently delete the following document:',
        element: personalDocument.name
      },
      width: '400px'
    });

    dialogRef.afterClosed().pipe(
      take(1),
      tap((result: boolean) => {
        if (result) {
          this.store$.dispatch(UsersActions.UsersDeletePersonalDocument({ userId: this.user.id, documentId: personalDocument.id }));
        }
      })
    ).subscribe();
  }

}
