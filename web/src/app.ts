import firebase from '@firebase/app';
// import 'firebase/auth';

export class MainApp {
    constructor() {
        return firebase.initializeApp({
            apiKey: "AIzaSyC6wtyQ4xvSG330Tjmt04OCto0oyxsoNBc",
            authDomain: "rockpaperscissors-1e6d3.firebaseapp.com",
            databaseURL: "https://rockpaperscissors-1e6d3.firebaseio.com",
            projectId: "rockpaperscissors-1e6d3",
            storageBucket: "rockpaperscissors-1e6d3.appspot.com",
            messagingSenderId: "907654155517"
        });
    }
}

// firebase.auth().onAuthStateChanged((user: String) => {
//     if (user) {
//         // User is signed in.
//         console.log('user already signed in');
//     }
//     else {
//         // No user is signed in.
//         console.log('user already signed in');
//     }
// });
