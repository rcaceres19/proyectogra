import firebase from 'firebase';
const Config = {
  apiKey: "AIzaSyATibiPHDX0Qjn1pXlprcmthF7CyRspfLU",
  authDomain: "test-638a2.firebaseapp.com",
  databaseURL: "https://test-638a2.firebaseio.com",
  projectId: "test-638a2",
  storageBucket: "test-638a2.appspot.com",
  messagingSenderId: "457501747106",
  appId: "1:457501747106:web:d4e9d9a721a7e8fc65b4fb",
  measurementId: "G-MC0XWPPYJE"
};

  firebase.initializeApp(Config);
  export default firebase;