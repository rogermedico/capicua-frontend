import { RouterStateUrl } from '@store/router/router.state';
import { UserState } from '@modules/user/store/user.state';
import { UsersState } from '@modules/users/store/users.state';
import * as fromRouter from '@ngrx/router-store';
import { AuthState } from '@modules/auth/store/auth.state';
import { AppConstantsState } from './app-constants/app-constants.state';
import { HomeState } from '@modules/home/store/home.state';

export interface AppState {
  authState: AuthState,
  homeState: HomeState,
  userState: UserState,
  usersState: UsersState,
  appConstantsState: AppConstantsState
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>
}
