import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

const config={
    apiKey: "AIzaSyBsKd-BpULr46Iyv1UsRZqbEO8tevMAW4k",
    authDomain: "crwn-db-c9802.firebaseapp.com",
    databaseURL: "https://crwn-db-c9802.firebaseio.com",
    projectId: "crwn-db-c9802",
    storageBucket: "crwn-db-c9802.appspot.com",
    messagingSenderId: "668809672829",
    appId: "1:668809672829:web:f91353d430fc43f64f5914",
    measurementId: "G-3LV8CZ4VHC"
}

export const createUserProfileDocument= async (userAuth, additionalData)=>{
    if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;

};

export const addCollectionDocuments =async (collectionKey, objectsToAdd)=>{
  //collection reference will give us collection snapshot
  const collectionRef = firestore.collection(collectionKey);
  //to write multiple files inside firestore
  const batch = firestore.batch();
  objectsToAdd.forEach(obj=>{
    //inside doc we pass id to be set for that document, but here we want autogenerated id 
    //so we are not passing anything inside doc()
    //new DocRef is a collection snapshot object consist of array of document snapshot
    const newDocRef= collectionRef.doc();
    //batch.set will add the object inside collection
   batch.set(newDocRef, obj)
  });

  //this will return promise so convert it into async-await
 return await batch.commit();


  
}


firebase.initializeApp(config);

export const auth= firebase.auth();
export const firestore= firebase.firestore();

const provider= new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account' })
export const signInWithGoogle= ()=>auth.signInWithPopup(provider)

export default firebase;