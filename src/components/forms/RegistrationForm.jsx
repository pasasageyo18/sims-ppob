import { Form, Input, message } from "antd";
import { useState } from "react";
import {
  MdAlternateEmail,
  MdOutlinePerson,
  MdLockOutline,
} from "react-icons/md";
import { useNavigate } from "react-router";

const RegistrationForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onFinish = async (values) => {
    const body = {
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
      password: values.password,
    };

    try {
      setIsLoading(true);
      const res = await fetch(
        "https://take-home-test-api.nutech-integrasi.com/registration",
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (data.status === 0) {
        message.success(data.message);
        setIsLoading(false);
        navigate("/login");
      } else {
        message.error(data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      message.error(error);
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
        name="first_name"
        rules={[
          {
            required: true,
            message: "Harap masukkan nama depan anda!",
          },
        ]}
      >
        <Input
          size="large"
          placeholder="Ketikkan nama depan anda"
          prefix={<MdOutlinePerson />}
          className="h-12"
        />
      </Form.Item>
      <Form.Item
        name="last_name"
        rules={[
          {
            required: true,
            message: "Harap masukkan nama belakang anda!",
          },
        ]}
      >
        <Input
          size="large"
          className="h-12"
          placeholder="Ketikkan nama belakang anda"
          prefix={<MdOutlinePerson />}
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
      <Form.Item
        hasFeedback
        name="confirm_password"
        dependencies={["password"]}
        rules={[
          {
            required: true,
            message: "Harap konfirmasi password anda!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Konfirmasi password tidak sama")
              );
            },
          }),
        ]}
      >
        <Input.Password
          size="large"
          className="h-12"
          placeholder="Konfirmasi password anda"
          prefix={<MdLockOutline />}
        />
      </Form.Item>
      <button
        type="submit"
        className="w-full bg-[#F42619] h-12 rounded-md text-white hover:cursor-pointer hover:bg-[#F6554B] focus:bg-[#A11108] transition-colors"
      >
        {isLoading ? "loading" : "Registrasi"}
      </button>
    </Form>
  );
};

export default RegistrationForm;
