import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import SubFooter from '../components/SubFooter/SubFooter';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="dashboard-right">
          <DashboardHeader />
          <Outlet />
          <SubFooter />
      </div>
    </div>
  );
};

export default AdminLayout;