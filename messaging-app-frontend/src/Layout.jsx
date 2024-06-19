import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "./components/Sidebar";
import Createbox from "./components/Createbox";
import { useState } from "react";

const AppLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Layout>
      <Sidebar setIsModalOpen={setIsModalOpen} />

      <Outlet />
      <Createbox isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </Layout>
  );
};

export default AppLayout;
