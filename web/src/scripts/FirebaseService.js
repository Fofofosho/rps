import firebase from 'firebase';
//import 'firebase/database';

const config = {
    apiKey: "AIzaSyC6wtyQ4xvSG330Tjmt04OCto0oyxsoNBc",
    authDomain: "rockpaperscissors-1e6d3.firebaseapp.com",
    databaseURL: "https://rockpaperscissors-1e6d3.firebaseio.com",
    projectId: "rockpaperscissors-1e6d3",
    storageBucket: "rockpaperscissors-1e6d3.appspot.com",
    messagingSenderId: "907654155517"
};

export class FirebaseService {
    constructor() {
        firebase.initializeApp(config);
        this.db = firebase.database();
        // console.log(`check firebase ${JSON.stringify(this.app)}`);
    }
    
    writeUserData(userId, name, email, imageUrl) {
        // this.db.ref('users/' + userId).set({
        //     username: name,
        //     email: email,
        //     profile_picture : imageUrl
        // });
        console.log('faked lol');
    }

    deleteUser(userId) {
        
    }

    //sign in or out of an account
    toggleSignIn() {
        if (!firebase.auth().currentUser) {
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
            firebase.auth().signInWithPopup(provider).then(function (result) {
                var token = result.credential.accessToken;
                var user = result.user;
                document.getElementById('quickstart-oauthtoken').textContent = token;
            }).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                if (errorCode === 'auth/account-exists-with-different-credential') {
                    alert('You have already signed up with a different auth provider for that email.');
                } else {
                    console.error(error);
                }
            });
        } 
        else { firebase.auth().signOut(); }
        document.getElementById('quickstart-sign-in').disabled = true;
    }

    verifyLogin() {
        firebase.auth().onAuthStateChanged((user) => {
            return user;
        });
    }
}
