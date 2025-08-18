// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    getAuth,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAB0iZdcmr8DI54qGhuUqpNf_OFcGgGomQ",
    authDomain: "worktable-2e9f2.firebaseapp.com",
    projectId: "worktable-2e9f2",
    storageBucket: "worktable-2e9f2.firebasestorage.app",
    messagingSenderId: "704223310557",
    appId: "1:704223310557:web:60353f38a7f97d15752134",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const createUser = async (email, password) => {
    return createUserWithEmailAndPassword(getAuth(app), email, password);
};

export const signInUser = async (email, password) => {
    return signInWithEmailAndPassword(getAuth(app), email, password);
};
