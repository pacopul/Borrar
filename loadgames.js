import fetch from 'node-fetch';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import firebaseConfig from "./firebaseConfig.json" assert {type: "json"};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
var db = getFirestore(app);
let url = "http://www.ies-azarquiel.es/paco/apichistes/categorias";
let settings = { method: "Get" };
fetch(url, settings)
  .then(res => res.json())
  .then((json) => {
       json.categorias.forEach(function (obj) {
       try {
           addDoc(collection(db, "categorias"), {
               id: obj.id,
               name: obj.nombre
           });
       } catch (e) {
           console.error("Error adding document: ", e);
       }
      });
  });
