import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminRoutes from './routes/adminRoutes';
import UserRoutes from './routes/UserRout';
import TutorRoutes from './routes/TutorRoutes';
const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/tutor/*" element={<TutorRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
