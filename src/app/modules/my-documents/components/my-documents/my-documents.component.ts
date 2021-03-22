import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserState } from '@modules/user/store/user.state';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { Observable, Subscription } from 'rxjs';
import * as UserActions from '@modules/user/store/user.action';
import * as UserSelectors from '@modules/user/store/user.selector';
import { User } from '@models/user.model';
import { filter, map, skipWhile, take, tap } from 'rxjs/operators';
import { PersonalDocument } from '@models/document.model';

@Component({
  selector: 'app-my-documents',
  templateUrl: './my-documents.component.html',
  styleUrls: ['./my-documents.component.scss']
})
export class MyDocumentsComponent implements OnInit, OnDestroy {

  public user: User;
  public personalDocumentsDisplayedColumns: string[] = ['name', 'date', 'actions'];
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public usersStateSubscription: Subscription;
  public getPersonalDocumentSubscription: Subscription;

  constructor(
    private store$: Store<AppState>,

  ) { }

  ngOnInit(): void {

    this.usersStateSubscription = this.userState$.pipe(
      skipWhile(us => us.user == null),
      take(1),
      tap(us => {
        this.user = us.user;
        this.store$.dispatch(UserActions.UserGetPersonalDocumentsInfo({ userId: us.user.id }));
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.usersStateSubscription.unsubscribe();
    if (this.getPersonalDocumentSubscription) this.getPersonalDocumentSubscription.unsubscribe();
  }

  viewDocument(personalDocument: PersonalDocument) {

    if (personalDocument.file) {
      window.open(personalDocument.file, '_blank');
    }
    else {
      this.store$.dispatch(UserActions.UserGetPersonalDocument({ documentId: personalDocument.id }));
      this.getPersonalDocumentSubscription = this.userState$.pipe(
        filter(us => {
          const pd = us.user.personalDocuments.find(pd => pd.id == personalDocument.id);
          return pd.file != null;
        }),
        take(1),
        map(us => {
          const pd = us.user.personalDocuments.find(pd => pd.id == personalDocument.id);
          window.open(<string>pd.file, '_blank');
        })
      ).subscribe();
    }

  }

}
