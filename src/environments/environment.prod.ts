export const environment = {
  production: true,
  backend: {
    /* endpoint */
    api: 'https://cb.magdapb.com/api/',

    /* auth */
    loginEndpoint: 'auth/login',
    logoutEndpoint: 'auth/logout',
    renewTokenEndpoint: 'auth/refresh',

    /* user */
    userEndpoint: 'user',
    changePasswordEndpoint: 'user/password',
    usersEndpoint: 'users',
    avatarEndpoint: 'user/avatar',
    dniEndpoint: 'user/dni',
    offensesEndpoint: 'user/offenses',

    /* admin users */
    activateEndpoint: 'user/activate',
    deactivateEndpoint: 'user/deactivate',

    /* personal documents */
    documentsEndpoint: 'documents',
    documentsInfoEndpoint: 'documents/info',

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
