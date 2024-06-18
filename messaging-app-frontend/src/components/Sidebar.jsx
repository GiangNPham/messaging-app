import { Button, ConfigProvider, Dropdown, Layout, Menu } from "antd";
const { Sider } = Layout;
import { MenuOutlined, MessageOutlined } from "@ant-design/icons";

import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";

import "../styles/sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const [allConversations, setAllConversations] = useState([]);

  const fetchConversations = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:3001/user/conversations");
      const tmpConvo = res.data.allConversations;
      const allConvos = tmpConvo.map((convo) => {
        return {
          key: convo._id,
          label: convo.groupName || convo.friendListName.toString(),
        };
      });
      setAllConversations(allConvos);
    } catch (err) {
      navigate("/");
    }
  }, [navigate]);

  const onClickDropdown = ({ key }) => {
    console.log(key);
    if (key === "3") logoutHandler();
  };

  const logoutHandler = async function () {
    try {
      const res = await axios.get("http://localhost:3001/auth/logout");
      if (res.status === 200) {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
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
      label: <Link to="/">Dashboard</Link>,
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
      breakpoint="md"
      collapsedWidth="100vw"
      id="sider-bg"
      width="25rem"
      className="h-screen sidebar"
    >
      <div className="flex justify-between px-4 pt-5 text-white">
        <h1 className="text-3xl ">Chat</h1>
        <div className="flex ">
          <button className=" mr-2 px-3 py-1 rounded-lg hover:bg-white hover:text-black">
            <MessageOutlined style={{ fontSize: "1.5rem" }} />
          </button>
          <Dropdown
            menu={{
              items,
              onClick: onClickDropdown,
            }}
            placement="bottomLeft"
          >
            <button className="sidebar-color px-4 py-1 rounded-lg hover:bg-white hover:text-black ">
              <MenuOutlined />
            </button>
          </Dropdown>
        </div>
      </div>
      {/* <Menu mode="vertical" items={allConversations} inlineCollapsed={false} /> */}
      <nav className="flex flex-col	mt-5 px-4">
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
