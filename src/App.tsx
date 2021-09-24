import React from "react";
import "antd/dist/antd.css";
import "./App.scss";

import { DataContext, FirebaseContext } from "./Contexts";
import DataApi from "./dataApi/dataApi";
import LoginForm from "./login/LoginForm";
import { Dashboard } from "./Dashboard";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { firestore, realtime, user } = useAuth();

  const dataApi = new DataApi();

  return (
    <FirebaseContext.Provider value={{ fs: firestore, realtime }}>
      <DataContext.Provider value={{ dataApi }}>
        <div className="App">
          <header className="App-header">
            <h1>IR-0</h1>
          </header>
          {!user && <LoginForm />}
          {user && <Dashboard />}
        </div>
      </DataContext.Provider>
    </FirebaseContext.Provider>
  );
}

export default App;
