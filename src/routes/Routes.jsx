// src/Routes.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App'; // Giả sử đây là tệp gốc của bạn
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Home from '../pages/Home';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    );
};

export default AppRoutes;
