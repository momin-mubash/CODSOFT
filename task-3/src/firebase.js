import { initializeApp } from 'firebase/app';
import { getAuth ,signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAktl4csCrkAUAC0V46cFbmLABww6xQVBM",
  authDomain: "blog-platform-7fc44.firebaseapp.com",
  projectId: "blog-platform-7fc44",
  storageBucket: "blog-platform-7fc44.appspot.com",
  messagingSenderId: "29625207328",
  appId: "1:29625207328:web:92b278a4e3a2130b178a45"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
