// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7WbKvqh3afjHTih9EDGytrERJTbLvhpo",
  authDomain: "form-40524.firebaseapp.com",
  projectId: "form-40524",
  storageBucket: "form-40524.firebasestorage.app",
  messagingSenderId: "198230056366",
  appId: "1:198230056366:web:8dcae347ed3bccc6b27c3f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }