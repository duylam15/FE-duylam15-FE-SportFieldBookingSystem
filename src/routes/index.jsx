import { createBrowserRouter } from 'react-router-dom';
import LayoutDefault from '../layout/LayoutDefault';

import Home from '../pages/Home';

import Error from '../pages/Error';
import Register from '../pages/Register';
import Login from '../pages/Login';
import FieldList from '../pages/FieldList';
import FieldDetails from '../pages/FieldDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutDefault />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "fieldList",
        element: <FieldList />
      },
      {
        path: "fieldDetails/:id",
        element: <FieldDetails />
      }
    ],
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />, // Route register, hiển thị Register
  },


]);
