import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
// import Login from './pages/AdminLogin';
import Crash from './pages/Crash';
import Create from './pages/Create';
import Closet from './pages/Closet';
import Dictator from './pages/Dictator';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import Error from './pages/Error';
// import Admin from './components/Admin1/Admin';





createRoot(document.getElementById('root')).render(
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/crash" element={<Crash />} />
        <Route path="/creategame" element={<Create />} />
        <Route path="/closet" element={<Closet />} />
        <Route path="/dictator" element={<Dictator />} />
        {/* <Route path="/admin/*" element={<Admin />} /> */}
        <Route path="/admin" element={<AdminPage />} />
        <Route component={<Error />} />
      </Routes>
    </Router>
 
);
