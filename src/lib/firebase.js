import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAPURqNXE86MvgqZHLFlIbs2fN2SdRO7qk",
    authDomain: "shopdoanthaitien.firebaseapp.com",
    projectId: "shopdoanthaitien",
    storageBucket: "shopdoanthaitien.firebasestorage.app",
    messagingSenderId: "545068453271",
    appId: "1:545068453271:web:5a5d70bb4afb0d2e47c8d2",
    measurementId: "G-FP65FV0KS1",
    databaseURL: "https://shopdoanthaitien-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const rtdb = getDatabase(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
