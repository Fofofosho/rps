import { FirebaseService } from './scripts/FirebaseService';
import WebController from './scripts/WebController';

const firebase = new FirebaseService();
const webController = new WebController(firebase);

console.log('init occurred');
const initButton = document.getElementById("init")!;
initButton.addEventListener("click", initMain, false);
// function writeUserData (userId: String, name: String, email: String, imageUrl: String) {
//     console.log('WRITE USER DATA START');
//     firebase.writeUserData(userId, name, email, imageUrl);
// };

function initMain() {
    webController.checkFirebaseLogin();

    /* firebase.auth().onAuthStateChanged((user: String) => {
        if (user) {
            // User is signed in.
            console.log('user already signed in');
        }
        else {
            // No user is signed in.
            console.log('user already signed in');
        }
    }); */
}

initMain();

//writeUserData('32523352', 'jacob', 'jacob@dopplercreative.com', 'img/me.jpg');

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
