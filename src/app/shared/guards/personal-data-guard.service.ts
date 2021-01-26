import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanDeactivate } from '@angular/router';
import { UserComponent } from '@modules/user/components/user/user.component';
import { UserState } from '@modules/user/store/user.state';
import { AppState } from '@store/root.state';
import * as UserSelectors from '@modules/user/store/user.selector';
import * as UserActions from '@modules/user/store/user.action';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';

@Injectable()
export class PersonalDataGuard implements CanDeactivate<UserComponent> {

  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);

  constructor(private store$: Store<AppState>) { }

  canDeactivate(): Observable<boolean> | boolean {

    return this.userState$.pipe(
      take(1),
      map(us => {
        if (us.edited === true) {
          const userResponse = confirm('Profile data not saved. If you continue all canges will be lost. Do you really want to continue?');
          if (userResponse) this.store$.dispatch(UserActions.UserDiscardPersonalDataChanges());
          return userResponse;
        }
        else return true;
      })
    );

  }
}