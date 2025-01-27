import { Form, Input, message } from "antd";
import { useState } from "react";
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setToken } from "../../features/auth/authSlice";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const body = {
      email: values.email,
      password: values.password,
    };

    try {
      setIsLoading(true);
      const res = await fetch(
        "https://take-home-test-api.nutech-integrasi.com/login",
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      console.log(data);

      if (data.status === 0) {
        message.success(data.message);
        setIsLoading(false);
        dispatch(setToken(data.data.token));
        navigate("/");
      } else {
        message.error(data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error.message);
      message.error(error);
      setIsLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="registration"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="w-full flex flex-col gap-3"
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            type: "email",
            message: "Harap masukkan alamat email anda!",
          },
        ]}
      >
        <Input
          size="large"
          className="h-12"
          placeholder="Ketikkan alamat email anda"
          prefix={<MdAlternateEmail />}
        />
      </Form.Item>

      <Form.Item
        hasFeedback
        name="password"
        rules={[
          {
            required: true,
            message: "Harap masukkan password anda!",
          },
        ]}
      >
        <Input.Password
          size="large"
          className="h-12"
          placeholder="Ketikkan password anda"
          prefix={<MdLockOutline />}
        />
      </Form.Item>

      <button
        type="submit"
        className="w-full bg-[#F42619] h-12 rounded-md text-white hover:cursor-pointer hover:bg-[#F6554B] focus:bg-[#A11108] transition-colors"
      >
        {isLoading ? "loading" : "Masuk"}
      </button>
    </Form>
  );
};

export default LoginForm;
