import axios from "axios";
import { SendOutlined } from "@ant-design/icons";

import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/chat.css";

import io from "socket.io-client";
import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
const socket = io.connect("http://localhost:3001");

export default function Chat() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [curUser, setCurUser] = useState();
  const [groupName, setGroupName] = useState("");
  const [friendListName, setFriendListName] = useState([]);
  const [messageContent, setMessageContent] = useState("");

  const messagesEndRef = useRef(null);

  const createMessage = async function (e) {
    e.preventDefault();
    if (messageContent.length === 0) return;
    try {
      const res = await axios.post(
        "http://localhost:3001/chat/createMessage/" + id,
        {
          messageContent: messageContent,
        }
      );
      socket.emit("sendMessage", res.data.newMessage);
      setMessageContent("");
    } catch (err) {
      navigate("/");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChats = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/chat/conversation/" + id
      );
      const data = res.data;

      setMessages(data.allMessages);
      setCurUser(data.curUserID);
      setGroupName(data.groupName);
      setFriendListName(data.friendListName);
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  return (
    <Layout className="">
      <Header className="chat-bg-color">
        <h1 className=" text-white text-xl mt-4">
          {friendListName.length === 2 ? friendListName.toString() : groupName}
        </h1>
      </Header>
      <Content className="bg-black ">
        <div className="text-black chatbox overflow-y-auto rounded-t">
          {messages.map((message) => {
            if (message.sender !== curUser) {
              return (
                <div
                  key={message._id}
                  className="my-1 ml-16 sm:ml-32 xl:ml-80 lg:ml-48"
                >
                  <p className="text-sm opacity-80	text-white">
                    {message.senderName}
                  </p>
                  <p className=" w-fit py-2 px-3 rounded-lg message-bg-color text-black text-base">
                    {message.content}
                  </p>
                </div>
              );
            } else {
              return (
                <div key={message._id} className="flex justify-end my-1">
                  <p className="mr-16 sm:mr-32 xl:mr-80 lg:mr-48 w-fit py-2 px-3 text-base  rounded-lg bg-primary text-black ">
                    {message.content}
                  </p>
                </div>
              );
            }
          })}
          <div ref={messagesEndRef} />
        </div>
        <form
          className="mx-16 sm:mx-32 xl:mx-80 lg:mx-48 pt-2 flex message-input"
          onSubmit={(e) => createMessage(e)}
        >
          <input
            className="py-2 pl-4 bg-primary w-full text-black text-base rounded-bl chatCreate "
            placeholder="Message..."
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          />
          <button
            className="text-purple bg-primary rounded-br pt-1 pr-3 text-white"
            type="submit"
          >
            <SendOutlined />
          </button>
        </form>
      </Content>
    </Layout>
  );
}
