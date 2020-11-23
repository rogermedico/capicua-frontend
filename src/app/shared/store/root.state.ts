import { RouterStateUrl } from '@store/router/router.state';
import { AuthState } from '@store/auth/auth.state';
import { UserState } from '@store/user/user.state';
import * as fromRouter from '@ngrx/router-store';

export interface AppState {
  authState: AuthState,
  userState: UserState,
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>
}
