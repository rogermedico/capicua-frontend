import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { UserState } from "@modules/user/store/user.state";
import { UsersState } from "@modules/users/store/users.state";
import { Store } from "@ngrx/store";
import { AppState } from "@store/root.state";
import { Observable, of } from "rxjs";
import * as UserSelectors from '@modules/user/store/user.selector';
import { User } from "@models/user.model";
import { map } from "rxjs/operators";

export function userTypeValidator(store$: Store<AppState>): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {

    const user$: Observable<User> = store$.select(UserSelectors.selectUser);

    return user$.pipe(
      map(user => {
        return user.userType.rank < control.value ? { userTypeValidationResult: true } : null;
      })
    )
  }
}