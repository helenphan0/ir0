import React from 'react';
import 'antd/dist/antd.css';
import './App.scss';

import Dashboard from './Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>IR-0</h1>
      </header>
      <Dashboard />
    </div>
  );
}

export default App;
