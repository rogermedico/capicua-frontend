import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserState } from '@modules/user/store/user.state';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { combineLatest, Observable, Subscription } from 'rxjs';
import * as UsersSelectors from '@modules/users/store/users.selector';
import * as RouterSelectors from '@store/router/router.selector';
import * as UsersActions from '@modules/users/store/users.action';
import { User, UserBackend } from '@models/user.model';
import { map, take, tap } from 'rxjs/operators';
import { Params } from '@angular/router';
import { UsersState } from '@modules/users/store/users.state';
import { MatDialog } from '@angular/material/dialog';
import { NameDialogComponent } from '../dialogs/name-dialog/name-dialog.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {

  public user: User;
  public drivingLicences: string;
  public usersState$: Observable<UsersState> = this.store$.select(UsersSelectors.selectUsersState);
  public userStateSubscription: Subscription;
  public routeParams$: Observable<Params> = this.store$.select(RouterSelectors.selectParams);
  public routeParamsUsersStateSubscription: Subscription;

  constructor(private store$: Store<AppState>, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.routeParamsUsersStateSubscription = combineLatest([this.routeParams$, this.usersState$]).pipe(
      take(1),
      tap(([routeParams, usersState]) => {
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
          this.drivingLicences = this.drivingLicences + drivingLicences[0].type + ' and ' + drivingLicences[1].type;
        }
        else if (drivingLicences.length == 1) {
          this.drivingLicences = drivingLicences[0].type;
        }

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

  editNameSurnameField(data: { name: string, surname: string }): void {
    const dialogRef = this.dialog.open(NameDialogComponent, {
      data: data,
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result: { name: string, surname: string }) => {
      const modifiedUser = {
        name: result.name,
        surname: result.surname
      };
      this.store$.dispatch(UsersActions.UsersUpdate({ id: this.user.id, updatedProperties: modifiedUser }));
    });
  }

}
