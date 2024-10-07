// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// import { getAnalytics } from "firebase/analytics";



const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "ai-short-generator-f81ba.firebaseapp.com",
    projectId: "ai-short-generator-f81ba",
    storageBucket: "ai-short-generator-f81ba.appspot.com",
    messagingSenderId: "794179383871",
    appId: "1:794179383871:web:9cfc68107e2a97e51e3e8a",
    measurementId: "G-GM28QHVWSN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);