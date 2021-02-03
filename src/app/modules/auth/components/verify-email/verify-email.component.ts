import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Params, Router } from '@angular/router';
import { Login } from '@models/login.model';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import * as AuthActions from '../../store/auth.action';
import * as RouterSelectors from '@store/router/router.selector';
import { Observable, Subscription } from 'rxjs';
import { delay, map, skipWhile } from 'rxjs/operators';
import { UserState } from '@modules/user/store/user.state';
import { AuthState } from "@modules/auth/store/auth.state";
import { VerifyEmail } from "@models/verify-email.model";

@Component({
  selector: "app-verify-email",
  templateUrl: "./verify-email.component.html",
  styleUrls: ["./verify-email.component.scss"],
})
export class VerifyEmailComponent implements OnInit, OnDestroy {

  public RouteParams$: Observable<Params> = this.store$.select(RouterSelectors.selectParams);
  public routeParamsSubscription: Subscription;
  public verifyEmail: VerifyEmail;

  constructor(private store$: Store<AppState>, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.routeParamsSubscription = this.RouteParams$.subscribe(routeParams => {
      this.verifyEmail = {
        id: routeParams.params.id,
        hash: routeParams.params.hash
      };
      this.store$.dispatch(AuthActions.AuthVerifyEmail({ verifyEmail: this.verifyEmail }));
    });
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription.unsubscribe();
  }

}
