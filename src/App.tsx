import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "./App.scss";

import { DataContext, FirestoreContext } from "./Contexts";
import FB from "./firebaseApi";
import DataApi from "./dataApi/dataApi";
import Dashboard from "./dashboard/Dashboard";
import LoginForm from "./login/LoginForm";

function App() {
  const [fs, setFs] = useState();

  useEffect(() => {
    const { firestore } = FB.getDb();

    setFs(firestore);
  }, [fs]);

  const dataApi = new DataApi();

  const loadFs = (fs: any) => {
    setFs(fs);
  };

  return (
    <FirestoreContext.Provider value={{ fs }}>
      <DataContext.Provider value={{ dataApi }}>
        <div className="App">
          <header className="App-header">
            <h1>IR-0</h1>
          </header>
          {!fs && <LoginForm loadFs={loadFs} />}
          {fs && <Dashboard />}
        </div>
      </DataContext.Provider>
    </FirestoreContext.Provider>
  );
}

export default App;
