import React from 'react';
import './App.css';
import Routes from './quis3/Routes';
import { BrowserRouter as Router } from "react-router-dom";


function App() {
  return (
    <div>
      <Router>
      <Routes></Routes>
      </Router>
    </div>
  );
}

export default App;
