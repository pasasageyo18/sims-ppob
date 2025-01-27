import { useState } from "react";
import { Form, InputNumber, message, Modal } from "antd";
import { MdOutlineMoney } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../../features/auth/authSlice";

const TopUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const setAmountValue = (value) => {
    const currentAmount = form.getFieldValue("amount") || 0;
    form.setFieldsValue({ amount: currentAmount + value });
    setIsDisabled(false);
  };

  const onValuesChange = (_, allValues) => {
    // Check if the amount is greater than 0 and update the `isDisabled` state
    setIsDisabled(!(allValues.amount > 0));
  };

  const onFinish = async (values) => {
    const body = {
      top_up_amount: values.amount,
    };

    try {
      setIsLoading(true);
      const res = await fetch(
        "https://take-home-test-api.nutech-integrasi.com/topup",
        {
          method: "POST",
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
        setIsModalOpen(true);
        setIsLoading(false);
      } else if (data.status === 108) {
        message.error(data.message);
        setIsLoading(false);
        dispatch(clearToken());
        navigate("/login");
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
    <div className="flex w-full gap-6">
      <Form
        form={form}
        initialValues={{
          amount: 0,
        }}
        className="flex flex-col w-full gap-2"
        name="registration"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
      >
        <Form.Item
          name="amount"
          rules={[
            {
              required: true,
              message: "Harap masukkan nominal topup anda!",
            },
          ]}
        >
          <InputNumber
            size="large"
            className="h-12"
            style={{ width: "100%" }}
            placeholder="Masukkan nominal topup anda"
            min={0}
            prefix={<MdOutlineMoney />}
          />
        </Form.Item>
        <button
          type="submit"
          disabled={isDisabled}
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-[#F42619] h-12 rounded-md text-white hover:cursor-pointer hover:bg-[#F6554B] focus:bg-[#A11108] transition-colors disabled:bg-gray-400"
        >
          {isLoading ? "loading" : "Top Up"}
        </button>
        <Modal
          centered
          open={isModalOpen}
          confirmLoading={isLoading}
          footer={null}
        >
          <div className="p-6 flex-col flex gap-4 items-center">
            <FaCheckCircle color="#52BD94" size={80} />
            <div className="flex flex-col items-center gap-2">
              <p>Top Up sebesar</p>
              <p className="text-2xl font-semibold">
                Rp.
                {form.getFieldValue("amount")?.toLocaleString("id-ID", {
                  maximumFractionDigits: 0,
                })}
              </p>
              <p>berhasil!</p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="hover:bg-gray-100 py-3 rounded-md w-full transition-colors hover:cursor-pointer"
            >
              <p className="text-red-500 font-semibold text-lg">
                Kembali ke Beranda
              </p>
            </button>
          </div>
        </Modal>
      </Form>
      <div className="flex gap-4">
        <div className="flex flex-col justify-between">
          <button
            className="border border-gray-400 rounded-md px-4 py-3 hover:cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setAmountValue(10000)}
          >
            Rp10.000
          </button>
          <button
            className="border border-gray-400 rounded-md px-4 py-3 hover:cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setAmountValue(20000)}
          >
            Rp20.000
          </button>
        </div>
        <div className="flex flex-col justify-between">
          <button
            className="border border-gray-400 rounded-md px-4 py-3 hover:cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setAmountValue(30000)}
          >
            Rp30.000
          </button>
          <button
            className="border border-gray-400 rounded-md px-4 py-3 hover:cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setAmountValue(100000)}
          >
            Rp100.000
          </button>
        </div>
        <div className="flex flex-col justify-between">
          <button
            className="border border-gray-400 rounded-md px-4 py-3 hover:cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setAmountValue(250000)}
          >
            Rp250.000
          </button>
          <button
            className="border border-gray-400 rounded-md px-4 py-3 hover:cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setAmountValue(500000)}
          >
            Rp500.000
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopUpForm;
