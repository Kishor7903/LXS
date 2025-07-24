import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBKL2I-Gv82X-q47RQzaz86vCK7DQuaTIQ",
  authDomain: "lxslifestylestore-8935b.firebaseapp.com",
  databaseURL: "https://lxslifestylestore-8935b-default-rtdb.firebaseio.com",
  projectId: "lxslifestylestore-8935b",
  storageBucket: "lxslifestylestore-8935b.firebasestorage.app",
  messagingSenderId: "800913751199",
  appId: "1:800913751199:web:b5dd70daaf8faa1a6cb6aa",
  measurementId: "G-Z76G0DFHRP"
};

export const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const fireDB = getFirestore(app);

export { auth, fireDB };