import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersState } from '@modules/users/store/users.state';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import * as UsersSelectors from '@modules/users/store/users.selector';
import { Observable } from 'rxjs';
import { dniValidator } from '@validators/dni.validator';
import { userTypeValidator } from '@validators/userType.validator';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

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

  constructor(private store$: Store<AppState>, private fb: FormBuilder) { }

  ngOnInit(): void {

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
    // this.userSubscriber.unsubscribe();
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
        Validators.minLength(3),
        Validators.maxLength(55)
      ]],
      email: [null, [
        Validators.required, Validators.email
      ]],
      password: [null, [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!¡?¿"·$%&\/\(\)\\\\<>+*=\'_\-]).{8,}')
      ]],
      birthDate: [null, [
        Validators.pattern('^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/]\\d{4}$')
      ]],
      phone: [null, [
        Validators.minLength(9),
        Validators.maxLength(15),
      ]],
      address_number: [null, [
        Validators.maxLength(50)
      ]],
      address_street: [null, [
        Validators.maxLength(70)
      ]],
      address_city: [null, [
        Validators.maxLength(50)
      ]],
      address_cp: [null, [
        Validators.maxLength(10)
      ]],
      address_country: [null, [
        Validators.maxLength(50)
      ]],
      dni: [null, [
        dniValidator
      ]],
      user_type_id: [null, [
        userTypeValidator
      ]]
    });

  }

  createNewUser() {

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

  get birthDate() { return this.newUserForm.get('birthDate'); }

  get phone() { return this.newUserForm.get('phone'); }

  get nationality() { return this.newUserForm.get('nationality'); }

  get nif() { return this.newUserForm.get('nif'); }

  get aboutMe() { return this.newUserForm.get('aboutMe'); }

  get companyName() { return this.newUserForm.get('companyName'); }

  get companyDescription() { return this.newUserForm.get('companyDescription'); }

  get cif() { return this.newUserForm.get('cif'); }
}