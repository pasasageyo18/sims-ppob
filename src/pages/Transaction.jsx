import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import UserDetail from "../components/shared/UserDetail";
import TransactionForm from "../components/forms/TransactionForm";

const Transaction = () => {
  const [service, setService] = useState();
  const [balance, setBalance] = useState();

  const { itemName } = useParams();

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await fetch(
          "https://take-home-test-api.nutech-integrasi.com/balance",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        setBalance(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBalance();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(
          "https://take-home-test-api.nutech-integrasi.com/services",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        const dataService = data.data.find(
          (svc) => svc.service_code.toLowerCase() === itemName
        );

        setService(dataService);
      } catch (error) {
        console.error(error);
      }
    };
    fetchServices();
  }, []);

  return (
    <>
      <section id="content" className="flex flex-col gap-24 px-24 py-10">
        <UserDetail />
        <section id="transaction_detail" className="flex flex-col gap-24">
          <div className="flex flex-col gap-2">
            <p className="text-xl">Pembayaran</p>
            <div className="flex gap-4">
              <img src={service?.service_icon} alt="" width={24} height={24} />
              <p className="font-semibold text-2xl">{service?.service_name}</p>
            </div>
          </div>
          <TransactionForm service={service} balance={balance} token={token} />
        </section>
      </section>
    </>
  );
};

export default Transaction;
