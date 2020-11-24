import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '@store/root.state';
import { Store } from '@ngrx/store';
import * as AuthActions from '@store/auth/auth.action';
import * as UserSelectors from '@store/user/user.selector';
import { Observable, Subscription } from 'rxjs';
import { User } from '@models/user.model';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit, OnDestroy {

  public userLoggedIn$: Observable<User> = this.store$.select(UserSelectors.selectUser);
  private userSubscription: Subscription;

  constructor(private store$: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.userSubscription = this.userLoggedIn$.pipe(
      take(1),
      map(user => {
        this.store$.dispatch(AuthActions.AuthLogout({ user: user }))
      })
    ).subscribe();

    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
