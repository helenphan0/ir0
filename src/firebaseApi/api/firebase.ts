import firebase from "firebase";
import "firebase/firestore";
import { all, collection, get, Doc } from "typesaurus";

import { IData, IDataQuery } from "models/common";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

export const isLoggedIn = (): boolean => {
  return !!firebase.auth().currentUser;
};

export const getDb = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  } else {
    firebase.app();
  }
  const firestore = firebase.firestore();
  // const database = firebase.database();
  // database.goOnline();

  return { firestore };
};

export const initializeFirebase = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const db = getDb();

  if (!isLoggedIn()) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);

      return db;
    } catch (e) {
      throw new Error(`${e.code}: ${e.message}`);
    }
  }

  return db;
};

export const getCollectionData = async (dataQuery: IDataQuery) => {
  const {
    collectionKey,
    collectionValue,
    subCollectionKey,
  } = dataQuery;
  if (!collectionKey || !collectionValue) return;

  try {
    const collectionRef = collection<IData>(collectionKey);
    const doc: Doc<IData> | null = await get(collectionRef, collectionValue);

    if (!subCollectionKey) return doc && doc.data;

    const subDoc = await getSubCollectionData(dataQuery);

    return subDoc;
  } catch (err) {
    throw new Error(
      `Could not find document: ${collectionValue} in collection: ${collectionKey}`
    );
  }
};

export const getSubCollectionData = async ({
  collectionKey,
  collectionValue,
  subCollectionKey,
  subCollectionValue,
}: IDataQuery) => {
  if (!collection || !subCollectionKey) return;

  try {
    const subCollectionRef = collection<IData>(
      `${collectionKey}/${collectionValue}/${subCollectionKey}`
    );

    if (!subCollectionValue) {
      const subDocRef = await all(subCollectionRef);
      const data = (subDocRef || []).map((subDocRef) => subDocRef.data);

      return data;
    }

    const subDoc = await get(subCollectionRef, subCollectionValue);
    return subDoc && subDoc.data;
  } catch (err) {
    throw new Error(
      `Could not find document: ${subCollectionValue} in subcollection: ${subCollectionKey}`
    );
  }
};
