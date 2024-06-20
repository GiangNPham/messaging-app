import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Input, notification } from "antd";
import "../styles/createbox.css";
import axiosClient from "../utils/axiosClient";

export default function Createbox({ isModalOpen, setIsModalOpen }) {
  // const [errorMsg, setErrorMsg] = useState("");
  const [groupMem, setGroupMem] = useState([]);
  const [userName, setUserName] = useState("");
  const [groupName, setGroupName] = useState("");

  const navigate = useNavigate();

  const onCancel = () => {
    setIsModalOpen(false);
  };

  const addUserHandle = async (e) => {
    e.preventDefault();
    try {
      // check if user exists
      await axiosClient.get("http://localhost:3001/chat/checkuser/" + userName);
      if (groupMem.includes(userName)) {
        return notification.error({
          message: "Add user unsuccessful",
          description: `${userName}: User already added`,
        });
      }
      setGroupMem([...groupMem, userName]);
      setUserName("");
    } catch (err) {
      notification.error({
        message: "Add user unsuccessful",
        description: `${userName}: ${err.response.data.err}`,
      });
    }
  };

  const deleteUser = (user) => {
    const newGroupMem = groupMem.filter((mem) => mem != user);
    setGroupMem(newGroupMem);
  };

  const chatHandle = async (e) => {
    e.preventDefault();

    // 2 cases: 1-1 chat and group chat
    if (groupMem.length === 1) {
      try {
        const res = await axiosClient.post(
          "http://localhost:3001/chat/createDirect",
          {
            groupMem,
          }
        );
        if (res.status === 200) {
          navigate("/chat/" + res.data.chatID);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        if (groupName === "") {
          console.log("Please fill out the group's name");
        }
        const res = await axiosClient.post(
          "http://localhost:3001/chat/createGroup",
          {
            groupMem,
            groupName,
          }
        );
        if (res.status === 200) {
          setGroupMem([]);
          setIsModalOpen(false);
          navigate("/chat/" + res.data.chatID);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Modal
      title="New message"
      open={isModalOpen}
      footer={null}
      onCancel={onCancel}
      className="mt-20 create-box "
      styles={{
        header: { backgroundColor: "#363434" },
        body: { backgroundColor: "#363434" },
        content: { backgroundColor: "#363434" },
      }}
      width={400}
    >
      <div className="mt-5 text-xl ">
        <Input
          placeholder="To:"
          value={userName}
          onChange={(e) => setUserName(e.target.value.trim())}
        />
        <div className="h-48">
          <div className="flex flex-wrap text-base">
            {groupMem.map((user) => {
              return (
                <div
                  key={user}
                  className="flex justify-between bg-primary rounded py-1 px-2 mr-2 mt-3"
                >
                  <p className="mr-2">{user}</p>
                  <button onClick={() => deleteUser(user)}>
                    <FontAwesomeIcon icon={faXmark} className="" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {groupMem.length >= 2 ? (
          <div className="mt-4 mb-4">
            <Input
              placeholder="Chat name"
              name="groupName"
              className=" bg-secondary pl-2"
              onChange={(e) => setGroupName(e.target.value.trim())}
            />
          </div>
        ) : null}

        <div className="flex justify-evenly text-base">
          <button
            className="bg-primary py-1 px-2 rounded "
            onClick={(e) => addUserHandle(e)}
          >
            Add user
          </button>
          <button
            className="bg-primary py-1 px-2 rounded "
            onClick={(e) => chatHandle(e)}
          >
            Chat
          </button>
        </div>
      </div>
    </Modal>
  );
}
