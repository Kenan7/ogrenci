import * as firebase from "firebase";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
export const TumOgrenciler = db.collection("ogrenci");
console.log(TumOgrenciler);

export default firebaseApp.firestore();
