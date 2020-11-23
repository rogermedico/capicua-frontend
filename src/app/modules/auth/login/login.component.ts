import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { Login } from '@models/login.model';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import * as AuthActions from '@store/auth/auth.action';
import * as AuthSelectors from '@store/auth/auth.selector';
import { Observable, Subscription } from 'rxjs';
import { delay, map, skipWhile } from 'rxjs/operators';
import { AuthState } from '@store/auth/auth.state';

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
  private authStateSubscription: Subscription;

  constructor(private store$: Store<AppState>, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
    this.authStateSubscription = this.authState$.pipe(
      skipWhile(as => as.loading === true),
      map(as => {
        if (as.wrongCredentials == false && !as.loading) this.router.navigate(['']);
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.authStateSubscription.unsubscribe();
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

    this.store$.dispatch(AuthActions.AuthLogin({ loginInfo: loginInfo }));

  }

  get username() { return this.loginForm.get('username'); }

  get password() { return this.loginForm.get('password'); }

}
