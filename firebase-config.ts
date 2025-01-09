import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBrkJtcE5fzSRzS7QMmLoJop_1tdrwCTz0',
  authDomain: 'loom-and-stitch.firebaseapp.com',
  projectId: 'loom-and-stitch',
  storageBucket: 'loom-and-stitch.firebasestorage.app',
  messagingSenderId: '1012845391719',
  appId: '1:1012845391719:web:fa1bcf5791a14ee36689c2',
  measurementId: 'G-G9SDTLVHD7',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
