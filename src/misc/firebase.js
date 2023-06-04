import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
const config ={
    apiKey: "AIzaSyBqDFqB3auXWhP6PIBOjkq3od75MY1Q33o",
  authDomain: "chat-app-456ff.firebaseapp.com",
  projectId: "chat-app-456ff",
  storageBucket: "chat-app-456ff.appspot.com",
  messagingSenderId: "849328786426",
  appId: "1:849328786426:web:25d574c3559f4b3070f243",
  measurementId: "G-2S9BQE8LW9"
};
const app = firebase.initializeApp(config);
export const auth=app.auth();
export const database = app.database();