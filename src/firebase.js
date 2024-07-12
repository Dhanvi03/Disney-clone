import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAJKyJ0ON6cvXUI6dGjuRK4NtDWO34Vmvs",
    authDomain: "disneyplus-clone-cf99d.firebaseapp.com",
    projectId: "disneyplus-clone-cf99d",
    storageBucket: "disneyplus-clone-cf99d.appspot.com",
    messagingSenderId: "752997152203",
    appId: "1:752997152203:web:2245f46713ce8764a1f24e",
    measurementId: "G-43VRQXP0RK"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth= getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();
  const storage = getStorage(firebaseApp);

  export { auth, provider, storage};
  export default db;