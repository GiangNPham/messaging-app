import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Createbox({ isBlur, toggleBlur }) {
  const [errorMsg, setErrorMsg] = useState("");
  const [groupMem, setGroupMem] = useState([]);
  const [userName, setUserName] = useState("");
  const [groupName, setGroupName] = useState("");

  const navigate = useNavigate();

  const addUserHandle = async (e) => {
    setErrorMsg("");
    e.preventDefault();
    try {
      // check if user exists
      const res = await axios.get(
        "http://localhost:3001/chat/checkuser/" + userName
      );

      if (res.status !== 200) {
        return setErrorMsg(userName + ": " + res.data.err);
      }

      // check if user has already been added
      if (groupMem.includes(userName))
        return setErrorMsg(userName + ": User has already been added");
      setGroupMem([...groupMem, userName]);
      setUserName("");
    } catch (err) {
      return setErrorMsg(userName + ": " + err);
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
        const res = await axios.post(
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
          return setErrorMsg("Please fill out the group's name");
        }
        const res = await axios.post("http://localhost:3001/chat/createGroup", {
          groupMem,
          groupName,
        });
        if (res.status === 200) {
          navigate("/chat/" + res.data.chatID);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div
      className={
        "fixed m-auto left-0 right-0 top-0 bottom-0  w-1/4 h-3/5 bg-accent rounded-md " +
        (isBlur ? " " : " hidden")
      }
    >
      <div className="flex font-semibold text-3xl justify-between ml-10 mr-5 mt-3">
        <h1>New message</h1>
        <button onClick={() => toggleBlur()}>
          <FontAwesomeIcon icon={faXmark} className="mt-1" />
        </button>
      </div>
      <div className="mt-5 ml-10 mr-5 text-xl ">
        <label htmlFor="search">To: </label>
        <input
          name="search"
          className="w-10/12 bg-secondary rounded pl-2"
          type="string"
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value.trim())}
        />

        {errorMsg != "" ? (
          <h3 className="text-lg text-red-600 mt-3">{errorMsg}</h3>
        ) : null}

        <div className="overflow-y-auto	h-64 mt-2">
          {groupMem.map((user) => {
            return (
              <div
                key={user}
                className="flex justify-between bg-primary rounded py-1 px-2 mt-2"
              >
                <p>{user}</p>
                <button onClick={() => deleteUser(user)}>
                  <FontAwesomeIcon icon={faXmark} className="" />
                </button>
              </div>
            );
          })}
        </div>

        {groupMem.length >= 2 ? (
          <div className="mt-4 mb-4">
            <label htmlFor="groupName">Group name: </label>
            <input
              type="text"
              name="groupName"
              className="w-3/5 rounded bg-secondary pl-2"
              onChange={(e) => setGroupName(e.target.value.trim())}
            />
          </div>
        ) : null}

        <div className="flex justify-center mt-2">
          <button
            className="bg-primary py-2 px-3 rounded mr-5"
            onClick={(e) => addUserHandle(e)}
          >
            Add user
          </button>
          <button
            className="bg-primary py-2 px-3 rounded "
            onClick={(e) => chatHandle(e)}
          >
            Chat
          </button>
        </div>
      </div>
    </div>
  );
}
