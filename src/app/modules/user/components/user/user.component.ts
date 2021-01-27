import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { Observable, Subscription } from 'rxjs';
import * as UserSelectors from '@modules/user/store/user.selector'
import { UserState } from '@modules/user/store/user.state';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  public user: User;
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public userStateSubscriber: Subscription;
  public coursesDisplayedColumns: string[] = ['name', 'number', 'expeditionDate', 'validUntil'];

  constructor(private store$: Store<AppState>) { }

  ngOnInit(): void {
    this.userStateSubscriber = this.userState$.pipe(
      take(1),
      tap(userState => this.user = userState.user),
      tap(us => console.log('user', us.user))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.userStateSubscriber.unsubscribe();
  }

}
