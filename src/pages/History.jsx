import { useEffect, useState } from "react";
import UserDetail from "../components/shared/UserDetail";
import { useSelector } from "react-redux";

const History = () => {
  const [history, setHistory] = useState([]);
  const [offset, setOffset] = useState(0);
  const token = useSelector((state) => state.auth.token);

  const limit = 5;

  const handleShowMore = () => {
    setOffset(offset + limit);
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(
          `https://take-home-test-api.nutech-integrasi.com/transaction/history?offset=${offset}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        console.log(data);
        if (data && data.data && data.data.records) {
          setHistory(data.data.records);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchHistory();
  }, [offset, token]);

  return (
    <>
      <section id="content" className="flex flex-col gap-24 px-24 py-10">
        <UserDetail />
        <section id="history" className="flex flex-col gap-4">
          <p className="font-semibold text-xl">Semua Transaksi</p>
          <div className="flex flex-col gap-4">
            {history && history.length > 0 ? (
              history.map((rcd, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 border px-6 py-4 border-gray-300 rounded-lg"
                >
                  {rcd.transaction_type === "TOPUP" ? (
                    <p className="text-green-400 text-xl font-semibold">
                      + Rp.
                      {rcd.total_amount.toLocaleString("id-ID", {
                        maximumFractionDigits: 0,
                      })}
                    </p>
                  ) : (
                    <p className="text-red-400 text-2xl font-semibold">
                      - Rp.
                      {rcd.total_amount.toLocaleString("id-ID", {
                        maximumFractionDigits: 0,
                      })}
                    </p>
                  )}
                  <p className="text-gray-400 text-sm">
                    {new Date(rcd.created_on).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    {new Date(rcd.created_on).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      timeZone: "Asia/Jakarta",
                    })}
                  </p>
                </div>
              ))
            ) : (
              <p>There&apos;s no transaction</p>
            )}
          </div>
          {history?.length > 0 && (
            <div
              className="flex w-full p-6 justify-center hover:bg-gray-100 rounded-lg hover:cursor-pointer transition-colors"
              onClick={handleShowMore}
            >
              <p className="text-red-400 font-semibold">Show More</p>
            </div>
          )}
        </section>
      </section>
    </>
  );
};

export default History;
