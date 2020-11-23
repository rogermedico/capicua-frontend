import { AppState } from '@store/root.state';
import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from './auth/auth.reducer';
import { userReducer } from './user/user.reducer';

export const reducers: ActionReducerMap<AppState> = {
  authState: authReducer,
  userState: userReducer,
  routerReducer: fromRouter.routerReducer,
};
