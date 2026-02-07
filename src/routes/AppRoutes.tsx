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
import BlogDetails from '../pages/public/BlogDetails/BlogDetails';
import Blog from '../pages/public/Blog/Blog';
import Faq from '../pages/public/Faq/Faq';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/admin/Dashboard/Dashboard';
import MyProfile from '../pages/admin/MyProfile/MyProfile';
import Settings from '../pages/admin/Settings/Settings';
import NeedAssistance from '../pages/admin/NeedAssistance/NeedAssistance';
import MyCollections from '../pages/admin/MyCollections/MyCollections';
import MyInterviews from '../pages/admin/MyInterviews/MyInterviews';

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
        <Route path="/blog-details" element={<BlogDetails />} /> 
        <Route path="/blog" element={<Blog />} /> 
        <Route path="/faq" element={<Faq />} /> 
      </Route>
      {/* Admin Routes */}
      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/need-assistance" element={<NeedAssistance />} />
        <Route path="/my-collections" element={<MyCollections />} />
        <Route path="/my-interviews" element={<MyInterviews />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
