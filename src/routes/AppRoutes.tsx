import { Routes, Route } from 'react-router-dom';
import Home from '../pages/public/Home/Home';
import Contact from '../pages/public/Contact/Contact';
import PublicLayout from '../layouts/PublicLayout';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../pages/auth/Login/Login';
import Registration from '../pages/auth/Registration/Registration';
import ForgotPassword from '../pages/auth/ForgotPassword/ForgotPassword';
import EmailVerification from '../pages/auth/EmailVerification/EmailVerification';
import ResetPassword from '../pages/auth/CreateNewPassword/ResetPassword';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} /> 
        <Route path="/forgot-password" element={<ForgotPassword />} /> 
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/reset-password" element={<ResetPassword />} />  
      </Route>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} /> 
      </Route>
    </Routes>
  );
};

export default AppRoutes;
