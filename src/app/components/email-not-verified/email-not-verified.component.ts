import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import * as AuthActions from '@modules/auth/store/auth.action';
import * as AuthSelectors from '@modules/auth/store/auth.selector';
import { Observable, Subscription } from 'rxjs';
import { AuthState } from '@modules/auth/store/auth.state';
import { map, skipWhile, take } from 'rxjs/operators';
import { NotificationService } from '@services/notification.service';


@Component({
  selector: 'app-email-not-verified',
  templateUrl: './email-not-verified.component.html',
  styleUrls: ['./email-not-verified.component.scss']
})
export class EmailNotVerifiedComponent implements OnInit, OnDestroy {

  public buttonText: string;
  public authState$: Observable<AuthState> = this.store$.select(AuthSelectors.selectAuthState);
  private authStateSubscription: Subscription;

  constructor(
    private store$: Store<AppState>,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.buttonText = 'Send verification email';
  }

  ngOnDestroy(): void {
    if (this.authStateSubscription) this.authStateSubscription.unsubscribe();
  }

  sendVerificationEmail() {
    this.store$.dispatch(AuthActions.AuthSendVerificationEmail());
    this.authStateSubscription = this.authState$.pipe(
      skipWhile(as => as.loading),
      take(1),
      map(() => {
        this.notificationService.showMessage('Verification email sent', 'OK');
        this.buttonText = 'Resend verification email';
      })
    ).subscribe()
  }

}
