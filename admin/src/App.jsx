import React from 'react';
import { Routes, Route } from 'react-router-dom';

import TopBar from './components/Navbar/TopBar';
import Sidebar from './components/Sidebar/Sidebar';

import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';
// optional: import main styles if any

const App = () => {
  const url = "http://localhost:3000"; // ✅ Update this if needed

  return (
    <div>
      <ToastContainer />
      <TopBar />
      <hr />
      <div className="app-content" style={{ display: 'flex' }}>
        <Sidebar />
        <div className="main-panel" style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/orders" element={<Orders url={url} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
