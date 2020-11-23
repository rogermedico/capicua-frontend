import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanDeactivate } from '@angular/router';
import { ProfileComponent } from '@modules/user/components/profile/profile.component';
import { UserState } from '@store/user/user.state';
import { AppStore } from '@store/root.state';
import * as UserSelectors from '@store/user/user.selector';
import * as UserActions from '@store/user/user.action';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';

@Injectable()
export class PersonalDataGuard implements CanDeactivate<ProfileComponent> {

  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);

  constructor(private store$: Store<AppStore>) { }

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