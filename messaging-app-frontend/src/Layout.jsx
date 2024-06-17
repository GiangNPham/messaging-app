import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "./components/Sidebar";

const AppLayout = () => {
  return (
    <Layout>
      <Sidebar />
      <Outlet />
    </Layout>
  );
};

export default AppLayout;
