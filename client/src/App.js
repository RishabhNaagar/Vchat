import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Join from './components/Join/join';
import Chat from './components/Chat/chat';

function App() {
  return (
    <>
      <Router>
         {/* <Join /> */}
        <Routes>
          <Route path="/"  element={<Join />} />
          <Route path='/chat'  element={<Chat />}/>
        </Routes>
      </Router>
    </>
    
  );
}

export default App;
