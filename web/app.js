firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        console.log('user already signed in');
    }
    else {
        // No user is signed in.
        console.log('user already signed in');
    }
});