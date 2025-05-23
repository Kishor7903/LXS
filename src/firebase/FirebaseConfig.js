import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDqRLXgVYvin-eReEzZL4jDTTjg8t4THDw",
  authDomain: "sachin-kumar-24.firebaseapp.com",
  projectId: "sachin-kumar-24",
  storageBucket: "sachin-kumar-24.firebasestorage.app",
  messagingSenderId: "993289393235",
  appId: "1:993289393235:web:7e7a6809c84a2587d562a6",
  measurementId: "G-HZF7CCF6CQ",
  databaseURL: "https://lxs-39801-default-rtdb.firebaseio.com"
};

export const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const fireDB = getFirestore(app);

export { auth, fireDB };