import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDn5_tQ-HOyd0V9ccI1vc3J6P9CNnAlKL4",
  authDomain: "m-city-a52b7.firebaseapp.com",
  databaseURL: "https://m-city-a52b7.firebaseio.com",
  projectId: "m-city-a52b7",
  storageBucket: "m-city-a52b7.appspot.com",
  messagingSenderId: "778515156585",
  appId: "1:778515156585:web:dd52991ad9e7a3c87edcf8",
  measurementId: "G-JDJKNRQ2P2"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const firbaseMatches = db.ref("matches");
const firbaseTeams = db.ref("teams");
const firbasePromotions = db.ref("promotions");
const firbasePlayers = db.ref("players");
export {
  firebase,
  firbaseMatches,
  firbasePromotions,
  db,
  firbaseTeams,
  firbasePlayers
};
