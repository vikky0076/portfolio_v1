import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIMZG1vn8dCfpFM3GtrRESFRpLvZLrxuw",
  authDomain: "portfolio-c144c.firebaseapp.com",
  projectId: "portfolio-c144c",
  storageBucket: "portfolio-c144c.firebasestorage.app",
  messagingSenderId: "257836673501",
  appId: "1:257836673501:web:c46646366280973f3aae34",
  measurementId: "G-YR0WS181EQ"
};

// Initialize Firebase (safeguarded for Next.js SSR hot reloading)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// Initialize Firestore with offline persistence enabled
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});

export { app, auth, db };
