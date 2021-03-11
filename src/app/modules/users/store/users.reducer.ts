import { UsersState } from './users.state';
import * as UsersActions from './users.action';
import { Action, createReducer, on } from '@ngrx/store';
import { User } from '@models/user.model';
import { Course } from '@models/course.model';
import { Education } from '@models/education.model';
import { Language } from '@models/language.model';
import { UserDocument } from '@models/document.model';
import { USER_DOCUMENTS } from '@constants/documents.constant';

/* the auth state starts with no one logged in */
const defaultUsersState: UsersState = {
  users: null,
  loading: false,
  loaded: true,
  error: null
};

const _usersReducer = createReducer(defaultUsersState,

  /* get data */
  on(UsersActions.UsersGetAll, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* get data success */
  on(UsersActions.UsersGetAllSuccess, (state, { users }) => {
    return {
      ...state,
      users: state.users === null ? users : users.map(newUser => {
        const oldUser = state.users.find(oldUser => oldUser.id === newUser.id);

        return {
          ...newUser,
          avatarFile: oldUser.avatarFile,
          documents: oldUser.documents
        }

      }),
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* reset data */
  on(UsersActions.UsersReset, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* reset data success */
  on(UsersActions.UsersResetSuccess, state => {
    return {
      ...state,
      users: null,
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* create user */
  on(UsersActions.UsersCreate, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* create user success */
  on(UsersActions.UsersCreateSuccess, (state, { user }) => {
    console.log('reducer usercreatesuccess', user)
    return {
      ...state,
      users: [...state.users, user],
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* edit */
  on(UsersActions.UsersEdit, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* edit success */
  on(UsersActions.UsersEditSuccess, (state, { editedUser }) => {

    return {
      ...state,
      users: state.users.map((user: User) => {
        if (user.id != editedUser.id) return user;
        else return {
          ...editedUser,
          avatarFile: user.avatarFile
        }
      }),
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* get avatar */
  on(UsersActions.UsersAvatarGet, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* get avatar success */
  on(UsersActions.UsersAvatarGetSuccess, (state, { userId, avatar }) => {

    return {
      ...state,
      users: state.users.map((u: User) => {
        if (u.id != userId) {
          return u;
        }
        else {
          return {
            ...u,
            avatarFile: avatar
          }
        }
      }),
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* get dni */
  on(UsersActions.UsersDniGet, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* get dni success */
  on(UsersActions.UsersDniGetSuccess, (state, { userId, dni }) => {
    return {
      ...state,
      users: state.users.map((u: User) => {
        if (u.id != userId) {
          return u;
        }
        else {
          return {
            ...u,
            documents: u.documents.map((document: UserDocument) => {
              if (document.name != USER_DOCUMENTS.dni) return document;
              else {
                return {
                  ...document,
                  file: dni
                }
              }
            })
          }
        }
      }),
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* get offenses */
  on(UsersActions.UsersOffensesGet, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* get offenses success */
  on(UsersActions.UsersOffensesGetSuccess, (state, { userId, offenses }) => {
    return {
      ...state,
      users: state.users.map((u: User) => {
        if (u.id != userId) {
          return u;
        }
        else {
          return {
            ...u,
            documents: u.documents.map((document: UserDocument) => {
              if (document.name != USER_DOCUMENTS.sexOffenseCertificate) return document;
              else {
                return {
                  ...document,
                  file: offenses
                }
              }
            })
          }
        }
      }),
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* activate */
  on(UsersActions.UsersActivate, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* activate success */
  on(UsersActions.UsersActivateSuccess, (state, { userId }) => {

    return {
      ...state,
      users: state.users.map((u: User) => {
        if (u.id != userId) {
          return u;
        }
        else {
          return {
            ...u,
            deactivated: false
          }
        }
      }),
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* deactivate */
  on(UsersActions.UsersDeactivate, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* deactivate success */
  on(UsersActions.UsersDeactivateSuccess, (state, { userId }) => {

    return {
      ...state,
      users: state.users.map((u: User) => {
        if (u.id != userId) {
          return u;
        }
        else {
          return {
            ...u,
            deactivated: true
          }
        }
      }),
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* delete */
  on(UsersActions.UsersDelete, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* delete success */
  on(UsersActions.UsersDeleteSuccess, (state, { userId }) => {

    return {
      ...state,
      users: state.users.filter((user: User) => user.id != userId),
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* error */
  on(UsersActions.UsersError, (state, { err }) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      error: err
    }
  }),


);

export function usersReducer(state: UsersState | undefined, action: Action) {
  return _usersReducer(state, action);
}
