import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationEnd, Router } from '@angular/router';
import { Login } from '@models/login.model';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import * as AuthActions from '../../store/auth.action';
import * as AuthSelectors from '../../store/auth.selector';
import { Observable, Subscription } from 'rxjs';
import { delay, filter, map, skipWhile } from 'rxjs/operators';
import { UserState } from '@modules/user/store/user.state';
import { AuthState } from "@modules/auth/store/auth.state";
import { environment } from '../../../../../../src/environments/environment';
import { Auth } from "@models/auth.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {

  public hidePassword: boolean = true;
  public wrongCredentials: Boolean = false;
  public loginForm: FormGroup;
  public authState$: Observable<AuthState> = this.store$.select(AuthSelectors.selectAuthState);
  public authStateSubscription: Subscription;
  public renewToken: Subscription;
  public environment = environment;

  constructor(
    private store$: Store<AppState>,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.authStateSubscription = this.authState$.pipe(
      skipWhile(as => as.loading === true),
      map(as => {
        if (as.authInfo && as.authInfo.emailVerified) this.router.navigate(['/home']);
        if (as.authInfo && !as.authInfo.emailVerified) this.router.navigate(['/verify-email']);
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    if (this.authStateSubscription) this.authStateSubscription.unsubscribe();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  login() {

    const loginInfo: Login = {
      username: this.username.value,
      password: this.password.value
    }

    this.store$.dispatch(AuthActions.AuthLogin({ loginInfo: loginInfo }));

  }

  loginSpecificUser(username: string, password: string) {

    const loginInfo: Login = {
      username: username,
      password: password
    }

    this.store$.dispatch(AuthActions.AuthLogin({ loginInfo: loginInfo }));

  }

  get username() { return this.loginForm.get('username'); }

  get password() { return this.loginForm.get('password'); }

}
