import { Link, useNavigate } from "react-router-dom";
import { Form, Input, notification } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import PropTypes from "prop-types";

import login from "../assets/login.png";
import "../styles/login.css";
import { useEffect } from "react";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const notifyError = (e) => {
    notification.error({
      message: "Cannot log in!",
      description: e.response.data.err,
    });
  };

  const loginHandler = async (values) => {
    try {
      const res = await axios.post("http://localhost:3001/auth/login", {
        username: values.username.trim(),
        password: values.password.trim(),
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      debugger;
      notifyError(err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen absolute top-0 left-0 w-screen login-page">
      <div className="hidden lg:block">
        <img src={login} alt="Login image" className="w-8/12" />
      </div>
      <div className="login-modal py-8 px-10 rounded-md shadow-md h-2/5 w-7/12 lg:w-4/12 flex  items-center">
        <Form
          onFinish={loginHandler}
          autoComplete="off"
          className="flex-grow"
          form={form}
        >
          <h1 className="text-2xl mt-2 lg:text-4xl font-semibold mb-5">
            Hi there!
          </h1>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon my-2" />}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon my-2" />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <button
              type="submit"
              className="login-form-button w-full font-semibold mb-1 rounded-lg py-2 text-base"
            >
              Log in
            </button>
            Or{" "}
            <Link to="/signup" className="font-semibold">
              register now!
            </Link>
          </Form.Item>
        </Form>
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
