import * as AppConstantsActions from './app-constants.action';
import { Action, createReducer, on } from '@ngrx/store';
import { AppConstantsState } from './app-constants.state';

/* the auth state starts with no one logged in */
const defaultAppConstantsState: AppConstantsState = {
  userTypes: null,
  courseTypes: null,
  loading: false,
  loaded: true,
  error: null
};

const _appConstantsReducer = createReducer(defaultAppConstantsState,

  /* get user types */
  on(AppConstantsActions.UserTypesGetAll, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* get user types success */
  on(AppConstantsActions.UserTypesGetAllSuccess, (state, { userTypes }) => {
    return {
      ...state,
      userTypes: userTypes,
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* get course types */
  on(AppConstantsActions.CourseTypesGetAll, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* get course types success */
  on(AppConstantsActions.CourseTypesGetAllSuccess, (state, { courseTypes }) => {
    return {
      ...state,
      courseTypes: courseTypes,
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* reset data */
  on(AppConstantsActions.AppConstantsReset, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* reset data success */
  on(AppConstantsActions.AppConstantsResetSuccess, state => {
    return {
      ...state,
      userTypes: null,
      courseTypes: null,
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* error */
  on(AppConstantsActions.UserTypesError, (state, { err }) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      error: err
    }
  }),


);

export function appConstantsReducer(state: AppConstantsState | undefined, action: Action) {
  return _appConstantsReducer(state, action);
}
