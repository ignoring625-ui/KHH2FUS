import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsW17VpmpeFdZkry6CJAWW6R-Veg-DbvI",
  authDomain: "khh2pus.firebaseapp.com",
  projectId: "khh2pus",
  storageBucket: "khh2pus.firebasestorage.app",
  messagingSenderId: "1011769543114",
  appId: "1:1011769543114:web:a974091d7f4709e50d2733"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 同步資料的工具
export const saveToCloud = async (data) => {
  await setDoc(doc(db, "app_state", "main"), data, { merge: true });
};

// 監聽雲端的工具
export const listenToCloud = (callback) => {
  return onSnapshot(doc(db, "app_state", "main"), (doc) => {
    if (doc.exists()) callback(doc.data());
  });
};
