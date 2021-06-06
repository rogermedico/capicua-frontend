import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { UserState } from '@modules/user/store/user.state';

export const selectUserState = createFeatureSelector<AppState, UserState>('userState');

export const selectUser = createSelector(selectUserState, (state: UserState) => state.user);