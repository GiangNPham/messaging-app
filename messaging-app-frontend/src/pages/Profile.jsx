import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "../pages/Loading";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function Profile() {
  // set an useState of isLoading to prevent fetching the front end before the authorization finished
  // const [isLoading, setIsLoading] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const updateHandle = async (e) => {
    e.preventDefault();

    try {
      if (username.length !== 0) {
        const res = await axios.patch("http://localhost:3001/user/username`", {
          username,
        });
        // const res = await fetch(`http://localhost:3001/user/username`, {
        //   method: "PATCH",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   credentials: "include",
        //   body: JSON.stringify({ username }),
        // });
        // const data = await res.json();
        if (res.status === 200) {
          navigate("/dashboard");
        } else {
          setErrorMsg(res.data.err);
        }
      }
      if (password.length !== 0 || passwordConfirmation.length !== 0) {
        if (password !== passwordConfirmation) {
          return setErrorMsg("Two passwords are not the same");
        }
        const res = await axios.patch("http://localhost:3001/user/password", {
          password,
        });
        // const res = await fetch(`http://localhost:3001/user/password`, {
        //   method: "PATCH",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   credentials: "include",
        //   body: JSON.stringify({ password }),
        // });
        // const data = await res.json();
        if (res.status === 200) {
          navigate("/dashboard");
        } else {
          setErrorMsg(res.data.err);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUsername("");
      setPassword("");
      setPasswordConfirmation("");
    }
  };

  // useEffect(() => {
  //   const fetchChats = async () => {
  //     try {
  //       const res = await fetch("http://localhost:3001/user", {
  //         method: "GET",
  //         credentials: "include",
  //       });

  //       const data = await res.json();
  //       if (res.status === 200) console.log(data);
  //       else {
  //         navigate("/");
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchChats();
  // }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen w-screen">
        <form
          className="flex flex-col bg-secondary py-10 px-12 rounded-md"
          onSubmit={(e) => updateHandle(e)}
        >
          <h1 className="text-2xl font-bold text-center mb-5">
            Update profile
          </h1>

          <label htmlFor="username">New username</label>
          <input
            name="username"
            value={username}
            className="w-72 rounded mt-2 mb-3 h-8 pl-2"
            placeholder="leave blank to keep the same"
            onChange={(e) => setUsername(e.target.value.trim())}
          />

          <label htmlFor="password">New password</label>
          <input
            name="password"
            type="password"
            value={password}
            className="w-72 rounded mt-2 mb-3 h-8 pl-2"
            placeholder="leave blank to keep the same"
            onChange={(e) => setPassword(e.target.value.trim())}
          />

          <label htmlFor="passwordConfirmation">Password confirmation</label>
          <input
            name="passwordConfirmation"
            type="password"
            value={passwordConfirmation}
            className="w-72 rounded mt-2 mb-3 h-8 pl-2"
            placeholder="leave blank to keep the same"
            onChange={(e) => setPasswordConfirmation(e.target.value.trim())}
          />

          {errorMsg != "" ? (
            <h3 className="text-base text-red-600 mb-1">{errorMsg}</h3>
          ) : null}

          <button
            type="submit"
            className="w-full bg-accent rounded mt-3 py-1 font-semibold"
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
}
