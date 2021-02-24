export const environment = {
  production: true,
  backend: {
    /* endpoint */
    api: 'http://capicua-backend.epizy.com/api/',

    /* auth */
    loginEndpoint: 'auth/login',
    logoutEndpoint: 'auth/logout',

    /* user */
    userEndpoint: 'user',
    changePasswordEndpoint: 'user/password',
    usersEndpoint: 'users',
    avatarEndpoint: 'user/avatar',

    /* constants */
    userTypesEndpoint: 'constants/usertypes',
    courseTypesEndpoint: 'constants/coursetypes',

    /* course */
    courseEndpoint: 'course',

    /* education */
    educationEndpoint: 'education',

    /* language */
    languageEndpoint: 'language',

    /* email */
    verifyEmailEndpoint: 'email/verify',

    /* forgot password */
    forgotPasswordEndpoint: 'password/forgot',
    resetPasswordEndpoint: 'password/reset',

  }
};
