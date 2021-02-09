import { RouterStateUrl } from '@store/router/router.state';
import { UserState } from '@modules/user/store/user.state';
import { UsersState } from '@modules/users/store/users.state';
import * as fromRouter from '@ngrx/router-store';
import { AuthState } from '@modules/auth/store/auth.state';
import { UserTypesState } from './user-types/user-types.state';

export interface AppState {
  authState: AuthState
  userState: UserState,
  usersState: UsersState,
  userTypesState: UserTypesState
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>
}
