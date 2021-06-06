import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserState } from '@modules/user/store/user.state';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { combineLatest, Observable, Subscription } from 'rxjs';
import * as UsersSelectors from '@modules/users/store/users.selector';
import * as UserSelectors from '@modules/user/store/user.selector';
import * as RouterSelectors from '@store/router/router.selector';
import * as UsersActions from '@modules/users/store/users.action';
import { User } from '@models/user.model';
import { filter, map, take, tap } from 'rxjs/operators';
import { Params } from '@angular/router';
import { UsersState } from '@modules/users/store/users.state';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ParserService } from '@services/parser.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit, OnDestroy {

  public user: User = null;
  public avatar: SafeResourceUrl | string = 'assets/images/generic-avatar.png';
  public drivingLicences: string;
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public usersState$: Observable<UsersState> = this.store$.select(UsersSelectors.selectUsersState);
  public userStateSubscription: Subscription;
  public routeParams$: Observable<Params> = this.store$.select(RouterSelectors.selectParams);
  public routeParamsUsersStateSubscription: Subscription;

  constructor(
    private store$: Store<AppState>,
    private parser: ParserService
  ) { }

  ngOnInit(): void {

    this.routeParamsUsersStateSubscription = combineLatest([this.routeParams$, this.usersState$]).pipe(
      filter(([routeParams, usersState]) => usersState.users != null),
      take(1),
      tap(([routeParams, usersState]) => {
        this.user = usersState.users.find(user => user.id == routeParams.params.id);
        if (this.user) {
          this.drivingLicences = this.parser.parseDrivingLicences(this.user);

          if (this.user.avatarFile === true) {
            this.store$.dispatch(UsersActions.UsersAvatarGet({ userId: this.user.id }));
          }

        }

      })
    ).subscribe();

    this.userStateSubscription = this.usersState$.pipe(
      filter(us => this.user != null && us.users != null),
      map(us => {
        this.user = us.users.find(user => user.id == this.user.id)
        this.drivingLicences = this.parser.parseDrivingLicences(this.user);
        if (typeof this.user.avatarFile !== 'boolean') this.avatar = this.user.avatarFile;
      })
    ).subscribe();

  }

  ngOnDestroy(): void {
    this.routeParamsUsersStateSubscription.unsubscribe();
    this.userStateSubscription.unsubscribe();
  }

}
