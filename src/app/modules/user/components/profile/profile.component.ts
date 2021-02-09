import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserState } from '@modules/user/store/user.state';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { Observable, Subscription } from 'rxjs';
import * as UserSelectors from '@modules/user/store/user.selector';
import { User } from '@models/user.model';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public user: User;
  public drivingLicences: string;
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public userStateSubscriber: Subscription;

  constructor(private store$: Store<AppState>) { }

  ngOnInit(): void {
    this.userStateSubscriber = this.userState$.pipe(
      take(1),
      tap(userState => {
        this.user = userState.user;
        const drivingLicences = userState.user.drivingLicences;
        if (drivingLicences.length > 2) {
          this.drivingLicences = "";
          for (let i = 0; i < drivingLicences.length - 2; i++) {
            this.drivingLicences = this.drivingLicences + drivingLicences[i].type + ', ';
          }
          this.drivingLicences = this.drivingLicences + drivingLicences[drivingLicences.length - 2].type + ' and ' + drivingLicences[drivingLicences.length - 1].type;
        }
        else if (drivingLicences.length == 2) {
          this.drivingLicences = this.drivingLicences + drivingLicences[0].type + ' and ' + drivingLicences[1].type;
        }
        else if (drivingLicences.length == 1) {
          this.drivingLicences = drivingLicences[0].type;
        }

      }),
      tap(us => console.log('user', us.user))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.userStateSubscriber.unsubscribe();
  }

}
