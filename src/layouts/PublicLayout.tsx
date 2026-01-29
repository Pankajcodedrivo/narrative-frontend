import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const PublicLayout = () => {
  return (
    <div className="auth-layout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default PublicLayout;