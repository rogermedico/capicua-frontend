import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersState } from '@modules/users/store/users.state';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import * as UsersSelectors from '@modules/users/store/users.selector';
import * as UserSelectors from '@modules/user/store/user.selector';
import * as AppConstantsSelectors from '@store/app-constants/app-constants.selector';
import { combineLatest, Observable, Subscriber, Subscription } from 'rxjs';
import { dniValidator } from '@validators/dni.validator';
import { userTypeValidator } from '@validators/userType.validator';
import { UserState } from '@modules/user/store/user.state';
import { AppConstantsState } from '@store/app-constants/app-constants.state';
import { filter, map, skipWhile, take } from 'rxjs/operators';
import { UserType } from '@models/user-type.model';
import { NewUser, User, UserBackend } from '@models/user.model';
import { PasswordGeneratorService } from '@services/password-generator.service';
import * as UsersActions from '@modules/users/store/users.action';
import { Router } from '@angular/router';
import { NotificationService } from '@services/notification.service';
import { drivingLicencesValidator } from '@validators/driving-licences.validator';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit, OnDestroy {

  // public nationalities = Object.values(NATIONALITIES);
  // public userTypes = USER_TYPES;
  // public user: User;
  // public userLoggedIn$: Observable<User> = this.store$.select(UserSelectors.selectUser);
  // public userSubscriber: Subscription;
  // public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  // public userStateSubscriber: Subscription;
  // public snackBarSubscription: Subscription;
  public newUserForm: FormGroup;
  // public newUserFormValueChangesSubscriber: Subscription;
  public usersState$: Observable<UsersState> = this.store$.select(UsersSelectors.selectUsersState);
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public userTypes$: Observable<UserType[]> = this.store$.select(AppConstantsSelectors.selectUserTypes);
  public combinedUserUserTypesStateSubscription: Subscription;
  public usersStateSubscription: Subscription;
  public userTypes: UserType[];

  constructor(
    private store$: Store<AppState>,
    private fb: FormBuilder,
    private passwordGenerator: PasswordGeneratorService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {

    this.combinedUserUserTypesStateSubscription = combineLatest([this.userState$, this.userTypes$]).pipe(
      filter(([userState, userTypes]) => {
        return userState.user != null && userTypes != null;
      }),
      take(1),
      map(([userState, userTypes]) => {
        // if (userState.user.userType.rank == 1) {
        //   this.userTypes = userTypesState.userTypes;
        // }
        // else {
        this.userTypes = userTypes.filter(ut => {
          if (userState.user.userType.rank != ut.rank) return ut;
        })
        console.log(this.userTypes)
        // }

      })
    ).subscribe();

    // this.userSubscriber = this.userLoggedIn$.pipe(
    //   take(1),
    //   tap(user => this.user = user),
    //   tap(user => this.createForm(user))
    // ).subscribe();

    // this.newUserFormValueChangesSubscriber = this.newUserForm.valueChanges.pipe(
    //   map(() => this.userStateSubscriber = this.userState$.pipe(
    //     take(1),
    //     map(us => {
    //       if (!us.edited) this.store$.dispatch(UserActions.UserModifyPersonalData());
    //     })
    //   ).subscribe()
    //   )
    // ).subscribe();

    // this.snackBarSubscription = this.userState$.pipe(
    //   map(us => {
    //     if (us.profileEdit) this.snackBarService.openSnackBar('Profile successfully updated', 'OK', {
    //       duration: 4000,
    //       horizontalPosition: 'center',
    //       verticalPosition: 'top'
    //     });
    //   })
    // ).subscribe();

    this.createForm();
  }

  ngOnDestroy(): void {
    this.combinedUserUserTypesStateSubscription.unsubscribe();
    if (this.usersStateSubscription) this.usersStateSubscription.unsubscribe();
    // if (this.userStateSubscriber) this.userStateSubscriber.unsubscribe();
    // this.newUserFormValueChangesSubscriber.unsubscribe();
    // this.snackBarSubscription.unsubscribe();
  }

  createForm() {
    this.newUserForm = this.fb.group({
      name: [null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(55)
      ]],
      surname: [null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(55)
      ]],
      email: [null, [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]],
      // password: [null, [
      //   Validators.required,
      //   Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!¡?¿"·$%&\/\(\)\\\\<>+*=\'_\-]).{8,}')
      // ]],
      // birthDate: [null],
      // phone: [null, [
      //   Validators.minLength(9),
      //   Validators.maxLength(15),
      // ]],
      // addressNumber: [null, [
      //   Validators.maxLength(50)
      // ]],
      // addressStreet: [null, [
      //   Validators.maxLength(70)
      // ]],
      // addressCity: [null, [
      //   Validators.maxLength(50)
      // ]],
      // addressCp: [null, [
      //   Validators.maxLength(10)
      // ]],
      // addressCountry: [null, [
      //   Validators.maxLength(50)
      // ]],
      // dni: [null, [
      //   dniValidator
      // ]],
      userTypeId: [null, [
        Validators.required,
        userTypeValidator
      ]],
      // drivingLicences: [null, [
      //   Validators.maxLength(100),
      //   drivingLicencesValidator
      // ]],
      // actualPosition: [null, [
      //   Validators.maxLength(100),
      // ]]
    });

  }

  createNewUser() {

    if (this.newUserForm.valid) {
      const newUser: NewUser = {
        name: this.name.value,
        surname: this.surname.value,
        email: this.email.value,
        user_type_id: this.userTypeId.value,
        password: this.passwordGenerator.generate(),
        // dni: this.dni.value,
        // birth_date: this.birthDate.value ? `${this.birthDate.value.getFullYear()}-${this.birthDate.value.getMonth() + 1}-${this.birthDate.value.getDate()}` : null,
        // address_street: this.addressStreet.value,
        // address_number: this.addressNumber.value,
        // address_city: this.addressCity.value,
        // address_cp: this.addressCp.value,
        // address_country: this.addressCountry.value,
        // phone: this.phone.value,
        // driving_licences: this.drivingLicences.value,
        // actual_position: this.actualPosition.value,
      }

      this.store$.dispatch(UsersActions.UsersCreate({ newUser: newUser }));
      this.usersStateSubscription = this.usersState$.pipe(
        skipWhile(usersState => usersState.loading),
        map(() => {
          this.router.navigateByUrl('/users');
          this.notificationService.showMessage('New user created successfully', 'OK');
        })
      ).subscribe()

    }

  }



  // updateProfile() {
  //   if (this.newUserForm.valid) {
  //     const user: User = {
  //       ...this.user,
  //       name: this.name.value,
  //       surname: this.surname.value,
  //       birthDate: this.birthDate.value,
  //       phone: this.phone.value,
  //       nationality: this.nationality.value,
  //       nif: this.nif.value,
  //       aboutMe: this.aboutMe.value
  //     }
  //     if (this.user.type === this.userTypes.company) {
  //       user.companyName = this.companyName.value;
  //       user.companyDescription = this.companyDescription.value;
  //       user.cif = this.cif.value;
  //     }

  //     this.store$.dispatch(UserActions.UserUpdatePersonalData({ user: user }));
  //   }
  // }

  // openSnackBar(msg: string) {
  //   this.snackBar.open(msg, 'OK', {
  //     duration: 4000,
  //     horizontalPosition: 'center',
  //     verticalPosition: 'top',
  //   });
  // }

  get name() { return this.newUserForm.get('name'); }

  get surname() { return this.newUserForm.get('surname'); }

  get email() { return this.newUserForm.get('email'); }

  get userTypeId() { return this.newUserForm.get('userTypeId'); }

  // get phone() { return this.newUserForm.get('phone'); }

  // get dni() { return this.newUserForm.get('dni'); }

  // get birthDate() { return this.newUserForm.get('birthDate'); }

  // get addressNumber() { return this.newUserForm.get('addressNumber'); }

  // get addressStreet() { return this.newUserForm.get('addressStreet'); }

  // get addressCp() { return this.newUserForm.get('addressCp'); }

  // get addressCity() { return this.newUserForm.get('addressCity'); }

  // get addressCountry() { return this.newUserForm.get('addressCountry'); }

  // get actualPosition() { return this.newUserForm.get('actualPosition'); }

  // get drivingLicences() { return this.newUserForm.get('drivingLicences'); }

}