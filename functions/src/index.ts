import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { DataSnapshot } from 'firebase-functions/lib/providers/database';
// tslint:disable-next-line:no-duplicate-imports
import { EventContext } from 'firebase-functions';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import { utimesSync } from 'fs';
admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

export const onCreate = functions.database.ref('/users/{userId}/email')
    .onCreate((snapshot: DataSnapshot, context: EventContext) => {
        const email: string = snapshot.val();

        console.log('The user id was', context.params.userId, email);
        const uppercaseEmail: string = email.toUpperCase();
        // You must return a Promise when performing asynchronous tasks inside a Functions such as
        // writing to the Firebase Realtime Database.
        // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
        return snapshot.ref.parent.child('uppercaseEmail').set(uppercaseEmail);
    });

exports.addUser = functions.auth.user().onCreate((user: UserRecord) => {
    const uid: string = user.uid;
    const email: string = user.email;
    const displayName: string = user.displayName;
    const photoURL: string = user.photoURL;

    return admin.database().ref('/users/' + uid).set({
        username: displayName,
        email: email,
        profile_picture : photoURL
    }).then(() => {
        return { newEmail: email }
    })
    .catch((error) => {
        throw new functions.https.HttpsError('unknown', error.message, error);
    });
});

exports.deletedUser = functions.auth.user().onDelete((user: UserRecord) => {
    // Get the uid of the deleted user.
    const uid: string = user.uid;

    // Remove the user from your Realtime Database's /users node.
    return admin.database().ref("/users/" + uid).remove()
        .then(() => {
            return { success: 'deleted user!' }
        })
        .catch((error) => {
            throw new functions.https.HttpsError('unknown', error.message, error);
        });
});
