// Your web app's Firebase configuration
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyAMix6N5YQ1XMM0ZC1Xjxr-egZgjs4ckVY",
  authDomain: "chatapp-e0bc1.firebaseapp.com",
  projectId: "chatapp-e0bc1",
  storageBucket: "chatapp-e0bc1.appspot.com",
  messagingSenderId: "150966920773",
  appId: "1:150966920773:web:b6ccd1761edab7890d252c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth, app}