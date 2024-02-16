import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCFz4fAvraY8JidYGecH2LYfWwhEpiHwq8",
    authDomain: "juegosdecartas-e6d22.firebaseapp.com",
    projectId: "juegosdecartas-e6d22",
    storageBucket: "juegosdecartas-e6d22.appspot.com",
    messagingSenderId: "654075565266",
    appId: "1:654075565266:web:b8a5505bb9c0b3ef9d890b",
    measurementId: "G-8B03SZ04ET"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}