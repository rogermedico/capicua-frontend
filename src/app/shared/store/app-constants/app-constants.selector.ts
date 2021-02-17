import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { map } from 'rxjs/operators';
import { AppConstantsState } from './app-constants.state';


/* Select a feature from state, in this case we only have one feature called todoList but 
 * in bigger applications the state could be more bigger. At some component maybe we only
 * need a piece of state (feature) and we select that piece here
 */
//export const selectTodoList = (state: AppStore) => state.todoList;

/* This line of code do exactly the same job that the above one. createFeatureSelector is 
 * an optimization to get a top level feature state (acording to ngrx documentation).
 * Since todoList is a top level feature we better use createFeatureSelector.
 */
export const selectAppConstantsState = createFeatureSelector<AppState, AppConstantsState>('appConstantsState');

export const selectUserTypes = createSelector(selectAppConstantsState, (state: AppConstantsState) => state.userTypes);
export const selectUserTypesRanks = createSelector(selectAppConstantsState, (state: AppConstantsState) => {
  if (state.userTypes) return state.userTypes.map(ut => ut.rank);
  else return null;
});

export const selectCourseTypes = createSelector(selectAppConstantsState, (state: AppConstantsState) => state.courseTypes);