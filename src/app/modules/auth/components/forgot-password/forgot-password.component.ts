import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import * as AuthActions from '../../store/auth.action';
import * as AuthSelectors from '../../store/auth.selector';
import { Observable, Subscription } from 'rxjs';
import { map, skipWhile } from 'rxjs/operators';
import { AuthState } from "@modules/auth/store/auth.state";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  public forgotPasswordForm: FormGroup;
  public authState$: Observable<AuthState> = this.store$.select(AuthSelectors.selectAuthState);
  public authStateSubscription: Subscription;

  constructor(
    private store$: Store<AppState>,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void {
    if (this.authStateSubscription) this.authStateSubscription.unsubscribe();
  }

  createForm() {
    this.forgotPasswordForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  sendResetPasswordEmail() {

    const email: string = this.email.value;

    this.store$.dispatch(AuthActions.AuthSendResetPasswordEmail({ email: email }));
    this.authStateSubscription = this.authState$.pipe(
      skipWhile(as => as.loading),
      map(() => this.router.navigateByUrl('/auth/login'))
    ).subscribe()

  }

  get email() { return this.forgotPasswordForm.get('email'); }

}
