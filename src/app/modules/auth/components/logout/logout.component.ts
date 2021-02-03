import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '@store/root.state';
import { Store } from '@ngrx/store';
import * as AuthActions from '@modules/auth/store/auth.action';
import * as AuthSelectors from '@modules/auth/store/auth.selector';
import { Observable, Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AuthState } from '@modules/auth/store/auth.state';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit, OnDestroy {

  public authState$: Observable<AuthState> = this.store$.select(AuthSelectors.selectAuthState);
  private authSubscription: Subscription;

  constructor(private store$: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.authSubscription = this.authState$.pipe(
      take(1),
      filter(as => as.authInfo !== null),
      map(as => {
        console.log('asdf')
        this.store$.dispatch(AuthActions.AuthLogout())
      })
    ).subscribe();

    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}
