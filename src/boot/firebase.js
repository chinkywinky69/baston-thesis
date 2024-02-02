import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAwWgB7CYvJsoTCxfyOgZJ2bljR4CsVV-E",
  authDomain: "baston-c07f4.firebaseapp.com",
  projectId: "baston-c07f4",
  storageBucket: "baston-c07f4.appspot.com",
  messagingSenderId: "771783882938",
  appId: "1:771783882938:web:9ba3a76bead805e2266a83",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { firebaseApp, auth, db, storage };
