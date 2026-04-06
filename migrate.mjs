import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import fs from 'fs';

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
const auth = getAuth(app);
const db = getFirestore(app);

const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));

async function migrate() {
    for (const u of users) {
        try {
            console.log(`Creating ${u.email}...`);
            const cred = await createUserWithEmailAndPassword(auth, u.email, u.password);
            await setDoc(doc(db, "users", cred.user.uid), {
                uid: cred.user.uid,
                email: u.email,
                name: u.name,
                progress: u.progress || {}
            });
            console.log(`Success: ${u.email}`);
        } catch(e) {
            console.log(`Failed or already exists for ${u.email}:`, e.message);
        }
    }
    console.log("Migration complete!");
    process.exit(0);
}

migrate();
