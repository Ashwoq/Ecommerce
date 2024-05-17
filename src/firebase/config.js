import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_FB_API_KEY,
  authDomain: "e-commerce-ashwoq.firebaseapp.com",
  projectId: "e-commerce-ashwoq",
  storageBucket: "e-commerce-ashwoq.appspot.com",
  messagingSenderId: "648407722791",
  appId: "1:648407722791:web:771ab2dfb9b07c0e53d702",
  measurementId: "G-E27QQD8ENC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
