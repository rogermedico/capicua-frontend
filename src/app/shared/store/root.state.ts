import { RouterStateUrl } from '@store/router/router.state';
import { UserState } from '@store/user/user.state';
import * as fromRouter from '@ngrx/router-store';

export interface AppState {
  userState: UserState,
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>
}
