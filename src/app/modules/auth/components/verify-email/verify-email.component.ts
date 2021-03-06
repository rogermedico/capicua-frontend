import { Component, OnDestroy, OnInit } from "@angular/core";
import { Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import * as AuthActions from '../../store/auth.action';
import * as RouterSelectors from '@store/router/router.selector';
import * as AuthSelectors from '@modules/auth/store/auth.selector';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
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
  public authState$: Observable<AuthState> = this.store$.select(AuthSelectors.selectAuthState);
  public verifyEmail: VerifyEmail;

  constructor(private store$: Store<AppState>) { }

  ngOnInit(): void {
    this.routeParamsSubscription = this.RouteParams$.pipe(
      take(1),
      map(routeParams => {
        this.verifyEmail = {
          id: routeParams.params.id,
          hash: routeParams.params.hash
        };
        this.store$.dispatch(AuthActions.AuthVerifyEmail({ verifyEmail: this.verifyEmail }));
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription.unsubscribe();
  }

}
