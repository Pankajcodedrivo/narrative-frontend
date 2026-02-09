import { useState } from "react";
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import SubFooter from '../components/SubFooter/SubFooter';

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);
  return (
    <div className="admin-layout">
      <Sidebar isOpen={isOpen} closeMenu={closeMenu} />
      <div className="dashboard-right">
          <DashboardHeader toggleMenu={toggleMenu} />
          <Outlet />
          <SubFooter />
      </div>
    </div>
  );
};

export default AdminLayout;