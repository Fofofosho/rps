var firebase = require('firebase');

console.log('loaded firebase config');

var _db;
var _auth;
var _currentUser;

exports.initializeApp = () => {
    // Initialize Firebase
    const config = {
        apiKey: "AIzaSyC6wtyQ4xvSG330Tjmt04OCto0oyxsoNBc",
        authDomain: "rockpaperscissors-1e6d3.firebaseapp.com",
        databaseURL: "https://rockpaperscissors-1e6d3.firebaseio.com",
        projectId: "rockpaperscissors-1e6d3",
        storageBucket: "rockpaperscissors-1e6d3.appspot.com",
        messagingSenderId: "907654155517"
    };

    firebase.initializeApp(config);

    // Firebase libs
    _db = firebase.database();
    _auth = firebase.auth();
    _currentUser = _auth.currentUser;
};

exports.getDb = () => {
    return _db;
};

exports.getAuth = () => {
    return _auth;
};

exports.getCurrentUser = () => {
    return _currentUser;
};
