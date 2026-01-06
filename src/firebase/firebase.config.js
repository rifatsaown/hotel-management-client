// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCdTKJkHMiCqEAVETiW8M1W7kkLQWDx53Q",
  authDomain: "galaxies-hotel.firebaseapp.com",
  projectId: "galaxies-hotel",
  storageBucket: "galaxies-hotel.firebasestorage.app",
  messagingSenderId: "482025722224",
  appId: "1:482025722224:web:9a2bbe3efc863181417fb5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;