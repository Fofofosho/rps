const express = require('express');
const app = express();
const fb = require('./firebaseConfig.js');
fb.initializeApp();

app.get('/', (_, res) => {
    if (fb.getCurrentUser() != undefined) {
        res.sendFile("/index.html", { root: __dirname });
    } else {
        res.redirect("/login");
    }
});

app.get('/login', (_, res) => res.sendFile("/login.html", { root: __dirname + '/pages/login/' }));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
