import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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
const db = getFirestore(app);

async function testFirestore() {
    try {
        console.log("Attempting to write to Firestore...");
        await setDoc(doc(db, "test_connection", "ping"), {
            timestamp: new Date().toISOString()
        });
        console.log("SUCCESS! Firestore is reachable and writable.");
    } catch(e) {
        console.error("FIRESTORE ERROR:", e.message);
    }
    process.exit(0);
}

testFirestore();
