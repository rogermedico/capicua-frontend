import { HomeState } from './home.state';
import * as HomeActions from './home.action';
import { Action, createReducer, on } from '@ngrx/store';
import { User } from '@models/user.model';
import { Course } from '@models/course.model';
import { Education } from '@models/education.model';
import { Language } from '@models/language.model';
import { PersonalDocument, UserDocument } from '@models/document.model';
import { USER_DOCUMENTS } from '@constants/user-documents.constant';

/* the auth state starts with no one logged in */
const defaultHomeState: HomeState = {
  posts: null,
  loading: false,
  loaded: true,
  error: null
};

const _homeReducer = createReducer(defaultHomeState,

  /* get data */
  on(HomeActions.HomeGetAll, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* get data success */
  on(HomeActions.HomeGetAllSuccess, (state, { homePosts }) => {
    return {
      ...state,
      posts: state.posts === null ? homePosts : homePosts.map(newPost => {
        const oldPost = state.posts.find(oldPost => oldPost.id === newPost.id);
        return {
          ...newPost,
          documents: newPost.documents.map(doc => {
            const oldDocument = oldPost.documents.find(oldDoc => oldDoc.id === doc.id);
            if (oldDocument.file) {
              return {
                ...doc,
                file: oldDocument.file
              }
            }
            else return doc;
          })
        }

      }),
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* reset data */
  on(HomeActions.HomeReset, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* reset data success */
  on(HomeActions.HomeResetSuccess, state => {
    return {
      ...state,
      posts: null,
      loading: false,
      loaded: true,
      error: null
    }
  }),

  // /* create user */
  // on(HomeActions.HomeCreate, state => {
  //   return {
  //     ...state,
  //     loading: true,
  //     loaded: false,
  //     error: null
  //   }
  // }),

  // /* create user success */
  // on(HomeActions.HomeCreateSuccess, (state, { user }) => {
  //   console.log('reducer usercreatesuccess', user)
  //   return {
  //     ...state,
  //     users: [...state.users, user],
  //     loading: false,
  //     loaded: true,
  //     error: null
  //   }
  // }),

  // /* edit */
  // on(HomeActions.HomeEdit, state => {
  //   return {
  //     ...state,
  //     loading: true,
  //     loaded: false,
  //     error: null
  //   }
  // }),

  // /* edit success */
  // on(HomeActions.HomeEditSuccess, (state, { editedUser }) => {

  //   return {
  //     ...state,
  //     users: state.users.map((user: User) => {
  //       if (user.id != editedUser.id) return user;
  //       else return {
  //         ...editedUser,
  //         avatarFile: user.avatarFile
  //       }
  //     }),
  //     loading: false,
  //     loaded: true,
  //     error: null
  //   }
  // }),

  // /* get avatar */
  // on(HomeActions.HomeAvatarGet, state => {
  //   return {
  //     ...state,
  //     loading: true,
  //     loaded: false,
  //     error: null
  //   }
  // }),

  // /* get avatar success */
  // on(HomeActions.HomeAvatarGetSuccess, (state, { userId, avatar }) => {

  //   return {
  //     ...state,
  //     users: state.users.map((u: User) => {
  //       if (u.id != userId) {
  //         return u;
  //       }
  //       else {
  //         return {
  //           ...u,
  //           avatarFile: avatar
  //         }
  //       }
  //     }),
  //     loading: false,
  //     loaded: true,
  //     error: null
  //   }
  // }),

  // /* get dni */
  // on(HomeActions.HomeDniGet, state => {
  //   return {
  //     ...state,
  //     loading: true,
  //     loaded: false,
  //     error: null
  //   }
  // }),

  // /* get dni success */
  // on(HomeActions.HomeDniGetSuccess, (state, { userId, dni }) => {
  //   return {
  //     ...state,
  //     users: state.users.map((u: User) => {
  //       if (u.id != userId) {
  //         return u;
  //       }
  //       else {
  //         return {
  //           ...u,
  //           userDocuments: u.userDocuments.map((userDocument: UserDocument) => {
  //             if (userDocument.name != USER_DOCUMENTS.dni) return userDocument;
  //             else {
  //               return {
  //                 ...userDocument,
  //                 file: dni
  //               }
  //             }
  //           })
  //         }
  //       }
  //     }),
  //     loading: false,
  //     loaded: true,
  //     error: null
  //   }
  // }),

  // /* get offenses */
  // on(HomeActions.HomeOffensesGet, state => {
  //   return {
  //     ...state,
  //     loading: true,
  //     loaded: false,
  //     error: null
  //   }
  // }),

  // /* get offenses success */
  // on(HomeActions.HomeOffensesGetSuccess, (state, { userId, offenses }) => {
  //   return {
  //     ...state,
  //     users: state.users.map((u: User) => {
  //       if (u.id != userId) {
  //         return u;
  //       }
  //       else {
  //         return {
  //           ...u,
  //           userDocuments: u.userDocuments.map((userDocument: UserDocument) => {
  //             if (userDocument.name != USER_DOCUMENTS.sexOffenseCertificate) return userDocument;
  //             else {
  //               return {
  //                 ...userDocument,
  //                 file: offenses
  //               }
  //             }
  //           })
  //         }
  //       }
  //     }),
  //     loading: false,
  //     loaded: true,
  //     error: null
  //   }
  // }),

  // /* activate */
  // on(HomeActions.HomeActivate, state => {
  //   return {
  //     ...state,
  //     loading: true,
  //     loaded: false,
  //     error: null
  //   }
  // }),

  // /* activate success */
  // on(HomeActions.HomeActivateSuccess, (state, { userId }) => {

  //   return {
  //     ...state,
  //     users: state.users.map((u: User) => {
  //       if (u.id != userId) {
  //         return u;
  //       }
  //       else {
  //         return {
  //           ...u,
  //           deactivated: false
  //         }
  //       }
  //     }),
  //     loading: false,
  //     loaded: true,
  //     error: null
  //   }
  // }),

  // /* deactivate */
  // on(HomeActions.HomeDeactivate, state => {
  //   return {
  //     ...state,
  //     loading: true,
  //     loaded: false,
  //     error: null
  //   }
  // }),

  // /* deactivate success */
  // on(HomeActions.HomeDeactivateSuccess, (state, { userId }) => {

  //   return {
  //     ...state,
  //     users: state.users.map((u: User) => {
  //       if (u.id != userId) {
  //         return u;
  //       }
  //       else {
  //         return {
  //           ...u,
  //           deactivated: true
  //         }
  //       }
  //     }),
  //     loading: false,
  //     loaded: true,
  //     error: null
  //   }
  // }),

  // /* delete */
  // on(HomeActions.HomeDelete, state => {
  //   return {
  //     ...state,
  //     loading: true,
  //     loaded: false,
  //     error: null
  //   }
  // }),

  // /* delete success */
  // on(HomeActions.HomeDeleteSuccess, (state, { userId }) => {

  //   return {
  //     ...state,
  //     users: state.users.filter((user: User) => user.id != userId),
  //     loading: false,
  //     loaded: true,
  //     error: null
  //   }
  // }),

  // /* get all personal documents info */
  // on(HomeActions.HomeGetAllPersonalDocumentsInfo, state => {
  //   return {
  //     ...state,
  //     loading: true,
  //     loaded: false,
  //     error: null
  //   }
  // }),

  // /* get personal documents info success */
  // on(HomeActions.HomeGetAllPersonalDocumentsInfoSuccess, (state, { personalDocuments }) => {
  //   return {
  //     ...state,
  //     users: state.users.map((user: User) => {
  //       const userDocuments = personalDocuments.filter((pd: PersonalDocument) => pd.userId == user.id);
  //       return {
  //         ...user,
  //         personalDocuments: userDocuments.map(ud => {
  //           const oldDocument = user.personalDocuments.find(oldPd => oldPd.id == ud.id)
  //           if (oldDocument) return oldDocument;
  //           else return ud;
  //         })
  //       }
  //     }),
  //     loading: false,
  //     loaded: true,
  //     error: null
  //   }
  // }),

  // /* get personal document */
  // on(HomeActions.HomeGetPersonalDocument, state => {
  //   return {
  //     ...state,
  //     loading: true,
  //     loaded: false,
  //     error: null
  //   }
  // }),

  // /* get personal document success */
  // on(HomeActions.HomeGetPersonalDocumentSuccess, (state, { userId, documentId, personalDocument }) => {
  //   return {
  //     ...state,
  //     users: state.users.map((user: User) => {
  //       if (user.id != userId) return user;
  //       else return {
  //         ...user,
  //         personalDocuments: user.personalDocuments.map((pd: PersonalDocument) => {
  //           if (pd.id != documentId) return pd;
  //           else return {
  //             ...pd,
  //             file: personalDocument
  //           }
  //         })
  //       }
  //     }),
  //     loading: false,
  //     loaded: true,
  //     error: null
  //   }
  // }),

  // /* add personal document */
  // on(HomeActions.HomeAddPersonalDocument, state => {
  //   return {
  //     ...state,
  //     loading: true,
  //     loaded: false,
  //     error: null
  //   }
  // }),

  // /* add personal document success */
  // on(HomeActions.HomeAddPersonalDocumentSuccess, (state, { personalDocument }) => {
  //   return {
  //     ...state,
  //     users: state.users.map((user: User) => {
  //       if (user.id != personalDocument.userId) return user;
  //       else return {
  //         ...user,
  //         personalDocuments: [
  //           ...user.personalDocuments,
  //           personalDocument
  //         ]
  //       }
  //     }),
  //     loading: false,
  //     loaded: true,
  //     error: null
  //   }
  // }),

  // /* delete personal document */
  // on(HomeActions.HomeDeletePersonalDocument, state => {
  //   return {
  //     ...state,
  //     loading: true,
  //     loaded: false,
  //     error: null
  //   }
  // }),

  // /* delete personal document success */
  // on(HomeActions.HomeDeletePersonalDocumentSuccess, (state, { userId, documentId }) => {
  //   return {
  //     ...state,
  //     users: state.users.map((user: User) => {
  //       if (user.id != userId) return user;
  //       else return {
  //         ...user,
  //         personalDocuments: user.personalDocuments.filter((pd: PersonalDocument) => pd.id != documentId)
  //       }
  //     }),
  //     loading: false,
  //     loaded: true,
  //     error: null
  //   }
  // }),

  /* error */
  on(HomeActions.HomeError, (state, { err }) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      error: err
    }
  }),


);

export function homeReducer(state: HomeState | undefined, action: Action) {
  return _homeReducer(state, action);
}
