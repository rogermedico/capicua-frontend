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
import { NameDialogComponent } from '../dialogs/name-dialog/name-dialog.component';
import { TextInputDialogComponent } from '../dialogs/text-input-dialog/text-input-dialog.component';
import { UserParserService } from '@services/user-parser.service';
import { DniDialogComponent } from '../dialogs/dni-dialog/dni-dialog.component';
import { BirthDateDialogComponent } from '../dialogs/birth-date-dialog/birth-date-dialog.component';
import { AddressDialogComponent } from '../dialogs/address-dialog/address-dialog.component';
import { EmailDialogComponent } from '../dialogs/email-dialog/email-dialog.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {

  public user: User;
  public drivingLicences: string;
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public usersState$: Observable<UsersState> = this.store$.select(UsersSelectors.selectUsersState);
  public userStateSubscription: Subscription;
  public routeParams$: Observable<Params> = this.store$.select(RouterSelectors.selectParams);
  public routeParamsUsersStateSubscription: Subscription;
  public editable: boolean;

  constructor(private store$: Store<AppState>, private dialog: MatDialog, private userParserService: UserParserService) { }

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

  editNameSurnameField(data: { name: string, surname: string }): void {
    const dialogRef = this.dialog.open(NameDialogComponent, {
      data: data,
      width: '400px'
    });

    dialogRef.afterClosed().pipe(
      take(1),
      tap((result: { name: string, surname: string }) => {
        if (result) {
          const modifiedUser = {
            [this.userParserService.translateToBackend('name')]: result.name,
            [this.userParserService.translateToBackend('surname')]: result.surname
          };
          this.store$.dispatch(UsersActions.UsersUpdate({ id: this.user.id, updatedProperties: modifiedUser }));
        }
      })
    ).subscribe();
  }

  editTextField(data: { name: string, placeholder: string, currentText: string }, property: string): void {
    const dialogRef = this.dialog.open(TextInputDialogComponent, {
      data: data,
      width: '400px'
    });

    dialogRef.afterClosed().pipe(
      take(1),
      tap((result: { [key: string]: string }) => {
        if (result) {
          const modifiedUser = {
            [this.userParserService.translateToBackend(property)]: result.text
          };
          this.store$.dispatch(UsersActions.UsersUpdate({ id: this.user.id, updatedProperties: modifiedUser }));
        }
      })
    ).subscribe();
  }

  editAddressField(data: { number: string, street: string }): void {
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      data: data,
      width: '400px'
    });

    dialogRef.afterClosed().pipe(
      take(1),
      tap((result: { number: string, street: string }) => {
        if (result) {
          const modifiedUser = {
            [this.userParserService.translateToBackend('number')]: result.number,
            [this.userParserService.translateToBackend('street')]: result.street
          };
          this.store$.dispatch(UsersActions.UsersUpdate({ id: this.user.id, updatedProperties: modifiedUser }));
        }
      })
    ).subscribe();
  }

  editDniField(data: { dni: string }): void {
    const dialogRef = this.dialog.open(DniDialogComponent, {
      data: data,
      width: '400px'
    });

    dialogRef.afterClosed().pipe(
      take(1),
      tap((result: { dni: string }) => {
        if (result) {
          const modifiedUser = {
            [this.userParserService.translateToBackend('dni')]: result.dni
          };
          this.store$.dispatch(UsersActions.UsersUpdate({ id: this.user.id, updatedProperties: modifiedUser }));
        }
      })
    ).subscribe();
  }

  editBirthDateField(data: { birthDate: Date }): void {
    const dialogRef = this.dialog.open(BirthDateDialogComponent, {
      data: data,
      width: '400px'
    });

    dialogRef.afterClosed().pipe(
      take(1),
      tap((result: { birthDate: Date }) => {
        if (result) {
          const parsedDate = `${result.birthDate.getFullYear()}-${result.birthDate.getMonth() + 1}-${result.birthDate.getDate()}`;
          const modifiedUser = {
            [this.userParserService.translateToBackend('birthDate')]: parsedDate
          };
          this.store$.dispatch(UsersActions.UsersUpdate({ id: this.user.id, updatedProperties: modifiedUser }));
        }
      })
    ).subscribe();
  }

  editEmailField(data: { email: string }): void {
    const dialogRef = this.dialog.open(EmailDialogComponent, {
      data: data,
      width: '400px'
    });

    dialogRef.afterClosed().pipe(
      take(1),
      tap((result: { email: string }) => {
        if (result) {
          const modifiedUser = {
            [this.userParserService.translateToBackend('email')]: result.email
          };
          this.store$.dispatch(UsersActions.UsersUpdate({ id: this.user.id, updatedProperties: modifiedUser }));
        }
      })
    ).subscribe();
  }

}
