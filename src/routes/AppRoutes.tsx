import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import Home from '../pages/public/Home/Home';
import Contact from '../pages/public/Contact/Contact';
import PublicLayout from '../layouts/PublicLayout';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../pages/auth/Login/Login';
import Registration from '../pages/auth/Registration/Registration';
import ForgotPassword from '../pages/auth/ForgotPassword/ForgotPassword';
import EmailVerification from '../pages/auth/VerifyOTP/EmailVerification';
import ResetPassword from '../pages/auth/ResetPassword/ResetPassword';
import BlogDetails from '../pages/public/BlogDetails/BlogDetails';
import Blog from '../pages/public/Blog/Blog';
import Faq from '../pages/public/Faq/Faq';

import UserLayout from '../layouts/UserLayout';
import Dashboard from '../pages/admin/Dashboard/Dashboard';
import MyProfile from '../pages/admin/MyProfile/MyProfile';
import Settings from '../pages/admin/Settings/Settings';
import NeedAssistance from '../pages/admin/NeedAssistance/NeedAssistance';
import MyCollections from '../pages/admin/MyCollections/MyCollections';
import MyCollectionsDetails from '../pages/admin/MyCollectionsDetails/MyCollectionsDetails';
import MyInterviews from '../pages/admin/MyInterviews/MyInterviews';

const AppRoutes = () => {
  return (
    <Routes>

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/registration" element={<Registration />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> 
        <Route path="/verify-otp" element={<EmailVerification />} />
        <Route path="/reset-password" element={<ResetPassword />} />  
      </Route>

      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/blog-details" element={<BlogDetails />} /> 
        <Route path="/blog" element={<Blog />} /> 
        <Route path="/faq" element={<Faq />} /> 
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<UserLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/need-assistance" element={<NeedAssistance />} />
          <Route path="/my-collections" element={<MyCollections />} />
          <Route path="/my-collections-details" element={<MyCollectionsDetails />} />
          <Route path="/my-interviews" element={<MyInterviews />} />
        </Route>
      </Route>

    </Routes>
  );
};

export default AppRoutes;
