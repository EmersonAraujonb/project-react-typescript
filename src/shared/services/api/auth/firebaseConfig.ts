import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDQHqUcWtUJYGm3I3JE1svIOwSEARL0xqs',
  authDomain: 'cadastro-37800.firebaseapp.com',
  projectId: 'cadastro-37800',
  storageBucket: 'cadastro-37800.appspot.com',
  messagingSenderId: '907154965374',
  appId: '1:907154965374:web:d637d6b030df2e7afba92f',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);