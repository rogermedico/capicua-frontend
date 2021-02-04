import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthState } from '@modules/auth/store/auth.state';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { passwordsEqualityValidator } from '@validators/passwords-equality.validator';
import { Observable, Subscription } from 'rxjs';
import * as AuthSelectors from '@modules/auth/store/auth.selector';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  public authState$: Observable<AuthState> = this.store$.select(AuthSelectors.selectAuthState);
  public authStateSubscription: Subscription;

  constructor(private store$: Store<AppState>, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.changePasswordForm = this.fb.group({
      oldPassword: [null, [
        Validators.required,
        Validators.minLength(8)
      ]],
      password: [null, [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!¡?¿"·$%&\/\(\)\\\\<>+*=\'_\-]).{8,}')
      ]],
      passwordConfirmation: [null, [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!¡?¿"·$%&\/\(\)\\\\<>+*=\'_\-]).{8,}')
      ]]
    }, {
      validators: passwordsEqualityValidator
    });
  }

  changePassword() {
    console.log(this.changePasswordForm)
  }

  get oldPassword() { return this.changePasswordForm.get('password'); }

  get password() { return this.changePasswordForm.get('password'); }

  get passwordConfirmation() { return this.changePasswordForm.get('passwordConfirmation'); }

}
