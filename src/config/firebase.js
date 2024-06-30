import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDM4N8rS4TJOz-3DR4c0uX7Ib-Tc0ETZHo',
  authDomain: 'yt-playlist-7fa47.firebaseapp.com',
  projectId: 'yt-playlist-7fa47',
  storageBucket: 'yt-playlist-7fa47.appspot.com',
  messagingSenderId: '86819738640',
  appId: '1:86819738640:web:6146bbfc465a000d2fe695',
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

//  timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }
