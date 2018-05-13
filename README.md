## To start running the front-end:
1. Use the visual studio Express plugin that host's your site on a random port.
2. Travel to either of the HTML pages


## To start working with the cloud functions, here are some resources:
1. https://firebase.google.com/docs/functions/
2. https://firebase.google.com/docs/functions/typescript


Currently we are using the triggers on the functions in order to invoke our logic. For example, you can trigger when different products within Firebase are used and when certain events occur. We have triggers for `user.create`, `user.delete`, `database.ref.onCreate`.

### To deploy the cloud functions
1. Make sure you are logged into the firebase cli. If not try `firebase login`
2. To make a change to our cloud functions that are running in the cloud, run the npm script, `npm run deploy` or `firebase deploy`. This will identify any updates that were made the functions and correctly update our project for us. _pretty cool_ :+1:
