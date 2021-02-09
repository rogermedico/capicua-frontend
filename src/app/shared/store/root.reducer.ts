import { AppState } from '@store/root.state';
import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { userReducer } from '../../modules/user/store/user.reducer';
import { authReducer } from '@modules/auth/store/auth.reducer';
import { usersReducer } from '@modules/users/store/users.reducer';
import { userTypesReducer } from './user-types/user-types.reducer';

export const reducers: ActionReducerMap<AppState> = {
  authState: authReducer,
  userState: userReducer,
  usersState: usersReducer,
  userTypesState: userTypesReducer,
  routerReducer: fromRouter.routerReducer,
};
