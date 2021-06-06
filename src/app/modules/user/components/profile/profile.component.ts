import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserState } from '@modules/user/store/user.state';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { Observable, Subscription } from 'rxjs';
import * as UserSelectors from '@modules/user/store/user.selector';
import { User } from '@models/user.model';
import { map, skipWhile, take, tap } from 'rxjs/operators';
import { ParserService } from '@services/parser.service';
import { SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import * as UserActions from '@modules/user/store/user.action';
import { EditProfileDialogComponent } from '../dialogs/edit-profile-dialog/edit-profile-dialog.component';
import { NotificationService } from '@services/notification.service';

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
  public userStateSubscription: Subscription;
  public notificationSubscription: Subscription;
  public editable: boolean = true;

  constructor(
    private store$: Store<AppState>,
    private dialog: MatDialog,
    private userParserService: ParserService,
    private parser: ParserService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.userStateSubscription = this.userState$.pipe(
      tap(userState => {
        this.user = userState.user;
        this.drivingLicences = this.parser.parseDrivingLicences(userState.user);
        if (this.user.avatarFile) this.avatar = this.user.avatarFile;
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.userStateSubscription.unsubscribe();
  }

  editProfile(): void {

    const data = {
      name: this.user.name,
      surname: this.user.surname,
      email: this.user.email,
      dni: this.user.dni,
      birthDate: this.user.birthDate,
      addressStreet: this.user.address.street,
      addressNumber: this.user.address.number,
      addressCity: this.user.address.city,
      addressCp: this.user.address.cp,
      addressCountry: this.user.address.country,
      phone: this.user.phone,
      drivingLicences: this.user.drivingLicences.reduce((a, drivingLicence) => {
        return a += `${drivingLicence.type},`;
      }, ''),
      bankAccount: this.user.bankAccount,
      socialSecurityNumber: this.user.socialSecurityNumber,
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
            [this.userParserService.translateToBackend('dni')]: result.dni,
            [this.userParserService.translateToBackend('birthDate')]: result.birthDate ? `${result.birthDate.getFullYear()}-${result.birthDate.getMonth() + 1}-${result.birthDate.getDate()}` : null,
            [this.userParserService.translateToBackend('addressStreet')]: result.addressStreet,
            [this.userParserService.translateToBackend('addressNumber')]: result.addressNumber,
            [this.userParserService.translateToBackend('addressCity')]: result.addressCity,
            [this.userParserService.translateToBackend('addressCp')]: result.addressCp,
            [this.userParserService.translateToBackend('addressCountry')]: result.addressCountry,
            [this.userParserService.translateToBackend('phone')]: result.phone,
            [this.userParserService.translateToBackend('drivingLicences')]: result.drivingLicences.toUpperCase(),
            [this.userParserService.translateToBackend('bankAccount')]: result.bankAccount,
            [this.userParserService.translateToBackend('socialSecurityNumber')]: result.socialSecurityNumber,
          };
          this.store$.dispatch(UserActions.UserProfileUpdate({ updatedProperties: modifiedUser }));
          this.notificationSubscription = this.userState$.pipe(
            skipWhile(userState => userState.loading),
            take(1),
            map(() => {
              this.notificationService.showMessage('Personal info succesfully updated', 'OK');
            })
          ).subscribe()
        }
      })
    ).subscribe();
  }

  editAvatar(fileInputEvent: any): void {
    const avatar = fileInputEvent.target.files[0];
    this.store$.dispatch(UserActions.UserAvatarUpdate({ avatar: avatar }));
    this.notificationSubscription = this.userState$.pipe(
      skipWhile(userState => userState.loading),
      take(1),
      map(() => {
        this.notificationService.showMessage('Avatar succesfully updated', 'OK');
      })
    ).subscribe()
  }

}

