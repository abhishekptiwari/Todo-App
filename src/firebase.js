import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAdstwVbll7Kz126zBX-zjCjG65HOTj5bkk",
        authDomain: "todo-app-cp-303cc.firebaseqapp.com",
        projectId: "todo-app-cp-303cc",
        storageBucket: "todo-app-cp-303cc.appspot.com",
        messagingSenderId: "927138404380",
        appId: "1:927138404380:web:13e6734c2ff3658a11e7d9",
        measurementId: "G-8XSCXYXRKW"
});

const db = firebaseApp.firestore();
export default db;
