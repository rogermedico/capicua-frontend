import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Login } from '@models/login.model';
import { Observable, Subscription, timer } from 'rxjs';
import { Auth } from '@models/auth.model';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { ResetPassword } from '@models/reset-password.model';
import { VerifyEmail } from '@models/verify-email.model';
import { Router } from '@angular/router';
import { AuthState } from '../store/auth.state';
import { AppState } from '@store/root.state';
import { Store } from '@ngrx/store';
import * as AuthSelectors from '@modules/auth/store/auth.selector';
import * as AuthActions from '@modules/auth/store/auth.action';
import { ConfirmDialogComponent } from '../components/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MARGIN_TIME_TO_AVOID_TOKEN_EXPIRATION, TIME_BETWEEN_PROMPT_AND_LOGOUT } from '@constants/timers.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authState$: Observable<AuthState> = this.store$.select(AuthSelectors.selectAuthState);
  public accessToken$: Observable<string> = this.store$.select(AuthSelectors.selectAccessToken);
  public authStateSubscription: Subscription;
  public renewTokenSubscription: Subscription;
  public noticeDisconection: Subscription;
  public logoutTimerSubscription: Subscription;
  public authInfo: Auth;
  public tokenExpiresAt: Date = null;
  public dialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store$: Store<AppState>,
    private dialog: MatDialog
  ) { }

  login(loginInfo: Login): Observable<Auth> {
    const body = {
      email: loginInfo.username,
      password: loginInfo.password
    }

    this.authStateSubscription = this.authState$.pipe(
      filter(as => as.authInfo != null),
      map(as => {
        this.authInfo = as.authInfo;
        if (!this.noticeDisconection) this.startTimer();
      })
    ).subscribe();

    return this.http.post<Auth>(environment.backend.api + environment.backend.loginEndpoint, body);
  }

  logout(): Observable<any> {
    this.authStateSubscription.unsubscribe();
    if (this.noticeDisconection) {
      this.noticeDisconection.unsubscribe();
      this.noticeDisconection = null;
    }
    return this.http.post(environment.backend.api + environment.backend.logoutEndpoint, null);
  }

  sendResetPasswordEmail(email: string): Observable<any> {
    const body = {
      email: email
    }
    return this.http.post(environment.backend.api + environment.backend.forgotPasswordEndpoint, body);
  }

  resetPassword(resetPassword: ResetPassword): Observable<any> {
    const body = {
      email: resetPassword.email,
      password: resetPassword.password,
      password_confirmation: resetPassword.passwordConfirmation,
      token: resetPassword.token

    }
    return this.http.post(environment.backend.api + environment.backend.resetPasswordEndpoint, body);
  }

  sendVerificationEmail() {
    return this.http.get(`${environment.backend.api}${environment.backend.verifyEmailEndpoint}`);
  }

  verifyEmail(verifyEmail: VerifyEmail): Observable<any> {
    return this.http.get(`${environment.backend.api}${environment.backend.verifyEmailEndpoint}/${verifyEmail.id}/${verifyEmail.hash}`);
  }

  renewToken(): Observable<Auth> {
    return this.http.get<Auth>(environment.backend.api + environment.backend.renewTokenEndpoint);
  }

  private startTimer() {
    this.noticeDisconection = timer((this.authInfo.expiresIn - TIME_BETWEEN_PROMPT_AND_LOGOUT - MARGIN_TIME_TO_AVOID_TOKEN_EXPIRATION) * 1000).pipe(
      map(miliseconds => {

        this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
          data: {
            question: 'Intranet will automatically disconect in 5 minutes, press OK to stay.',
          },
          width: '400px',
          disableClose: true,
        });

        this.logoutTimerSubscription = timer(TIME_BETWEEN_PROMPT_AND_LOGOUT * 1000).pipe(
          switchMap(() => {
            this.dialogRef.close('CLOSED_BY_AUTOMATICALLY_LOGOUT');
            this.authStateSubscription.unsubscribe();
            if (this.noticeDisconection) {
              this.noticeDisconection.unsubscribe();
              this.noticeDisconection = null;
            }
            this.store$.dispatch(AuthActions.AuthLogout());
            return this.authState$.pipe()
          })
        ).subscribe(() => this.router.navigate(['']));


        this.dialogRef.afterClosed().pipe(
          take(1),
          filter(result => result != 'CLOSED_BY_AUTOMATICALLY_LOGOUT'),
          tap((result) => {
            this.logoutTimerSubscription.unsubscribe();
            this.store$.dispatch(AuthActions.AuthRenewToken());
            this.startTimer();
          })
        ).subscribe();

      })
    ).subscribe();
  }

}
