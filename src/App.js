
import './App.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from "./pages/Login";
import Signup from "./pages/Register";
import ProtectedRoute from './pages/protectedRoutes/ProtectedRoute';
import Data from './pages/Data';
import Navbar from './components/Navbar';


const App = () => {
  return (
    <Router>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route exact path="/data" element={<ProtectedRoute><Data /></ProtectedRoute>} />
        
      </Routes>
    </Router>
  );
};

export default App;
