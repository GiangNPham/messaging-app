import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";

export default function Signup() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) navigate("/user");
  }, [isAuthenticated]);

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/auth/signup", {
        username,
        password,
        passwordConfirmation,
      });
      navigate(`/`);
    } catch (err) {
      setErrorMsg(err.response.data.err);
    }
    // const res = await fetch(`http://localhost:3001/auth/signup`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ username, password, passwordConfirmation }),
    // });
    // const data = await res.json();
    // if (res.status === 200) {
    //   navigate(`/`);
    // } else {
    //   setErrorMsg(data.err);
    // }
  };

  return (
    <div className="grid grid-cols-2 bg-background place-items-center h-screen">
      <div className="mb-14 ml-56">
        <h1 className="text-primary text-5xl">
          Welcome to <b>Messenger clone</b>
        </h1>
        <p className="text-primary text-xl text-right">
          Connect people to their beloved ones
        </p>
      </div>
      <div className="mb-10 mr-80 border-4 border-primary bg-secondary rounded py-8 px-12 text-primary">
        <h1 className="text-3xl font-semibold pb-3">Sign up</h1>
        <form className="flex flex-col text-xl">
          <label htmlFor="username" className="mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            className="mb-4 py-1 px-2 w-72 rounded text-base"
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
            className="mb-4 py-1 px-2 rounded text-base"
            onChange={(e) => setPassword(e.target.value.trim())}
          />

          <label htmlFor="passwordConfirmation" className="mb-2">
            Password confirmation
          </label>
          <input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirm Password"
            required
            className="mb-4 py-1 px-2 rounded text-base"
            onChange={(e) => setPasswordConfirmation(e.target.value.trim())}
          />
          {errorMsg != "" ? (
            <h3 className="text-base text-red-600 mb-1">{errorMsg}</h3>
          ) : null}
          <button
            onClick={signupHandler}
            className="border-2 border-primary bg-primary text-accent rounded-md mb-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
