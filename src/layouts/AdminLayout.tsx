import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="dashboard-layout">
      <Outlet />
    </div>
  );
};

export default AdminLayout;