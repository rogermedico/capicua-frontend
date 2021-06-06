import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { UsersState } from './users.state';

export const selectUsersState = createFeatureSelector<AppState, UsersState>('usersState');

export const selectUsers = createSelector(selectUsersState, (state: UsersState) => state.users);