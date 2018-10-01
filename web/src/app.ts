import { FirebaseService } from './scripts/FirebaseService';

let env = process.env.NODE_ENV || "development";
let config: Object;
if (env === 'development') {
    config = JSON.parse(atob(process.env.FIREBASE_CONFIG_DEV || ""));
} else {
    config = JSON.parse(atob(process.env.FIREBASE_CONFIG || ""));
}

console.log(`config test ${config}`);

const firebase = new FirebaseService(config);

console.log('init occurred');

function writeUserData (userId: String, name: String, email: String, imageUrl: String) {
    console.log('WRITE USER DATA START');
    firebase.writeUserData(userId, name, email, imageUrl);
};

writeUserData('32523352', 'jacob', 'jacob@dopplercreative.com', 'img/me.jpg');

// initDB(){
//     dbf.writeUserData('32523352', 'jacob', 'jacob@dopplercreative.com', 'img/me.jpg');
// }

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
