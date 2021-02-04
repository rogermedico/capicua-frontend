import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import * as AuthSelectors from '@modules/auth/store/auth.selector';
import { AppState } from '@store/root.state';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AuthState } from "@modules/auth/store/auth.state";

@Injectable({
  providedIn: "root",
})
export class LoginGuard implements CanActivate {

  public authState$: Observable<AuthState> = this.store$.select(AuthSelectors.selectAuthState);

  constructor(private store$: Store<AppState>) { }

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    return this.authState$.pipe(
      map(as => {
        if (as.authInfo === null) return true;
        else return false;
      })
    );
  }
}
