import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserState } from '@modules/user/store/user.state';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { combineLatest, Observable, Subscription } from 'rxjs';
import * as UsersSelectors from '@modules/users/store/users.selector';
import * as UserSelectors from '@modules/user/store/user.selector';
import * as RouterSelectors from '@store/router/router.selector';
import * as UsersActions from '@modules/users/store/users.action';
import { NewUser, User, UserBackend } from '@models/user.model';
import { map, take, tap } from 'rxjs/operators';
import { Params } from '@angular/router';
import { UsersState } from '@modules/users/store/users.state';
import { MatDialog } from '@angular/material/dialog';
import { ParserService } from '@services/parser.service';
import { EditProfileDialogComponent } from '../../dialogs/edit-profile-dialog/edit-profile-dialog.component';

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
  public routeParams$: Observable<Params> = this.store$.select(RouterSelectors.selectParams);
  public routeParamsUsersStateSubscription: Subscription;
  public editable: boolean;

  constructor(private store$: Store<AppState>, private dialog: MatDialog, private userParserService: ParserService) { }

  ngOnInit(): void {

    this.routeParamsUsersStateSubscription = combineLatest([this.routeParams$, this.usersState$, this.userState$]).pipe(
      tap(([routeParams, usersState, userState]) => {
        this.user = usersState.users.find(user => user.id == routeParams.params.id);
        if (this.user) {
          const drivingLicences = this.user.drivingLicences;
          this.drivingLicences = "";
          if (drivingLicences.length > 2) {
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
        }
      })
    ).subscribe();

  }

  ngOnDestroy(): void {
    this.routeParamsUsersStateSubscription.unsubscribe();
  }

  editProfile(): void {

    const data = {
      name: this.user.name,
      surname: this.user.surname,
      email: this.user.email,
      userTypeId: this.user.userType.id,
      dni: this.user.dni,
      birthDate: this.user.birthDate,
      addressStreet: this.user.address.street,
      addressNumber: this.user.address.number,
      addressCity: this.user.address.city,
      addressCp: this.user.address.cp,
      addressCountry: this.user.address.country,
      phone: this.user.phone,
      actualPosition: this.user.actualPosition,
      drivingLicences: this.user.drivingLicences.reduce((a, drivingLicence) => {
        return a += `${drivingLicence.type},`;
      }, ''),
    };



    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      data: data
    });

    dialogRef.afterClosed().pipe(
      take(1),
      tap((result) => {
        if (result) {
          const modifiedUser = {
            [this.userParserService.translateToBackend('name')]: result.name,
            [this.userParserService.translateToBackend('surname')]: result.surname,
            [this.userParserService.translateToBackend('email')]: result.email,
            [this.userParserService.translateToBackend('userTypeId')]: result.userTypeId,
            [this.userParserService.translateToBackend('dni')]: result.dni,
            [this.userParserService.translateToBackend('birthDate')]: result.birthDate ? `${result.birthDate.getFullYear()}-${result.birthDate.getMonth() + 1}-${result.birthDate.getDate()}` : null,
            [this.userParserService.translateToBackend('addressStreet')]: result.addressStreet,
            [this.userParserService.translateToBackend('addressNumber')]: result.addressNumber,
            [this.userParserService.translateToBackend('addressCity')]: result.addressCity,
            [this.userParserService.translateToBackend('addressCp')]: result.addressCp,
            [this.userParserService.translateToBackend('addressCountry')]: result.addressCountry,
            [this.userParserService.translateToBackend('phone')]: result.phone,
            [this.userParserService.translateToBackend('actualPosition')]: result.actualPosition,
            [this.userParserService.translateToBackend('drivingLicences')]: result.drivingLicences.toUpperCase(),
          };

          this.store$.dispatch(UsersActions.UsersProfileUpdate({ id: this.user.id, updatedProperties: modifiedUser }));
        }
      })
    ).subscribe();
  }

}
