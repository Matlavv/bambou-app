import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAFtoPexXnFxz7DM3Gb6k6LndbcQhc0-zs",
  authDomain: "bambou-5e77d.firebaseapp.com",
  projectId: "bambou-5e77d",
  storageBucket: "bambou-5e77d.appspot.com",
  messagingSenderId: "1033466150582",
  appId: "1:1033466150582:web:a51bc03c3017f12289f017",
  measurementId: "G-X51RY061C4",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
