import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvn8b-sGV-e2aBDYR4RLrQVYDNMQgGfe4",
  authDomain: "codegame-5d9cb.firebaseapp.com",
  projectId: "codegame-5d9cb",
  storageBucket: "codegame-5d9cb.firebasestorage.app",
  messagingSenderId: "936204653487",
  appId: "1:936204653487:web:d0ae25e90b75081c0e555a",
  measurementId: "G-DL8WPTL533"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
