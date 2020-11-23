import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { AuthState } from '@store/auth/auth.state';
import * as AuthSelectors from '@store/auth/auth.selector';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class LogoutGuardService implements CanActivate {

  public authState$: Observable<AuthState> = this.store$.select(AuthSelectors.selectAuthState);

  constructor(private store$: Store<AppState>) { }

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    return this.authState$.pipe(
      map(as => {
        if (as.loginInfo !== null) return true;
        else return false;
      })
    );
  }
}
