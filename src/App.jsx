// App.jsx
import React from 'react';
import UsersPage from './pages/UserPage';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />

    </div>
  );
}

export default App;
