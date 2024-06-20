import { Button, ConfigProvider, Dropdown, Layout } from "antd";
const { Sider } = Layout;
import { MenuOutlined, MessageOutlined } from "@ant-design/icons";

import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";

import axiosClient from "../utils/axiosClient";
import "../styles/sidebar.css";

export default function Sidebar({ setIsModalOpen }) {
  const navigate = useNavigate();
  const [allConversations, setAllConversations] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const fetchConversations = useCallback(async () => {
    try {
      const res = await axiosClient.get(
        "http://localhost:3001/user/conversations"
      );
      const tmpConvo = res.data.allConversations;
      const allConvos = tmpConvo.map((convo) => {
        return {
          key: convo._id,
          label: convo.groupName || convo.friendListName.toString(),
        };
      });
      setAllConversations(allConvos);
    } catch (err) {
      navigate("/login");
    }
  }, [navigate]);

  const onClickDropdown = ({ key }) => {
    if (key === "3") logoutHandler();
  };

  const logoutHandler = function () {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const chatNavigate = (id) => {
    navigate("/chat/" + id);
  };

  const items = [
    {
      key: "1",
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: "2",
      label: <Link to="/user">Profile</Link>,
    },
    {
      key: "3",
      label: "Logout",
    },
  ];

  return (
    <Sider
      id="sider-bg"
      width="26rem"
      breakpoint="md"
      collapsedWidth="9rem"
      className="h-screen sidebar px-1 lg:px-4"
    >
      <div className="flex justify-between  pt-5 text-white">
        <h1 className="text-xl lg:text-3xl ">Chat</h1>
        <div className="flex ">
          <button
            className=" mr-2 px-3 py-1 rounded-lg hover:bg-white hover:text-black"
            onClick={openModal}
          >
            <MessageOutlined style={{ fontSize: "1rem" }} />
          </button>
          <Dropdown
            menu={{
              items,
              onClick: onClickDropdown,
            }}
            placement="bottomLeft"
          >
            <button className="sidebar-color px-1 lg:px-4 py-1 rounded-lg hover:bg-white hover:text-black ">
              <MenuOutlined style={{ fontSize: "1rem" }} />
            </button>
          </Dropdown>
        </div>
      </div>

      <nav className="flex flex-col	mt-5 ">
        {allConversations.map((convo, index) => {
          return (
            <ConfigProvider key={convo.key} wave={{ disabled: true }}>
              <Button
                className={`sidebar-chat-btn rounded flex ${
                  index % 2 === 0 ? "sidebar-diff-color" : "sidebar-color"
                } `}
                onClick={() => chatNavigate(convo.key)}
              >
                <h1 className=" mr-auto text-white">{convo.label}</h1>
              </Button>
            </ConfigProvider>
          );
        })}
      </nav>
    </Sider>
  );
}
