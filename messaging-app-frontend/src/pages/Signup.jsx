import { Link, useNavigate } from "react-router-dom";
import { Form, Input, notification } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useContext } from "react";

import { AuthContext } from "../context/authContext";
import axios from "axios";

import login from "../assets/login.png";
import "../styles/signup.css";

export default function Signup() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) navigate("/user");
  }, [isAuthenticated, navigate]);

  const notifyError = (e) => {
    notification.error({
      message: "Cannot sign up!",
      description: e.response.data.err,
    });
  };

  const signupHandler = async (values) => {
    try {
      await axios.post("http://localhost:3001/auth/signup", {
        username: values.username.trim(),
        password: values.password.trim(),
        passwordConfirmation: values.passwordConfirmation.trim(),
      });
      navigate("/");
    } catch (err) {
      notifyError(err);
    }
  };

  return (
    <div className="flex justify-center h-screen items-center signup-page">
      <div className="hidden lg:block">
        <img src={login} alt="Login image" className="w-8/12" />
      </div>
      <div className="py-8 px-10 rounded-md shadow-md h-2/5 w-7/12 lg:w-4/12 bg-white flex  items-center">
        <Form
          onFinish={signupHandler}
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

          <Form.Item
            name="passwordConfirmation"
            rules={[
              {
                required: true,
                message: "Please input your password again!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon my-2" />}
              placeholder="Password confirmation"
            />
          </Form.Item>

          <Form.Item>
            <button
              type="submit"
              className="login-form-button w-full font-semibold mb-1 py-2 rounded-lg text-base"
            >
              Sign up
            </button>
            Or{" "}
            <Link to="/" className="font-semibold">
              log in!
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
