import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import * as UserSelectors from '@store/user/user.selector';
import { AppState } from '@store/root.state';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { UserState } from '@store/user/user.state';

@Injectable({
  providedIn: "root",
})
export class LoginGuardService implements CanActivate {

  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);

  constructor(private store$: Store<AppState>) { }

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    return this.userState$.pipe(
      map(us => {
        if (us.user === null) return true;
        else return false;
      })
    );
  }
}
