// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7V8P2406I-6NrRBguQHQ1yp6W1f-BpRc",
  authDomain: "vue3-e2b7c.firebaseapp.com",
  projectId: "vue3-e2b7c",
  storageBucket: "vue3-e2b7c.firebasestorage.app",
  messagingSenderId: "425938244526",
  appId: "1:425938244526:web:b00536eeea96e4f7ff2e3f",
  measurementId: "G-FSX9KWLV1W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }