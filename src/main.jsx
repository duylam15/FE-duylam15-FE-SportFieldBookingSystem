// index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/Routes';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AppRoutes /> {/* Sử dụng AppRoutes để định nghĩa các route */}
    </Router>
  </React.StrictMode>,
  document.getElementById('root') // Đảm bảo rằng 'root' là ID của phần tử DOM trong index.html
);
