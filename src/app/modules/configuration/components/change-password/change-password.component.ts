import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { passwordsEqualityValidator } from '@validators/passwords-equality.validator';
import { Observable, Subscription } from 'rxjs';
import * as UserSelectors from '@modules/user/store/user.selector';
import * as UserActions from '@modules/user/store/user.action';
import { ChangePassword } from '@models/change-password.model';
import { UserState } from '@modules/user/store/user.state';
import { map, skipWhile, take } from 'rxjs/operators';
import { NotificationService } from '@services/notification.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  changePasswordForm: FormGroup;
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public userStateSubscription: Subscription;

  constructor(
    private store$: Store<AppState>,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void {
    if (this.userStateSubscription) this.userStateSubscription.unsubscribe();
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
    const changePassword: ChangePassword = {
      oldPassword: this.oldPassword.value,
      password: this.password.value,
      passwordConfirmation: this.passwordConfirmation.value,
    }
    this.store$.dispatch(UserActions.UserChangePassword({ changePassword: changePassword }));
    this.userStateSubscription = this.userState$.pipe(
      skipWhile(as => as.loading || (as.error != null)),
      take(1),
      map(() => {
        this.notificationService.showMessage('Password changed', 'OK');
      })
    ).subscribe()
    this.changePasswordForm.reset();
  }

  get oldPassword() { return this.changePasswordForm.get('oldPassword'); }

  get password() { return this.changePasswordForm.get('password'); }

  get passwordConfirmation() { return this.changePasswordForm.get('passwordConfirmation'); }

}
