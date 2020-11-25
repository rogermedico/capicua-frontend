import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { Login } from '@models/login.model';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import * as UserActions from '@store/user/user.action';
import * as UserSelectors from '@store/user/user.selector';
import { Observable, Subscription } from 'rxjs';
import { delay, map, skipWhile } from 'rxjs/operators';
import { UserState } from '@store/user/user.state';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {

  public hidePassword: boolean = true;
  public wrongCredentials: Boolean = false;
  public loginForm: FormGroup;
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  private userStateSubscription: Subscription;

  constructor(private store$: Store<AppState>, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
    this.userStateSubscription = this.userState$.pipe(
      skipWhile(us => us.loading === true),
      map(us => {
        if (us.user) this.router.navigate(['/home']);
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.userStateSubscription.unsubscribe();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [null, [Validators.required]],
    });
  }

  login() {

    const loginInfo: Login = {
      username: this.username.value,
      password: this.password.value
    }

    this.store$.dispatch(UserActions.UserLogin({ loginInfo: loginInfo }));

  }

  get username() { return this.loginForm.get('username'); }

  get password() { return this.loginForm.get('password'); }

}
