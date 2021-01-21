import React, { useEffect, useState } from "react";
import firebase from "firebase";
import "antd/dist/antd.css";
import "./App.scss";

import { DataContext, FirestoreContext } from "./Contexts";
import FB from "./firebaseApi";
import DataApi from "./dataApi/dataApi";
import LoginForm from "./login/LoginForm";
import { Dashboard } from "./Dashboard";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { firestore, user } = useAuth();

  const dataApi = new DataApi();

  return (
    <FirestoreContext.Provider value={{ fs: firestore }}>
      <DataContext.Provider value={{ dataApi }}>
        <div className="App">
          <header className="App-header">
            <h1>IR-0</h1>
          </header>
          {!user && <LoginForm />}
          {user && <Dashboard />}
        </div>
      </DataContext.Provider>
    </FirestoreContext.Provider>
  );
}

export default App;
