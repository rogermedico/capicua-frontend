import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { map } from 'rxjs/operators';
import { AppConstantsState } from './app-constants.state';

export const selectAppConstantsState = createFeatureSelector<AppState, AppConstantsState>('appConstantsState');

export const selectUserTypes = createSelector(selectAppConstantsState, (state: AppConstantsState) => state.userTypes);

export const selectUserTypesRanks = createSelector(selectAppConstantsState, (state: AppConstantsState) => {
  if (state.userTypes) return state.userTypes.map(ut => ut.rank);
  else return null;
});

export const selectCourseTypes = createSelector(selectAppConstantsState, (state: AppConstantsState) => state.courseTypes);