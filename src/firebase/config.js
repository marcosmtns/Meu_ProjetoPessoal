import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLTZGoHJkvUbYtFAmd6ApJ7SfUtKqvmgE",
  authDomain: "cards-d2ac8.firebaseapp.com",
  projectId: "cards-d2ac8",
  storageBucket: "cards-d2ac8.appspot.com",
  messagingSenderId: "151484202420",
  appId: "1:151484202420:web:48d53ee3d8e71686b406e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};