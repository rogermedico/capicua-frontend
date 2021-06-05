import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AppState, AuthState>('authState');

export const selectAccessToken = createSelector(selectAuthState, (state: AuthState) => state.authInfo ? state.authInfo.accessToken : null);