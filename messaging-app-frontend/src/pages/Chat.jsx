import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Chat.css";

export default function Chat() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [curUser, setCurUser] = useState();
  const [groupName, setGroupName] = useState("");
  const [friendListName, setFriendListName] = useState([]);
  const [messageContent, setMessageContent] = useState("");

  const createMessage = async function (e) {
    e.preventDefault();
    if (messageContent.length === 0) return;
    try {
      const res = await fetch(
        "http://localhost:3001/chat/createMessage/" + id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",

          body: JSON.stringify({ messageContent }),
        }
      );

      const data = await res.json();

      if (res.status === 200) {
        setMessageContent("");
      } else {
        // console.log(data, false);
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    async function fetchChats() {
      // console.log(user._id);

      const res = await fetch(`http://localhost:3001/chat/conversation/` + id, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      if (res.status === 200) {
        setMessages(data.allMessages);
        setCurUser(data.curUserID);
        setGroupName(data.groupName);
        setFriendListName(data.friendListName);

        // console.log("here");
      } else {
        navigate("/");
      }
    }
    fetchChats();
  }, []);
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="mt-24 ml-72">
        <h1 className="text-2xl font-semibold ml-14 pt-5 border-b border-slate-700 w-11/12">
          {friendListName.length === 2 ? friendListName.toString() : groupName}
        </h1>

        {/* all messages here */}
        <div className="text-black overflow-y-scroll  bg-secondary mt-5 chatbox mx-14 rounded-t pt-2 px-3">
          {messages.map((message) => {
            if (message.sender !== curUser) {
              return (
                <div key={message._id} className="my-1">
                  <p className="text-sm opacity-80	">{message.senderName}</p>
                  <p className="bg-accent w-fit py-1 px-3 rounded-lg">
                    {message.content}
                  </p>
                </div>
              );
            } else {
              return (
                <div key={message._id} className="flex justify-end my-1">
                  <p className="bg-accent w-fit py-1 px-3 rounded-lg">
                    {message.content}
                  </p>
                </div>
              );
            }
          })}
        </div>
        {/* create new message box */}
        <form className="mx-14 flex" onSubmit={(e) => createMessage(e)}>
          <input
            className="py-2 pl-4 bg-primary w-full text-black rounded-bl chatCreate"
            placeholder="Message..."
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          />
          <button
            className="text-purple bg-primary rounded-br pt-1 pr-3 text-white"
            type="submit"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>
    </>
  );
}
