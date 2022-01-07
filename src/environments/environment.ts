// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  auth0: {
    clientID: "O2YX3Hev9uifeAhNUttWyMVwUS9XsH3W",
    domain: "dev-nss1-ctg.us.auth0.com",
    redirectUri: "http://localhost:4200",
    logoutUrl: "http://localhost:4200"
  },
  firebase: {
    projectId: 'banger-1',
    appId: '1:142994724116:web:5cd11a559f3ce4885e5e01',
    storageBucket: 'banger-1.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyB-WPDz_LYLkOVPMg2hq9YjHj141HyPR7M',
    authDomain: 'banger-1.firebaseapp.com',
    messagingSenderId: '142994724116',
  },
  production: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
