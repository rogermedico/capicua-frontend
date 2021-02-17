// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  backend: {
    /* endpoint */
    api: 'http://localhost:80/capicua_intranet/capicua-backend/public/api/',

    /* auth */
    loginEndpoint: 'auth/login',
    logoutEndpoint: 'auth/logout',

    /* user */
    userEndpoint: 'user',
    changePasswordEndpoint: 'user/password',
    usersEndpoint: 'users',

    /* constants */
    userTypesEndpoint: 'constants/usertypes',
    courseTypesEndpoint: 'constants/coursetypes',

    /* course */
    courseEndpoint: 'course',

    /* email */
    verifyEmailEndpoint: 'email/verify',

    /* forgot password */
    forgotPasswordEndpoint: 'password/forgot',
    resetPasswordEndpoint: 'password/reset',

  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
