import firebase from 'firebase'

require('@firebase/firestore')
var firebaseConfig = {
  apiKey: "AIzaSyB0slACKKTZAEuPYwZFsSesN8KLAiRQmWY",
  authDomain: "book-6ca70.firebaseapp.com",
  databaseURL: "https://book-6ca70.firebaseio.com",
  projectId: "book-6ca70",
  storageBucket: "book-6ca70.appspot.com",
  messagingSenderId: "887274316867",
  appId: "1:887274316867:web:c752570b078f82e57960f6",
  measurementId: "G-6ZQ3YRV35Y"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

  export default firebase.firestore()