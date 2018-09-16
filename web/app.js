const fb = require('./firebaseConfig.js');

console.log('app loaded');

fb.getAuth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        console.log('user already signed in');
    }
    else {
        // No user is signed in.
        console.log('user already signed in');
    }
});

document.getElementById("myTextBtn").addEventListener("click", function(){
    this.innerHTML = "Hello World";
});
