import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Createbox from "../components/Createbox";
import Loading from "../pages/Loading";
import axios from "axios";
import { Empty, Layout } from "antd";
import { Content } from "antd/es/layout/layout";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3001/user/users");
        if (res.status !== 200) {
          navigate("/");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [navigate]);

  return (
    <>
      {isLoading ? (
        // something to show loading
        <Loading />
      ) : (
        <Layout>
          <Content className="bg-black flex justify-center items-center	">
            <Empty description={false} />
          </Content>
        </Layout>

        //  <Createbox isBlur={isBlur} toggleBlur={toggleBlur} />
      )}
    </>
  );
}
