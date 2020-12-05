import firebase from 'firebase'
const firebaseApp=firebase.initializeApp({
  apiKey: "AIzaSyBZq_sNN4AGXWV7GwrqGrZEUDT69SCKPb8",
  authDomain: "instagram-clone-628fc.firebaseapp.com",
  databaseURL: "https://instagram-clone-628fc.firebaseio.com",
  projectId: "instagram-clone-628fc",
  storageBucket: "instagram-clone-628fc.appspot.com",
  messagingSenderId: "72762184705",
  appId: "1:72762184705:web:070c821a535a27d1d45c00",
  measurementId: "G-HJX9DLM5QC"

})
const db=firebase.firestore()
const auth=firebase.auth()
const storage=firebase.storage()
export {db,auth,storage}