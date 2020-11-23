import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { UserState } from '@store/user/user.state';


/* Select a feature from state, in this case we only have one feature called todoList but 
 * in bigger applications the state could be more bigger. At some component maybe we only
 * need a piece of state (feature) and we select that piece here
 */
//export const selectTodoList = (state: AppStore) => state.todoList;

/* This line of code do exactly the same job that the above one. createFeatureSelector is 
 * an optimization to get a top level feature state (acording to ngrx documentation).
 * Since todoList is a top level feature we better use createFeatureSelector.
 */
export const selectUserState = createFeatureSelector<AppState, UserState>('userState');

export const selectUser = createSelector(selectUserState, (state: UserState) => state.user);
export const selectEducation = createSelector(selectUserState, (state: UserState) => state.user.education);
export const selectLanguages = createSelector(selectUserState, (state: UserState) => state.user.languages);