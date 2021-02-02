import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { Login } from '@models/login.model';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import * as AuthActions from '../../store/auth.action';
import * as AuthSelectors from '../../store/auth.selector';
import { Observable, Subscription } from 'rxjs';
import { delay, map, skipWhile } from 'rxjs/operators';
import { UserState } from '@modules/user/store/user.state';
import { AuthState } from "@modules/auth/store/auth.state";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {

  public forgotPasswordForm: FormGroup;

  constructor(private store$: Store<AppState>, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.forgotPasswordForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  sendResetPasswordEmail() {

    const email: string = this.email.value;

    this.store$.dispatch(AuthActions.AuthSendResetPasswordEmail({ email: email }));
    this.router.navigateByUrl('/auth/login');


  }

  get email() { return this.forgotPasswordForm.get('email'); }

}
