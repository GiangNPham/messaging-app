import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, notification } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import PropTypes from "prop-types";
import { useEffect, useContext } from "react";

import { AuthContext } from "../context/authContext";
import axios from "axios";

import login from "../assets/login.png";
import "../styles/login.css";

export default function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  const notifyError = (e) => {
    notification.error({
      message: "Cannot log in!",
      description: e.response.data.err,
    });
  };

  const loginHandler = async (values) => {
    try {
      await axios.post("http://localhost:3001/auth/login", {
        username: values.username.trim(),
        password: values.password.trim(),
      });
      navigate("/dashboard");
    } catch (err) {
      notifyError(err);
    }
  };

  return (
    <div className="flex justify-center h-screen items-center	login-page">
      <div>
        <img src={login} alt="Login image" className="w-8/12" />
      </div>
      <div className="py-8 px-10 rounded-md shadow-md h-2/5 w-4/12 bg-white flex  items-center">
        <Form
          onFinish={loginHandler}
          autoComplete="off"
          className="flex-grow"
          form={form}
        >
          <h1 className="text-4xl font-semibold mb-5">Hi there!</h1>
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
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="login-form-button w-full font-semibold mb-1"
            >
              Log in
            </Button>
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
