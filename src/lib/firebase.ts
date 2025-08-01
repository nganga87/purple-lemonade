// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCm9qL-u4roHndIxyUkLJzjI2YUojK7Ufo",
  authDomain: "addresschain.firebaseapp.com",
  databaseURL: "https://addresschain-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "addresschain",
  storageBucket: "addresschain.firebasestorage.app",
  messagingSenderId: "778140573949",
  appId: "1:778140573949:web:aecbfaef3a6d747c3a1e94",
  measurementId: "G-PP8GDBSRHJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// The following line will only work in a client-side context.
// You can check if window is defined to avoid running it on the server.
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, analytics };
