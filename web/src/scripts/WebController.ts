import { FirebaseService } from "./FirebaseService";
import loginHtml from "../html/login.html";

export default class WebController {

    firebaseConfig: FirebaseService;

    constructor(firebaseConfig: FirebaseService) {
        this.firebaseConfig = firebaseConfig;
    }

    getLoginHtml() {
        console.log("html string", loginHtml);

        const contentHtml:HTMLElement = document.getElementById("content")!;
        contentHtml.innerHTML = loginHtml;
    }
}
