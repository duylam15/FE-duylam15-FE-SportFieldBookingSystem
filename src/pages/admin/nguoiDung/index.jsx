import React from 'react';
import { Outlet } from 'react-router-dom';

const NguoiDung = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default NguoiDung;