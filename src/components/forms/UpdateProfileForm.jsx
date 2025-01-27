import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { ConfigProvider, Form, Input, message } from "antd";
import { MdAlternateEmail, MdOutlinePerson } from "react-icons/md";
import { clearToken } from "../../features/auth/authSlice";

const UpdateProfileForm = ({ isFormDisabled, token, user, setLoading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const body = {
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
    };

    try {
      setLoading(true);
      const res = await fetch(
        "https://take-home-test-api.nutech-integrasi.com/profile/update",
        {
          method: "PUT",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.status === 0) {
        message.success(data.message);
        setLoading(false);
        navigate("/");
      } else if (data.status === 108) {
        message.error(data.message);
        setLoading(false);
        dispatch(clearToken());
        navigate("/login");
      } else {
        message.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error(error.message);
      message.error(error);
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  form.setFieldsValue({
    email: user?.email,
    first_name: user?.first_name,
    last_name: user?.last_name,
  });

  return (
    <Form
      name="update-profile"
      form={form}
      disabled={isFormDisabled}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      className="w-full flex flex-col gap-2"
    >
      <ConfigProvider
        theme={{
          token: {
            colorTextDisabled: "#000",
            colorBgContainerDisabled: "#fff",
          },
        }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={
            isFormDisabled
              ? []
              : [
                  {
                    required: true,
                    type: "email",
                    message: "Harap masukkan alamat email anda!",
                  },
                ]
          }
        >
          <Input
            size="large"
            className="h-12"
            style={{ borderRadius: "4px" }}
            placeholder="Ketikkan alamat email anda"
            prefix={<MdAlternateEmail />}
          />
        </Form.Item>
      </ConfigProvider>
      <ConfigProvider
        theme={{
          token: {
            colorTextDisabled: "#000",
            colorBgContainerDisabled: "#fff",
          },
        }}
      >
        <Form.Item
          label="Nama Depan"
          name="first_name"
          rules={
            isFormDisabled
              ? []
              : [
                  {
                    required: true,
                    message: "Harap masukkan nama depan anda!",
                  },
                ]
          }
        >
          <Input
            size="large"
            className="h-12"
            style={{ borderRadius: "4px" }}
            placeholder="Ketikkan nama depan anda"
            prefix={<MdOutlinePerson />}
          />
        </Form.Item>
      </ConfigProvider>
      <ConfigProvider
        theme={{
          token: {
            colorTextDisabled: "#000",
            colorBgContainerDisabled: "#fff",
          },
        }}
      >
        <Form.Item
          label="Nama Belakang"
          name="last_name"
          rules={
            isFormDisabled
              ? []
              : [
                  {
                    required: true,
                    message: "Harap masukkan nama belakang anda!",
                  },
                ]
          }
        >
          <Input
            size="large"
            className="h-12"
            style={{ borderRadius: "4px" }}
            placeholder="Ketikkan nama belakang anda"
            prefix={<MdOutlinePerson />}
          />
        </Form.Item>
      </ConfigProvider>
      {!isFormDisabled && (
        <button
          className="rounded-sm hover:cursor-pointer h-12 bg-[#F42619]"
          type="submit"
          form="update-profile"
        >
          <p className="text-white">Simpan</p>
        </button>
      )}
    </Form>
  );
};

UpdateProfileForm.propTypes = {
  isFormDisabled: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default UpdateProfileForm;
