import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyCbpzZiAUVGKiGUec3aBG1qD_2OFosaDyU',
  authDomain: 'chatgpt-ai-41cd9.firebaseapp.com',
  projectId: 'chatgpt-ai-41cd9',
  storageBucket: 'chatgpt-ai-41cd9.appspot.com',
  messagingSenderId: '710195620212',
  appId: '1:710195620212:web:4619d593b9e88473b96421',
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }