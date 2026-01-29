import { Routes, Route } from 'react-router-dom';
import Home from '../pages/public/Home/Home';
import Contact from '../pages/public/Contact/Contact';

// Auth Pages
// import Login from '../pages/auth/Login/Login';
// import ForgotPassword from '../pages/auth/ForgotPassword/ForgotPassword';
// import ResetPassword from '../pages/auth/ResetPassword/ResetPassword';

// Public Pages
// import Home from '../pages/public/Home/Home';
// import About from '../pages/public/About/About';
// import Services from '../pages/public/Services/Services';
// import Contact from '../pages/public/Contact/Contact';
// import PrivacyPolicy from '../pages/public/PrivacyPolicy/PrivacyPolicy';
// import TermsOfUse from '../pages/public/TermsOfUse/TermsOfUse';


// Admin Pages
// import Dashboard from '../pages/admin/Dashboard/Dashboard';
// import ReportLibrary from '../pages/admin/ReportLibrary/ReportLibrary';
// import AllClients from '../pages/admin/ClientManagement/Clients/AllClients';
// import Users from '../pages/admin/Users/Users';
// import Billing from '../pages/admin/Billing/Billing';
// import Analytics from '../pages/admin/Analytics/Analytics';
// import AddNewClient from '../pages/admin/ClientManagement/AddNewClient/AddNewClient';

// Client Pages
// import MyAccount from '../pages/client/MyAccount/MyAccount';
// import ClientBilling from '../pages/client/Billing/Billing';
// import FAQ from '../pages/client/FAQ/FAQ';
// import GlobalSetup from '../pages/GlobalSetup';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} /> 
      {/* <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />*/}

    </Routes>
  );
};

export default AppRoutes;
