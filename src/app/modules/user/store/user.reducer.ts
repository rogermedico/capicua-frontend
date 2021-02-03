import { UserState } from './user.state';
import * as UserActions from './user.action';
import { Action, createReducer, on } from '@ngrx/store';

/* the auth state starts with no one logged in */
const defaultUserState: UserState = {
  user: null,
  loginErrors: 0,
  loading: false,
  loaded: true,
  edited: false,
  error: null
};

const _userReducer = createReducer(defaultUserState,

  /* get data */
  on(UserActions.UserGetData, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* get data success */
  on(UserActions.UserGetDataSuccess, (state, { user }) => {
    return {
      ...state,
      user: user,
      loginErrors: 0,
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* get data error */
  on(UserActions.UserGetDataError, (state, { err }) => {
    return {
      ...state,
      loginErrors: state.loginErrors + 1,
      loading: false,
      loaded: true,
      error: err
    }
  }),

  /* reset data */
  on(UserActions.UserResetData, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* reset data success */
  on(UserActions.UserResetDataSuccess, state => {
    return {
      ...state,
      user: null,
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* reset data error */
  on(UserActions.UserResetDataError, (state, { err }) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      error: err
    }
  }),

  // /* modify profile */
  // on(UserActions.UserModifyPersonalData, state => {
  //   return {
  //     ...state,
  //     loading: true,
  //     error: null
  //   }
  // }),

  // /* modify profile success */
  // on(UserActions.UserModifyPersonalDataSuccess, state => {
  //   return {
  //     ...state,
  //     loading: false,
  //     loaded: true,
  //     edited: true,
  //     error: null
  //   }
  // }),

  // /* modify profile error */
  // on(UserActions.UserModifyPersonalDataError, (state, { err }) => {
  //   return {
  //     ...state,
  //     loading: false,
  //     loaded: true,
  //     error: err
  //   }
  // }),

  // /* discard profile changes */
  // on(UserActions.UserDiscardPersonalDataChanges, state => {
  //   return {
  //     ...state,
  //     loading: true,
  //     error: null
  //   }
  // }),

  // /* discard profile changes success */
  // on(UserActions.UserDiscardPersonalDataChangesSuccess, state => {
  //   return {
  //     ...state,
  //     loading: false,
  //     loaded: true,
  //     edited: false,
  //     error: null
  //   }
  // }),

  // /* discard profile changes error */
  // on(UserActions.UserDiscardPersonalDataChangesError, (state, { err }) => {
  //   return {
  //     ...state,
  //     loading: false,
  //     loaded: true,
  //     error: err
  //   }
  // }),

  // /* update profile */
  // on(UserActions.UserUpdatePersonalData, state => {
  //   return {
  //     ...state,
  //     loading: true,
  //     error: null
  //   }
  // }),

  // /* update profile success */
  // on(UserActions.UserUpdatePersonalDataSuccess, (state, { user }) => {
  //   return {
  //     ...state,
  //     user: user,
  //     loading: false,
  //     edited: false,
  //     error: null
  //   }
  // }),

  // /* update profile error */
  // on(UserActions.UserUpdatePersonalDataError, (state, { err }) => {
  //   return {
  //     ...state,
  //     loading: false,
  //     error: err
  //   }
  // }),

  // /* create language */
  // on(UserActions.UserCreateLanguage, state => {
  //   return {
  //     ...state,
  //     loading: true,
  //     error: null
  //   }
  // }),

  // /* create language success */
  // on(UserActions.UserCreateLanguageSuccess, (state, { user }) => {
  //   return {
  //     ...state,
  //     user: user,
  //     loading: false,
  //     error: null
  //   }
  // }),

  // /* create language error */
  // on(UserActions.UserCreateLanguageError, (state, { err }) => {
  //   return {
  //     ...state,
  //     loading: false,
  //     error: err
  //   }
  // }),

  // /* update language */
  // on(UserActions.UserUpdateLanguage, state => {
  //   return {
  //     ...state,
  //     loading: true,
  //     error: null
  //   }
  // }),

  // /* update language success */
  // on(UserActions.UserUpdateLanguageSuccess, (state, { user }) => {
  //   return {
  //     ...state,
  //     user: user,
  //     loading: false,
  //     error: null
  //   }
  // }),

  // /* update language error */
  // on(UserActions.UserUpdateLanguageError, (state, { err }) => {
  //   return {
  //     ...state,
  //     loading: false,
  //     error: err
  //   }
  // }),

  // /* delete language */
  // on(UserActions.UserDeleteLanguage, state => {
  //   return {
  //     ...state,
  //     loading: true,
  //     error: null
  //   }
  // }),

  // /* delete language success */
  // on(UserActions.UserDeleteLanguageSuccess, (state, { user }) => {
  //   return {
  //     ...state,
  //     user: user,
  //     loading: false,
  //     error: null
  //   }
  // }),

  // /* delete language error */
  // on(UserActions.UserDeleteLanguageError, (state, { err }) => {
  //   return {
  //     ...state,
  //     loading: false,
  //     error: err
  //   }
  // }),

  // /* create education */
  // on(UserActions.UserCreateEducation, state => {
  //   return {
  //     ...state,
  //     loading: true,
  //     error: null
  //   }
  // }),

  // /* create education success */
  // on(UserActions.UserCreateEducationSuccess, (state, { user }) => {
  //   return {
  //     ...state,
  //     user: user,
  //     loading: false,
  //     error: null
  //   }
  // }),

  // /* create education error */
  // on(UserActions.UserCreateEducationError, (state, { err }) => {
  //   return {
  //     ...state,
  //     loading: false,
  //     error: err
  //   }
  // }),

  // /* update education */
  // on(UserActions.UserUpdateEducation, state => {
  //   return {
  //     ...state,
  //     loading: true,
  //     error: null
  //   }
  // }),

  // /* update education success */
  // on(UserActions.UserUpdateEducationSuccess, (state, { user }) => {
  //   return {
  //     ...state,
  //     user: user,
  //     loading: false,
  //     error: null
  //   }
  // }),

  // /* update education error */
  // on(UserActions.UserUpdateEducationError, (state, { err }) => {
  //   return {
  //     ...state,
  //     loading: false,
  //     error: err
  //   }
  // }),

  // /* delete education */
  // on(UserActions.UserDeleteEducation, state => {
  //   return {
  //     ...state,
  //     loading: true,
  //     error: null
  //   }
  // }),

  // /* delete education success */
  // on(UserActions.UserDeleteEducationSuccess, (state, { user }) => {
  //   return {
  //     ...state,
  //     user: user,
  //     loading: false,
  //     error: null
  //   }
  // }),

  // /* delete education error */
  // on(UserActions.UserDeleteEducationError, (state, { err }) => {
  //   return {
  //     ...state,
  //     loading: false,
  //     error: err
  //   }
  // }),

  // /* load favorite activities */
  // on(UserActions.UserLoadFavoriteActivities, state => {
  //   return {
  //     ...state,
  //     loading: true,
  //     error: null
  //   }
  // }),

  // /* load favorite activities success */
  // on(UserActions.UserLoadFavoriteActivitiesSuccess, (state, { favoriteActivities }) => {
  //   return {
  //     ...state,
  //     user: {
  //       ...state.user,
  //       favoriteActivities: favoriteActivities
  //     },
  //     loading: false,
  //     error: null
  //   }
  // }),

  // /* load favorite activities error */
  // on(UserActions.UserLoadFavoriteActivitiesError, (state, { err }) => {
  //   return {
  //     ...state,
  //     loading: false,
  //     error: err
  //   }
  // }),

  // /* toggle favorite activity */
  // on(UserActions.UserToggleFavoriteActivity, state => {
  //   return {
  //     ...state,
  //     loading: true,
  //     error: null
  //   }
  // }),

  // /* toggle favorite activity success */
  // on(UserActions.UserToggleFavoriteActivitySuccess, (state, { favoriteActivities }) => {
  //   return {
  //     ...state,
  //     user: {
  //       ...state.user,
  //       favoriteActivities: favoriteActivities
  //     },
  //     loading: false,
  //     error: null
  //   }
  // }),

  // /* toggle favorite activity error */
  // on(UserActions.UserToggleFavoriteActivityError, (state, { err }) => {
  //   return {
  //     ...state,
  //     loading: false,
  //     error: err
  //   }
  // })

);

export function userReducer(state: UserState | undefined, action: Action) {
  return _userReducer(state, action);
}
