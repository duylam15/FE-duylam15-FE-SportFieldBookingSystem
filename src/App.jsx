// App.jsx
import React, { useState } from 'react';
import { router } from './routes';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div className="App">
      <RouterProvider router={router} />

    </div>
  );
}

export default App;
