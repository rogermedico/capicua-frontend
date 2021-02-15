import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserState } from '@modules/user/store/user.state';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { combineLatest, Observable, Subscription } from 'rxjs';
import * as UsersSelectors from '@modules/users/store/users.selector';
import * as UserSelectors from '@modules/user/store/user.selector';
import * as RouterSelectors from '@store/router/router.selector';
import * as UsersActions from '@modules/users/store/users.action';
import { User, UserBackend } from '@models/user.model';
import { map, take, tap } from 'rxjs/operators';
import { Params } from '@angular/router';
import { UsersState } from '@modules/users/store/users.state';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit, OnDestroy {

  public user: User;
  public drivingLicences: string;
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public usersState$: Observable<UsersState> = this.store$.select(UsersSelectors.selectUsersState);
  public userStateSubscription: Subscription;
  public routeParams$: Observable<Params> = this.store$.select(RouterSelectors.selectParams);
  public routeParamsUsersStateSubscription: Subscription;
  public editable: boolean;

  constructor(private store$: Store<AppState>, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.routeParamsUsersStateSubscription = combineLatest([this.routeParams$, this.usersState$, this.userState$]).pipe(
      take(1),
      tap(([routeParams, usersState, userState]) => {
        this.user = usersState.users.find(user => user.id == routeParams.params.id);
        const drivingLicences = this.user.drivingLicences;
        if (drivingLicences.length > 2) {
          this.drivingLicences = "";
          for (let i = 0; i < drivingLicences.length - 2; i++) {
            this.drivingLicences = this.drivingLicences + drivingLicences[i].type + ', ';
          }
          this.drivingLicences = this.drivingLicences + drivingLicences[drivingLicences.length - 2].type + ' and ' + drivingLicences[drivingLicences.length - 1].type;
        }
        else if (drivingLicences.length == 2) {
          this.drivingLicences = drivingLicences[0].type + ' and ' + drivingLicences[1].type;
        }
        else if (drivingLicences.length == 1) {
          this.drivingLicences = drivingLicences[0].type;
        }
        this.editable = this.user.userType.rank > userState.user.userType.rank || this.user.userType.id == userState.user.id;

      })
    ).subscribe();

    this.userStateSubscription = this.usersState$.pipe(
      map(us => this.user = us.users.find(user => user.id == this.user.id))
    ).subscribe();

  }

  ngOnDestroy(): void {
    this.routeParamsUsersStateSubscription.unsubscribe();
    this.userStateSubscription.unsubscribe();
  }

}
