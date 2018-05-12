import * as functions from 'firebase-functions';
import { DataSnapshot } from 'firebase-functions/lib/providers/database';
// tslint:disable-next-line:no-duplicate-imports
import { EventContext } from 'firebase-functions';

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
