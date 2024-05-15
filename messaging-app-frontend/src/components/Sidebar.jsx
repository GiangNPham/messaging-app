import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Sidebar({ toggleBlur }) {
  const navigate = useNavigate();
  const [allConversations, setAllConversations] = useState([]);

  useEffect(() => {
    async function fetchConversations() {
      const res = await axios.get("http://localhost:3001/user/conversations");
      // const res = await fetch(`http://localhost:3001/user/conversations`, {
      //   method: "GET",
      //   credentials: "include",
      // });

      // const data = await res.json();

      if (res.status === 200) {
        setAllConversations(res.data.allConversations);
      } else {
        navigate("/");
      }
    }
    fetchConversations();
  }, [navigate]);

  const chatNavigate = (id) => {
    navigate("/chat/" + id);
  };

  return (
    <>
      <aside className="bg-secondary fixed top-24 left-0 z-40 w-72 h-full text-text border-r-2 border-accent ">
        <div className="flex text-2xl mr-4 ml-7 mt-5">
          <h1 className="font-semibold">Conversations</h1>
          <button className="ml-auto" onClick={() => toggleBlur()}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </div>
        <div className="mt-4">
          {allConversations.map((chat) => {
            return (
              <div key={chat._id} className="mb-4 text-xl mx-4 ">
                <button
                  onClick={() => chatNavigate(chat._id)}
                  className="bg-accent w-full rounded py-1"
                >
                  {chat.friendList.length >= 3
                    ? chat.groupName
                    : chat.friendListName.toString()}
                </button>
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}
