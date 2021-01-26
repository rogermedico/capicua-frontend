import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import * as AuthSelectors from '@modules/auth/store/auth.selector';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { map } from 'rxjs/operators';
import { AuthState } from "@modules/auth/store/auth.state";

@Injectable({
  providedIn: "root",
})
export class LogoutGuardService implements CanActivate {

  public authState$: Observable<AuthState> = this.store$.select(AuthSelectors.selectAuthState);

  constructor(private store$: Store<AppState>) { }

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    return this.authState$.pipe(
      map(as => {
        if (as.authInfo !== null) return true;
        else return false;
      })
    );
  }
}
