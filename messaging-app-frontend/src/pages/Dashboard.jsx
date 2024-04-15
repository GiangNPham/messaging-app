import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Createbox from "../components/Createbox";
import Loading from "../pages/Loading";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  const [isBlur, setIsBlur] = useState(false);
  const [curUsername, setCurUsername] = useState("");

  const navigate = useNavigate();

  const toggleBlur = () => {
    setIsBlur(!isBlur);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3001/user/users", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (res.status === 200) {
          setCurUsername(data.curUsername);
          setUserList(data.allUsers);
        } else {
          navigate("/");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      {isLoading ? (
        // something to show loading
        <Loading />
      ) : (
        <>
          <div className={isBlur ? "blur-sm" : ""}>
            <Navbar />
            <Sidebar toggleBlur={toggleBlur} />
            <div className="pl-80 pt-28">
              <h1 className="font-semibold text-4xl text-primary text-center mt-5">
                Welcome {curUsername}! Start connecting to {userList.length}{" "}
                users all over the world
              </h1>
              <div className="text-2xl mx-32 mt-8 ">
                {userList.map((user, it) => {
                  return (
                    <div
                      key={user.username}
                      className="border border-text mb-4 bg-secondary rounded py-2 pl-3"
                    >
                      <h1>
                        {it + 1}. {user.username}
                      </h1>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <Createbox isBlur={isBlur} toggleBlur={toggleBlur} />
        </>
      )}
    </>
  );
}
