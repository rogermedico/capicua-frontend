import { UsersState } from './users.state';
import * as UsersActions from './users.action';
import { Action, createReducer, on } from '@ngrx/store';
import { User } from '@models/user.model';
import { PersonalDocument, UserDocument } from '@models/document.model';
import { USER_DOCUMENTS } from '@constants/user-documents.constant';

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
          userDocuments: oldUser.userDocuments,
          personalDocuments: oldUser.personalDocuments,
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
            userDocuments: u.userDocuments.map((userDocument: UserDocument) => {
              if (userDocument.name != USER_DOCUMENTS.dni) return userDocument;
              else {
                return {
                  ...userDocument,
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
            userDocuments: u.userDocuments.map((userDocument: UserDocument) => {
              if (userDocument.name != USER_DOCUMENTS.sexOffenseCertificate) return userDocument;
              else {
                return {
                  ...userDocument,
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

  /* get cv */
  on(UsersActions.UsersCVGet, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* get cv success */
  on(UsersActions.UsersCVGetSuccess, (state, { userId, cv }) => {
    return {
      ...state,
      users: state.users.map((u: User) => {
        if (u.id != userId) {
          return u;
        }
        else {
          return {
            ...u,
            userDocuments: u.userDocuments.map((userDocument: UserDocument) => {
              if (userDocument.name != USER_DOCUMENTS.cv) return userDocument;
              else {
                return {
                  ...userDocument,
                  file: cv
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

  /* get all personal documents info */
  on(UsersActions.UsersGetAllPersonalDocumentsInfo, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* get personal documents info success */
  on(UsersActions.UsersGetAllPersonalDocumentsInfoSuccess, (state, { personalDocuments }) => {
    return {
      ...state,
      users: state.users.map((user: User) => {
        const userDocuments = personalDocuments.filter((pd: PersonalDocument) => pd.userId == user.id);
        return {
          ...user,
          personalDocuments: userDocuments.map(ud => {
            const oldDocument = user.personalDocuments.find(oldPd => oldPd.id == ud.id)
            if (oldDocument) return oldDocument;
            else return ud;
          })
        }
      }),
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* get personal document */
  on(UsersActions.UsersGetPersonalDocument, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* get personal document success */
  on(UsersActions.UsersGetPersonalDocumentSuccess, (state, { userId, documentId, personalDocument }) => {
    return {
      ...state,
      users: state.users.map((user: User) => {
        if (user.id != userId) return user;
        else return {
          ...user,
          personalDocuments: user.personalDocuments.map((pd: PersonalDocument) => {
            if (pd.id != documentId) return pd;
            else return {
              ...pd,
              file: personalDocument
            }
          })
        }
      }),
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* add personal document */
  on(UsersActions.UsersAddPersonalDocument, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* add personal document success */
  on(UsersActions.UsersAddPersonalDocumentSuccess, (state, { personalDocument }) => {
    return {
      ...state,
      users: state.users.map((user: User) => {
        if (user.id != personalDocument.userId) return user;
        else return {
          ...user,
          personalDocuments: [
            ...user.personalDocuments,
            personalDocument
          ]
        }
      }),
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* delete personal document */
  on(UsersActions.UsersDeletePersonalDocument, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* delete personal document success */
  on(UsersActions.UsersDeletePersonalDocumentSuccess, (state, { userId, documentId }) => {
    return {
      ...state,
      users: state.users.map((user: User) => {
        if (user.id != userId) return user;
        else return {
          ...user,
          personalDocuments: user.personalDocuments.filter((pd: PersonalDocument) => pd.id != documentId)
        }
      }),
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
