import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { HomeState } from './home.state';

export const selectHomeState = createFeatureSelector<AppState, HomeState>('homeState');

export const selectHomePosts = createSelector(selectHomeState, (state: HomeState) => state.posts);