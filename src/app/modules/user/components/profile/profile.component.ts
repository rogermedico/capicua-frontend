import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserState } from '@modules/user/store/user.state';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { Observable, Subscription } from 'rxjs';
import * as UserSelectors from '@modules/user/store/user.selector';
import { User } from '@models/user.model';
import { take, tap } from 'rxjs/operators';
import { ParserService } from '@services/parser.service';
import { SafeResourceUrl } from '@angular/platform-browser';
import * as UsersActions from '@modules/users/store/users.action';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public user: User;
  public avatar: SafeResourceUrl | string = 'assets/images/generic-avatar.png';
  public drivingLicences: string;
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public userStateSubscriber: Subscription;

  constructor(private store$: Store<AppState>, private parser: ParserService) { }

  ngOnInit(): void {
    this.userStateSubscriber = this.userState$.pipe(
      take(1),
      tap(userState => {
        this.user = userState.user;
        this.drivingLicences = this.parser.parseDrivingLicences(userState.user);
        if (this.user.avatar) this.avatar = this.user.avatar;
      }),
      tap(us => console.log('user', us.user))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.userStateSubscriber.unsubscribe();
  }

}
