import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA1RLG2MwVpliQqueXd8WS-jBURnFLwYdc",
    authDomain: "lee-todo.firebaseapp.com",
    projectId: "lee-todo",
    storageBucket: "lee-todo.appspot.com",
    messagingSenderId: "468706383219",
    appId: "1:468706383219:web:e81e5f07825e55364ce106",
    measurementId: "G-2VW3QT23M1"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);