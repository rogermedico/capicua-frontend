import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '@store/root.state';
import { Store } from '@ngrx/store';
import * as UserActions from '@store/user/user.action';
import * as UserSelectors from '@store/user/user.selector';
import { Observable, Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { UserState } from '@store/user/user.state';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit, OnDestroy {

  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  private userSubscription: Subscription;

  constructor(private store$: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.userSubscription = this.userState$.pipe(
      take(1),
      filter(us => us.user !== null),
      map(us => {
        console.log('logout dispatch', us);
        this.store$.dispatch(UserActions.UserLogout({ user: us.user }))
      })
    ).subscribe();

    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
