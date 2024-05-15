import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState, useEffect, useContext } from "react";

import { AuthContext } from "../context/authContext";
import axios from "axios";

// export default function Login({ isAuth, setIsAuth, user, setUser }) {
export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated]);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/auth/login", {
        username: username,
        password: password,
      });
      navigate("/dashboard");
      // console.log(res);
      // if (res.response.status === 200) {
      //   navigate("/dashboard");
      // } else {
      //   console.log(res.response.data.err);
      //   setErrorMsg(res.response.data.err);
      // }
    } catch (err) {
      setErrorMsg(err.response.data.err);
    }
    // const res = await fetch(`http://localhost:3001/auth/login`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   credentials: "include",
    //   body: JSON.stringify({ username, password }),
    // });
    // const data = await res.json();
    // if (res.status === 200) {
    //   // console.log(data);
    //   console.log("Log in successfully");
    //   navigate(`/dashboard`);
    // } else {
    //   setErrorMsg(data.err);
  };

  return (
    <div className="grid grid-cols-2 bg-background place-items-center h-screen">
      <div className="mb-20 ml-56">
        <h1 className="text-primary text-5xl">
          Welcome to <b>Messenger clone</b>
        </h1>
        <p className="text-primary text-xl text-right">
          Connect people to their beloved ones
        </p>
      </div>
      <div className="mb-20 mr-72 border-4 border-primary bg-secondary rounded py-8 px-12 text-primary">
        <h1 className="text-3xl font-semibold pb-3">Log in </h1>
        <form className="flex flex-col text-xl">
          <label htmlFor="username" className="mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            className="mb-4 py-1 px-2 rounded text-base"
            required
            onChange={(e) => setUsername(e.target.value.trim())}
          />

          <label htmlFor="password" className="mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            required
            className="mb-4 py-1 px-2 w-72 rounded text-base"
            onChange={(e) => setPassword(e.target.value.trim())}
          />
          {errorMsg != "" ? (
            <h3 className="text-base text-red-600">{errorMsg}</h3>
          ) : null}
          <button
            onClick={loginHandler}
            className="border-2 border-primary bg-primary text-accent rounded-md mb-2"
          >
            Submit
          </button>
          <p className="text-base">
            Do not have an account?{" "}
            <Link to="/signup">
              <b>Sign up</b>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

Login.propTypes = {
  isAuth: PropTypes.bool,
  setIsAuth: PropTypes.func,
  user: PropTypes.string,
  setUser: PropTypes.func,
};
