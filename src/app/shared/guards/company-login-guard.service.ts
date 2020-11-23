import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { AppStore } from '@store/root.state';
import { Store } from '@ngrx/store';
import * as UserSelectors from '@store/user/user.selector';
import { User } from '@models/user.model';
import { USER_TYPES } from '@constants/user-types.constant';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class CompanyLoginGuardService implements CanActivate {

  public user$: Observable<User> = this.store$.select(UserSelectors.selectUser);

  constructor(private store$: Store<AppStore>) { }

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    return this.user$.pipe(
      map(user => {
        if (user === null) return false;
        if (user.type == USER_TYPES.company) return true;
        else return false;
      })
    );
  }
}
