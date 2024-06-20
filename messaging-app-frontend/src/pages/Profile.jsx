import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, notification } from "antd";

import "../styles/profile.css";
import axiosClient from "../utils/axiosClient";
export default function Profile() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const navigate = useNavigate();

  const updateHandle = async (e) => {
    e.preventDefault();

    try {
      if (password.length !== 0 || passwordConfirmation.length !== 0) {
        if (password !== passwordConfirmation) {
          return notification.error({
            message: "Update unsucessfully",
            description: "Passwords are not matching!",
          });
        }
        await axiosClient.patch("http://localhost:3001/user/password", {
          password,
        });

        navigate("/dashboard");
      }
    } catch (err) {
      notification.error({
        message: "Update unsucessfully",
        description: err.response.data.err,
      });
    } finally {
      setPassword("");
      setPasswordConfirmation("");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen bg-black">
        <form
          className="flex flex-col py-10 px-12 rounded-md profile-form w-96"
          onSubmit={(e) => updateHandle(e)}
        >
          <h1 className="text-2xl font-bold mb-5 text-white">
            Update password
          </h1>

          <label htmlFor="password" className="text-white text-base">
            New password
          </label>
          <Input.Password
            placeholder="input password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
          />

          <label
            htmlFor="passwordConfirmation"
            className="text-white text-base mt-3"
          >
            Password confirmation
          </label>
          <Input.Password
            placeholder="confirm password"
            name="passwordConfirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value.trim())}
          />

          <button
            type="submit"
            className="w-full bg-primary rounded mt-8 py-1 "
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
}
