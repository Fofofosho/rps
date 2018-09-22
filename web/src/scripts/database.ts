import * as MainApp from '../app';

export class FirebaseDatabaseService {
    db: any;
    constructor() {
        const app: MainApp = new MainApp();
        this.db = app.database();
    }

    writeUserData(userId: String, name: String, email: String, imageUrl: String) {
        this.db.ref('users/' + userId).set({
            username: name,
            email: email,
            profile_picture : imageUrl
        });
    }
}
