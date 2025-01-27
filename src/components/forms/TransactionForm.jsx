import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import { clearToken } from "../../features/auth/authSlice";
import { Form, InputNumber, message, Modal } from "antd";
import { MdAccountBalanceWallet } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdOutlineMoney } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

const TransactionForm = ({ service, balance, token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmedModalOpen, setIsConfirmedModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = async () => {
    const body = {
      service_code: service?.service_code,
    };

    try {
      setIsLoading(true);
      const res = await fetch(
        "https://take-home-test-api.nutech-integrasi.com/transaction",
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

  const handleModalConfirm = () => {
    form.submit();
    if (service?.service_tariff > balance.balance) {
      setIsModalOpen(false);
      setIsFailedModalOpen(true);
      return;
    } else {
      setIsModalOpen(false);
      setIsConfirmedModalOpen(true);
    }
  };

  form.setFieldsValue({
    amount: service?.service_tariff,
  });

  return (
    <Form
      form={form}
      className="flex flex-col w-full gap-2"
      name="registration"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
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
        type="button"
        className="w-full bg-[#F42619] h-12 rounded-md text-white hover:cursor-pointer hover:bg-[#F6554B] focus:bg-[#A11108] transition-colors"
        onClick={() => setIsModalOpen(true)}
      >
        {isLoading ? "loading" : "Bayar"}
      </button>
      <Modal
        centered
        open={isModalOpen}
        confirmLoading={isLoading}
        footer={null}
      >
        <div className="p-6 flex-col flex gap-4 items-center">
          <div className="rounded-full bg-[#F42619] p-4">
            <MdAccountBalanceWallet color="#FFF" size={60} />
          </div>
          <div className="flex flex-col items-center">
            <p>Beli {service?.service_name.toLowerCase()} senilai</p>
            <p className="text-2xl font-semibold">
              Rp
              {service?.service_tariff.toLocaleString("id-ID", {
                maximumFractionDigits: 0,
              })}{" "}
              ?
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <button
              onClick={handleModalConfirm}
              className="hover:bg-gray-100 py-3 rounded-md w-full transition-colors hover:cursor-pointer"
            >
              <p className="text-red-500 font-semibold text-lg">
                Ya, lanjutkan Bayar
              </p>
            </button>
            <button
              onClick={() => navigate("/")}
              className="hover:bg-gray-100 py-3 rounded-md w-full transition-colors hover:cursor-pointer"
            >
              <p className="text-gray-400 font-semibold text-lg">
                Kembali ke Beranda
              </p>
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        centered
        open={isConfirmedModalOpen}
        confirmLoading={isLoading}
        footer={null}
      >
        <div className="p-6 flex-col flex gap-4 items-center">
          <FaCheckCircle color="#52BD94" size={80} />
          <div className="flex flex-col items-center gap-2">
            <p>Pembayaran {service?.service_name.toLowerCase()} sebesar</p>
            <p className="text-2xl font-semibold">
              Rp
              {service?.service_tariff.toLocaleString("id-ID", {
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
      <Modal
        centered
        open={isFailedModalOpen}
        confirmLoading={isLoading}
        footer={null}
      >
        <div className="p-6 flex-col flex gap-4 items-center">
          <AiFillCloseCircle color="#F42619" size={80} />
          <div className="flex flex-col items-center gap-2">
            <p>Pembayaran {service?.service_name.toLowerCase()} sebesar</p>
            <p className="text-2xl font-semibold">
              Rp
              {service?.service_tariff.toLocaleString("id-ID", {
                maximumFractionDigits: 0,
              })}
            </p>
            <p>gagal</p>
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
  );
};

TransactionForm.propTypes = {
  token: PropTypes.string.isRequired,
  service: PropTypes.object.isRequired,
  balance: PropTypes.object.isRequired,
};

export default TransactionForm;
