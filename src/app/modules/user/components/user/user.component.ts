import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { Observable, Subscription } from 'rxjs';
import * as UserSelectors from '@modules/user/store/user.selector'
import { UserState } from '@modules/user/store/user.state';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  public user: User;
  public drivingLicences: string;
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public userStateSubscriber: Subscription;
  public coursesDisplayedColumns: string[] = ['name', 'number', 'expeditionDate', 'validUntil'];
  public educationsDisplayedColumns: string[] = ['name', 'finishDate'];
  public languagesDisplayedColumns: string[] = ['name', 'level', 'finishDate'];

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
