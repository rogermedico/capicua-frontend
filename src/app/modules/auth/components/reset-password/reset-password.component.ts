import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Params, Router } from '@angular/router';
import { ResetPassword } from '@models/reset-password.model';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { passwordsValidator } from '@validators/passwords.validator';
import { Observable, Subscription } from 'rxjs';
import * as AuthActions from '../../store/auth.action';
import * as RouterSelectors from '@store/router/router.selector';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  public resetPasswordForm: FormGroup;
  public RouteParams$: Observable<Params> = this.store$.select(RouterSelectors.selectParams);
  public routeParamsSubscription: Subscription;
  public email: string;
  public token: string;

  constructor(private store$: Store<AppState>, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.routeParamsSubscription = this.RouteParams$.subscribe(routeParams => {
      this.email = routeParams.queryParams.email;
      this.token = routeParams.params.token;
    });
    this.createForm();
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription.unsubscribe();
  }

  createForm() {
    this.resetPasswordForm = this.fb.group({
      password: [null, [Validators.required, Validators.minLength(8)]],
      passwordConfirmation: [null, [Validators.required, Validators.minLength(8)]]
    }, {
      validators: passwordsValidator
    });
  }

  passwordReset() {

    if (this.email && this.token) {
      const resetPassword: ResetPassword = {
        email: this.email,
        password: this.password.value,
        passwordConfirmation: this.passwordConfirmation.value,
        token: this.token,
      };
      this.store$.dispatch(AuthActions.AuthResetPassword({ resetPassword: resetPassword }));
    }
    this.router.navigateByUrl('/auth/login');

  }

  get password() { return this.resetPasswordForm.get('password'); }

  get passwordConfirmation() { return this.resetPasswordForm.get('passwordConfirmation'); }

}