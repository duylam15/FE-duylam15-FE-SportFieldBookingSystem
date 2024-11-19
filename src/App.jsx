// App.jsx
import React, { useState } from 'react';
import { router } from './routes';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { clientId } from './utils/thongTinChung';

function App() {

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </GoogleOAuthProvider>

  );
}

export default App;
