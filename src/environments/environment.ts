// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBPBlXU-zIkrtq4DJGoCipXW_77jG7-hzA',
    authDomain: 'whats-in-the-picture.firebaseapp.com',
    databaseURL: 'https://whats-in-the-picture.firebaseio.com',
    projectId: 'whats-in-the-picture',
    storageBucket: 'whats-in-the-picture.appspot.com',
    messagingSenderId: '348070881840'
  }
};
