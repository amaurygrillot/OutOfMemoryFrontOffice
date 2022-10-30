// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  baseUrl: 'https://outofmemoryerror-back.azurewebsites.net',
  apiUrl: 'https://outofmemoryerror-back.azurewebsites.net/api',
  apiLocalUrl: 'http://localhost:3000/api',
  CODE_EXECUTOR_URL : 'https://outofmemoryerror-code-executer-container.azurewebsites.net',
  API_URL : 'https://outofmemoryerror-back.azurewebsites.net/api',
  firebase: {
    projectId: 'outofmemoryfront',
    appId: '1:1042060114582:web:6e8a8f1e288f5108d520b7',
    storageBucket: 'outofmemoryfront.appspot.com',
    apiKey: 'AIzaSyB8PEXQa_ypWy29HUbKRnEnb3igj5hx5ZY',
    authDomain: 'outofmemoryfront.firebaseapp.com',
    messagingSenderId: '1042060114582',
    measurementId: 'G-S38BEN3FJZ',
  },
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
