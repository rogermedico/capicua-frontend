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
import { map, skipWhile, take, tap } from 'rxjs/operators';
import { Params } from '@angular/router';
import { UsersState } from '@modules/users/store/users.state';
import { MatDialog } from '@angular/material/dialog';
import { ParserService } from '@services/parser.service';
import { EditProfileDialogComponent } from '../../dialogs/edit-profile-dialog/edit-profile-dialog.component';
import { UsersService } from '@modules/users/services/users.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DrivingLicence } from '@models/driving-licence.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {

  public user: User;
  public avatar: SafeResourceUrl | string = 'assets/images/generic-avatar.png';
  public drivingLicences: string;
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public userStateSubscription: Subscription;
  public usersState$: Observable<UsersState> = this.store$.select(UsersSelectors.selectUsersState);
  public routeParams$: Observable<Params> = this.store$.select(RouterSelectors.selectParams);
  public combinedSubscription: Subscription;
  public editable: boolean;

  constructor(
    private store$: Store<AppState>,
    private dialog: MatDialog,
    private userParserService: ParserService,
    private usersService: UsersService,
    private sanitizer: DomSanitizer,
    private parser: ParserService
  ) { }

  ngOnInit(): void {

    /* search the user in usersState and fill the fields */
    this.combinedSubscription = combineLatest([this.routeParams$, this.usersState$, this.userState$]).pipe(
      take(1),
      tap(([routeParams, usersState, userState]) => {
        this.user = usersState.users.find(user => user.id == routeParams.params.id);
        if (this.user) {
          this.drivingLicences = this.parser.parseDrivingLicences(this.user);
          this.editable = this.user.userType.rank > userState.user.userType.rank || this.user.userType.id == userState.user.id;

          if (this.user.avatar === true) {
            this.store$.dispatch(UsersActions.UsersAvatarGet({ userId: this.user.id }));
            this.avatar = this.user.avatar;
          }
        }
      })
    ).subscribe();

    /* every time user is updated somehow, update params */
    this.userStateSubscription = this.usersState$.pipe(
      skipWhile(() => !this.user),
      tap(usersState => {
        this.user = usersState.users.find(user => user.id == this.user.id);
        this.drivingLicences = this.parser.parseDrivingLicences(this.user);
        if (typeof this.user.avatar !== 'boolean') this.avatar = this.user.avatar
      })
    ).subscribe()

  }

  ngOnDestroy(): void {
    this.combinedSubscription.unsubscribe();
    this.userStateSubscription.unsubscribe();
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

  // parseDrivingLicences(drivingLicences: DrivingLicence[]): string {
  //   let parsedDrivingLicences = '';
  //   if (drivingLicences.length > 2) {
  //     for (let i = 0; i < drivingLicences.length - 2; i++) {
  //       parsedDrivingLicences = parsedDrivingLicences + drivingLicences[i].type + ', ';
  //     }
  //     parsedDrivingLicences = parsedDrivingLicences + drivingLicences[drivingLicences.length - 2].type + ' and ' + drivingLicences[drivingLicences.length - 1].type;
  //   }
  //   else if (drivingLicences.length == 2) {
  //     parsedDrivingLicences = drivingLicences[0].type + ' and ' + drivingLicences[1].type;
  //   }
  //   else if (drivingLicences.length == 1) {
  //     parsedDrivingLicences = drivingLicences[0].type;
  //   }
  //   return parsedDrivingLicences;
  // }

  editAvatar(fileInputEvent: any): void {
    const avatar = fileInputEvent.target.files[0];
    this.store$.dispatch(UsersActions.UsersAvatarUpdate({ userId: this.user.id, avatar: avatar }));
    // const dialogRef = this.dialog.open(AvatarDialogComponent);

    // dialogRef.afterClosed().pipe(
    //   take(1),
    //   tap((result) => {
    //     if (result) {
    //       console.log(result)
    //       //this.store$.dispatch(UsersActions.UsersAvatarUpdate({ userId: this.user.id, avatar: result.avatar }));
    //     }
    //   })
    // ).subscribe();
  }

}
