import { RouterStateUrl } from '@store/router/router.state';
import { UserState } from '@modules/user/store/user.state';
import { UsersState } from '@modules/users/store/users.state';
import * as fromRouter from '@ngrx/router-store';
import { AuthState } from '@modules/auth/store/auth.state';

export interface AppState {
  authState: AuthState
  userState: UserState,
  usersState: UsersState,
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>
}
