import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import "firebase/storage"

var FirebaseConfig = {
  apiKey: "AIzaSyCnf6qghiLbGCzCHxu3ZYODJH3u-QbcawE",
  authDomain: "moneymix-f7423.firebaseapp.com",
  databaseURL: "https://moneymix-f7423.firebaseio.com",
  projectId: "moneymix-f7423",
  storageBucket: "moneymix-f7423.appspot.com",
  messagingSenderId: "811532239614",
  appId: "1:811532239614:web:0a13b097c4675298131baf",
  measurementId: "G-CX2DF9J5GX",
}

// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(FirebaseConfig)
}

export default firebase
