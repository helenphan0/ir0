import { useState, useEffect } from "react";
import firebase from "firebase";

import FB from '../firebaseApi';

export const useAuth = () => {
  const { firestore } = FB.initializeFirebase();

  const [state, setState] = useState(() => {
    const user = firebase.auth().currentUser;
    return {
      initializing: !user,
      user,
    };
  });

  function onChange(user: any) {
    setState({ initializing: false, user });
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(onChange);

    return () => unsubscribe();
  }, []);

  return { ...state, firestore };
};
