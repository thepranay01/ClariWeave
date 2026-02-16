
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPLPFZLqjCjSWNWn--5kGy9JuMHwpwiY0",
  authDomain: "clariweave-db.firebaseapp.com",
  projectId: "clariweave-db",
  storageBucket: "clariweave-db.firebasestorage.app",
  messagingSenderId: "690605216528",
  appId: "1:690605216528:web:154810c8e1039de7188b95",
  measurementId: "G-C32LQ6LD6L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, analytics, db, auth, storage };
