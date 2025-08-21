import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAB0iZdcmr8DI54qGhuUqpNf_OFcGgGomQ",
    authDomain: "worktable-2e9f2.firebaseapp.com",
    projectId: "worktable-2e9f2",
    storageBucket: "worktable-2e9f2.firebasestorage.app",
    messagingSenderId: "704223310557",
    appId: "1:704223310557:web:60353f38a7f97d15752134",
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Инициализация аутентификации
export const auth = getAuth(app);

// Инициализация Firestore
export const db = getFirestore(app);

// Инициализация Firebase Storage
export const storage = getStorage(app);

// Для регистрации
export const createUser = async (email, password) => {
    return createUserWithEmailAndPassword(getAuth(app), email, password);
};
//Для авторизации
export const signInUser = async (email, password) => {
    return signInWithEmailAndPassword(getAuth(app), email, password);
};

/**
 * Загружает изображение продукта в Firebase и возвращает URL.
 * @param {File} file - Файл изображения
 */
export async function uploadImage(file) {
    if (!file) return "";
    const storage = getStorage(app);
    const storageRef = ref(storage, `users/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
}

/**
 * Добавляет сотрудника.
 * @param {Object} form - Данные сотрудника
 * @param {File} file - Файл изображения
 */
export async function handleSubmitToDB(form, file) {
    //удаляем свойство file
    delete form.file;

    try {
        const imgSrc = await uploadImage(file);
        const data = { ...form, imgSrc };
        const docRef = await addDoc(collection(db, "users"), data);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
