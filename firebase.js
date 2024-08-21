// firebaseConfig.js or firebase.js
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANm_aX6DshX9ZCagl7buR8wh9SI3Rmd3E",
  authDomain: "twitter-next-js-1c407.firebaseapp.com",
  projectId: "twitter-next-js-1c407",
  storageBucket: "twitter-next-js-1c407.appspot.com",
  messagingSenderId: "577149634752",
  appId: "1:577149634752:web:93fe296bd7dace6ceb0525"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);  // Pass the app instance
const storage = getStorage(app); // Pass the app instance

export default app;
export { db, storage };
