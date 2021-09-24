import firebase from "firebase";
import "firebase/firestore";
import { all, collection, get, upset, update, Doc } from "typesaurus";
import { inc } from "semver";

import { IData, IDataQuery } from "../../models/common";

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

export const initializeFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  } else {
    firebase.app();
  }
  const firestore = firebase.firestore();
  const database = firebase.database();
  database.goOnline();

  return { firestore, realtime: database };
};


export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);

    return firebase.auth().currentUser;
  } catch (e) {
    throw new Error(`${e.code}: ${e.message}`);
  }
};

export const getCollectionData = async (
  dataQuery: IDataQuery
): Promise<IData | null> => {
  const { collectionKey, collectionValue, subCollectionKey } = dataQuery;
  if (!collectionKey || !collectionValue) return null;

  try {
    const collectionRef = collection<IData>(collectionKey);
    const doc: Doc<IData> | null = await get(collectionRef, collectionValue);

    if (!subCollectionKey) return doc && doc.data;

    const subDoc = await getSubCollectionData(dataQuery);

    return subDoc;
  } catch (err) {
    console.log("Error on GET collection", err);
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
}: IDataQuery): Promise<IData | null> => {
  if (!collection || !subCollectionKey) return null;

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
    console.log("Error on GET subcollection", err);
    throw new Error(
      `Could not find document: ${subCollectionValue} in subcollection: ${subCollectionKey}`
    );
  }
};

export const setCollectionData = async (
  dataQuery: IDataQuery
): Promise<IData | null> => {
  const {
    collectionKey,
    collectionValue,
    subCollectionKey,
    subCollectionValue,
    updateValue,
  } = dataQuery;

  if (!collectionKey || !collectionValue || !updateValue) return null;

  if (collectionKey === "verses" && subCollectionKey === "assets") {
    await updateVerseVersion(collectionValue);
  }

  const path = getCollectionPath(dataQuery);
  const collectionRef = collection(path);
  const updateId = subCollectionValue || collectionValue;

  try {
    await upset<IData | undefined>(collectionRef, updateId, updateValue);
    const result = await get<IData | null>(collectionRef, updateId);

    return result && result.data;
  } catch (err) {
    console.log("Error on Update collection", err);
    throw new Error(`Could not update document: ${updateId} in collection`);
  }
};

function getCollectionPath(dataQuery: IDataQuery): string {
  const { collectionKey, collectionValue, subCollectionKey } = dataQuery;

  let path = collectionKey;
  if (!subCollectionKey) {
    return path;
  }

  return `${path}/${collectionValue}/${subCollectionKey}`;
}

async function updateVerseVersion(verseId: string): Promise<void> {
  try {
    const verseRef = collection<IData>("verses");
    const result = await get<IData | null>(verseRef, verseId);

    if (!result || !result.data) return;

    const verse = result.data;
    if (!verse.version) return;

    const version = inc(verse.version, "patch");
    await update<IData | undefined>(verseRef, verseId, {
      version: version,
    } as any);
  } catch (e) {
    console.log(`Failed to update verse ${verseId} version`);
  }
}
